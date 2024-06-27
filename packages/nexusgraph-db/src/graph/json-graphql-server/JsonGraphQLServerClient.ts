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

import axios from "axios";
import { inject, injectable } from "inversify";
import TYPES from "nexusgraph-app/types";
import { Graph, GraphMetaData } from "nexusgraph-redux";
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
    return graph.id ? this.update(graph) : this.save(graph);
  }

  private save(graph: Graph): Promise<Graph> {
    return this.postQuery(
      `
      mutation {
        createGraph(user: ${Number(this._userId)}, name: "${graph.name}", nodes: ${this.removeQuotesFromKey(
        JSON.stringify(graph.nodes)
      )}, links: ${this.removeQuotesFromKey(
        JSON.stringify(graph.links)
      )}, created_on: "${new Date()}", last_updated_on: "${new Date()}") {
          id
          name
          nodes
          links
        }
      }
      `
    ).then((response) => {
      return response.data.data.createGraph;
    });
  }

  private update(graph: Graph): Promise<Graph> {
    return this.postQuery(
      `
      mutation {
        updateGraph(id: ${Number(graph.id)}, user: ${Number(this._userId)}, name: "${
        graph.name
      }", nodes: ${this.removeQuotesFromKey(JSON.stringify(graph.nodes))}, links: ${this.removeQuotesFromKey(
        JSON.stringify(graph.links)
      )}, created_on: "${new Date()}", last_updated_on: "${new Date()}") {
        id
        name
        nodes
        links
        }
      }
      `
    ).then((response) => {
      return response.data.data.updateGraph;
    });
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

  public getGraphById(graphId: number): Promise<Graph> {
    return this.postQuery(
      `
      {
        Graph(id:${graphId}) {
          id
          user
          name
          nodes
          links
          created_on
          last_updated_on
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
        removeGraph(id: ${Number(graphId)}) {
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
        allGraphs(filter: {user:${Number(userId)}}) {
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
}
