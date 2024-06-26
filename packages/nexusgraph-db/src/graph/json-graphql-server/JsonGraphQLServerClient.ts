/*
 * Copyright 2024 Jiaqi Liu. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Sentry from "@sentry/react";
import axios from "axios";
import { inject, injectable } from "inversify";
import TYPES from "nexusgraph-app/types";
import { Graph, GraphMetaData, Link, Node } from "nexusgraph-redux";
import "reflect-metadata";
import { GraphClient } from "../GraphClient";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // We really want to throw the error so it is handled and we don't get
    // an unhandledrejection error. By throwing here, we are handling the
    // rejection, and bubbling up to the closest error handler (try/catch or
    // catch method call on a promise).
    throw error;
  }
);

@injectable()
export class JsonGraphQLServerClient implements GraphClient {
  private _userId;

  public constructor(@inject(TYPES.userId) userId: string) {
    // this._userId = userId;
    this._userId = "10000";
  }

  public saveOrUpdate(graph: Graph): Promise<Graph> {
    return graph.id == undefined ? this.save(graph) : this.update(graph);
  }

  public getGraphById(graphId: number): Promise<Graph> {
    return this.postQuery(
      `
      {
        Graph(id: ${graphId}) {
          id
          name
          nodes: Nodes {
            id
            onCanvasId
            fields
          }
          links: Links {
            id
            onCanvasId
            source
            target
            fields
          }
        }
      }
      `
    ).then((response) => {
      return response.data.data.Graph;
    });
  }

  public deleteGraphById(graphId: number): Promise<Graph> {
    return this.postQuery(
      `
      mutation {
        removeGraph(id: ${graphId}) {
          id
        }
      }
      `
    );
  }

  public getGraphListMetaDataByUserId(userId: string): Promise<GraphMetaData[]> {
    userId = this._userId;
    return this.postQuery(
      `
      {
        allGraphs(filter: {user_id:${Number(userId)}}) {
          id
          name
        }
      }
      `
    ).then((response) => {
      return response.data.data.allGraphs;
    });
  }

  private postQuery(query: string): Promise<any> {
    return axios
      .request({
        url: "http://localhost:5000/",
        method: "post",
        params: {
          query: query,
        },
      })
      .then((response) => {
        return response;
      });
  }

  private update(graph: Graph): Promise<Graph> {
    this.postQuery(
      `
      mutation {
        updateGraph(
          id: ${graph.id},
          name: "${graph.name}",
        ) {
          id
          name
          last_updated_on
        }
      }
      `
    );

    graph.nodes.forEach((node) => {
      if (node.id) {
        this.postQuery(
          `
        mutation {
          updateNode(
            id: ${node.id},
            onCanvasId: "${node.onCanvasId}",
            fields: ${this.removeQuotesFromKey(JSON.stringify(node.fields))}
          ) {
            id
            onCanvasId
            fields
          }
        }
        `
        );
      } else {
        this.postQuery(
          `
          mutation {
            createNode(
              onCanvasId: "${node.onCanvasId}",
              fields: ${this.removeQuotesFromKey(JSON.stringify(node.fields))},
              graph_id: ${graph.id}
            ) {
              id
              onCanvasId
              fields
              graph_id
            }
          }
          `
        );
      }
    });

    graph.links.forEach((link) => {
      if (link.id) {
        this.postQuery(
          `
          mutation {
            updateLink(
              id: ${link.id},
              onCanvasId: "${link.onCanvasId}",
              source: "${link.source}",
              target: "${link.target}",
              fields: ${this.removeQuotesFromKey(JSON.stringify(link.fields))}
            ) {
              id
              onCanvasId
              source
              target
              fields
              graph_id
            }
          }
          `
        );
      } else {
        this.postQuery(
          `
          mutation {
            createLink(
              onCanvasId: "${link.onCanvasId}",
              source: "${link.source}",
              target: "${link.target}",
              fields: ${this.removeQuotesFromKey(JSON.stringify(link.fields))}
              graph_id: ${graph.id}
            ) {
              id
              onCanvasId
              source
              target
              fields
              graph_id
            }
          }
          `
        );
      }
    });

    return this.getGraphById(graph.id as number);
    // return new Promise((resolve) => resolve(graph));
  }

  private save(graph: Graph): Promise<Graph> {
    return this.postQuery(
      `
      mutation {
          createGraph(
            user_id: ${Number(this._userId)},
            name: "${graph.name}",
            created_on: "${new Date()}",
            last_updated_on: "${new Date()}"
      ) {
              id
              name
              created_on
              last_updated_on
          }
      }
      `
    )
      .then((response) => {
        const savedGraph = this.extractEntity("createGraph", response.data) as Graph;
        const graphId = savedGraph.id;

        const nodes = graph.nodes.map((node) => {
          return { ...node, graph_id: graphId };
        });

        return this.postQuery(
          `
          mutation {
              createManyNode(data: ${this.removeQuotesFromKey(JSON.stringify(nodes))}) {
                  id
                  onCanvasId
                  fields
              }
          }
          `
        )
          .then((response) => {
            const savedNodes = this.extractEntity("createManyNode", response.data) as Node[];

            const links = graph.links.map((link) => {
              return { ...link, graph_id: graphId };
            });

            return this.postQuery(
              `
          mutation {
              createManyLink(data: ${this.removeQuotesFromKey(JSON.stringify(links))}) {
                  id
                  onCanvasId
                  source
                  target
                  fields
              }
          }
          `
            )
              .then((response) => {
                const savedLinks = this.extractEntity("createManyLink", response.data) as Link[];

                return {
                  ...savedGraph,
                  nodes: savedNodes,
                  links: savedLinks,
                };
              })
              .catch((error) => {
                Sentry.captureException(error);
                throw error;
              });
          })
          .catch((error) => {
            Sentry.captureException(error);
            throw error;
          });
      })
      .catch((error) => {
        Sentry.captureException(error);
        throw error;
      });
  }

  /**
   * Returns a graph ID from a specified response data of either "createGraph" or "updateGraph".
   *
   * @param entity   The operation that returns the provided response. Can be "createGraph" or "updateGraph"
   * @param responseData  The value of `response.data`
   *
   * @returns the `id` field of the UPSERTed graph.
   *
   * @private
   */
  private extractEntity(operation: string, responseData: any): object {
    const op = operation as keyof typeof responseData;
    const entity = responseData.data[op];
    entity.id = Number(entity.id);
    return entity;
  }

  /**
   * Removes the double quotes from the JSON string properties.
   *
   * For example, `{ "name": "John Smith" }` becomes `{ name: "John Smith" }`
   *
   * @param jsonObjectString  A regular JSON object string with property key double-quoted
   *
   * @returns the same object with it's key's double quotes being removed
   */
  private removeQuotesFromKey(jsonObjectString: string) {
    return jsonObjectString.replace(/"([^"]+)":/g, "$1:");
  }
}
