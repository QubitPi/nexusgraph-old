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

const GRAPH_API_ENDPOINT = process.env.GRAPH_API_ENDPOINT as string;

export const postGraphQuery = (query: string, accessToken: string): Promise<any> => {
  return axios.post(GRAPH_API_ENDPOINT, { query: query }, getHeaders(accessToken)).then((response) => {
    return response;
  });
};

export const getHeaders = (accessToken: string): object => {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };
};

@injectable()
export class AstraiosGraphClient implements GraphClient {
  private _userPrimaryKey: number;
  private _userId;
  private _accessToken;

  public constructor(
    @inject(TYPES.userId) userId: string,
    @inject(TYPES.userPrimaryKey) userPrimaryKey: number,
    @inject(TYPES.accessToken) accessToken: string
  ) {
    this._userId = userId;
    this._userPrimaryKey = userPrimaryKey;
    this._accessToken = accessToken;
  }

  public saveOrUpdate(graph: Graph): Promise<Graph> {
    return graph.id == null ? this.create(graph) : this.update(graph);
  }

  public getGraphById(graphId: number): Promise<Graph> {
    return postGraphQuery(
      `
      {
        graph(ids: ["${graphId}"]) {
          edges {
            node {
              id
              name
              sourceNodes {
                edges {
                  node {
                    id
                    onCanvasId
                    fields
                    outgoingLinks {
                      edges {
                        node {
                          id
                          onCanvasId
                          fields
                        }
                      }
                    }
                  }
                }
              }
              targetNodes {
                edges {
                  node {
                    id
                    onCanvasId
                    fields
                    incidentLinks {
                      edges {
                        node {
                          id
                          onCanvasId
                          fields
                        }
                      }
                    }
                  }
                }
              }
              createTime
              updateTime
            }
          }
        }
      }
      `,
      this._accessToken
    ).then((response) => {
      return this.toGraph(response);
    });
  }

  public deleteGraphById(graphId: number): Promise<Graph> {
    return postGraphQuery(
      `
      mutation {
        graph(op:DELETE, ids: ["${graphId}"]) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
      `,
      this._accessToken
    );
  }

  public getGraphListMetaDataByUserId(oidcId: string): Promise<GraphMetaData[]> {
    return postGraphQuery(
      `
      {
        user(filter: "oidcId==${oidcId}") {
          edges {
            node {
              graphs {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          }
        }
      }
      `,
      this._accessToken
    ).then((response) => {
      return response.data.data.user.edges[0].node.graphs.edges.map((graph: { node: any }) => {
        const metadata = graph.node;
        return {
          id: metadata.id,
          name: metadata.name,
        };
      });
    });
  }

  private create(graph: Graph): Promise<Graph> {
    const sourceNodes = graph.nodes.map((node) => {
      return {
        ...node,
        outgoingLinks: graph.links
          .filter((link) => link.source == node.onCanvasId)
          .map((match) => {
            return {
              onCanvasId: match.onCanvasId,
              fields: match.fields,
            };
          }),
      };
    });
    const targetNodes = graph.nodes.map((node) => {
      return {
        ...node,
        incidentLinks: graph.links
          .filter((link) => link.target == node.onCanvasId)
          .map((match) => {
            return {
              onCanvasId: match.onCanvasId,
              fields: match.fields,
            };
          }),
      };
    });
    return postGraphQuery(
      `
      mutation {
        user(op: UPSERT, data: {id: ${this._userPrimaryKey}, oidcId: "${this._userId}"}) {
          edges {
            node {
              graphs(op: UPSERT, data: {name: "${graph.name}"}) {
                edges {
                  node {
                    id
                    name
                    sourceNodes(op: UPSERT, data: ${sourceNodes}) {
                      edges {
                        node {
                          id
                          onCanvasId
                          fields
                          outgoingLinks {
                            edges {
                              node {
                                id
                                onCanvasId
                                fields
                              }
                            }
                          }
                        }
                      }
                    }
                    targetNodes(op: UPSERT, data: ${targetNodes}) {
                      edges {
                        node {
                          id
                          onCanvasId
                          fields
                          incidentLinks {
                            edges {
                              node {
                                id
                                onCanvasId
                                fields
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      this._accessToken
    );
  }

  private update(graph: Graph): Promise<Graph> {
    const sourceNodes = graph.nodes.map((node) => {
      return {
        ...node,
        outgoingLinks: graph.links
          .filter((link) => link.source == node.onCanvasId)
          .map((match) => {
            return {
              id: match.id,
              onCanvasId: match.onCanvasId,
              fields: match.fields,
            };
          }),
      };
    });
    const targetNodes = graph.nodes.map((node) => {
      return {
        ...node,
        incidentLinks: graph.links
          .filter((link) => link.target == node.onCanvasId)
          .map((match) => {
            return {
              id: match.id,
              onCanvasId: match.onCanvasId,
              fields: match.fields,
            };
          }),
      };
    });
    return postGraphQuery(
      `
      mutation {
        graph(op: UPSERT, data: {id: ${graph.id}, name: "${graph.name}"}) {
          edges {
            node {
              id
              name
              sourceNodes(op: UPSERT, data: ${sourceNodes}) {
                edges {
                  node {
                    id
                    onCanvasId
                    fields
                    outgoingLinks {
                      edges {
                        node {
                          id
                          onCanvasId
                          fields
                        }
                      }
                    }
                  }
                }
              }
              targetNodes(op: UPSERT, data: ${targetNodes}) {
                edges {
                  node {
                    id
                    onCanvasId
                    fields
                    incidentLinks {
                      edges {
                        node {
                          id
                          onCanvasId
                          fields
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
      this._accessToken
    );
  }

  private toGraph(response: any): Graph {
    return response.data.data.graph.edges.map((node: { node: any }) => {
      const graph = node.node;

      const sourceNodes = graph.sourceNodes.edges.map((node: { node: any }) => {
        return {
          id: node.node.id,
          onCanvasId: node.node.onCanvasId,
          fields: JSON.parse(node.node.fields),
        };
      });
      const targetNodes = graph.sourceNodes.edges.map((node: { node: any }) => {
        return {
          id: node.node.id,
          onCanvasId: node.node.onCanvasId,
          fields: JSON.parse(node.node.fields),
        };
      });
      const nodes = [...sourceNodes, ...targetNodes].filter((node, idx, self) => {
        idx ===
          self.findIndex((it) => {
            it.onCanvasId === node.onCanvasId;
          });
      });

      const outgoingLinks = graph.sourceNodes.edges.map((node: { outgoingLinks: any }) => node.outgoingLinks);
      const incidentLinks = graph.targetNodes.edges.map((node: { incidentLinks: any }) => node.incidentLinks);
      const links = [...outgoingLinks, ...incidentLinks].filter((link, idx, self) => {
        idx ===
          self.findIndex((it) => {
            it.onCanvasId === link.onCanvasId;
          });
      });

      return {
        id: graph.id,
        name: graph.name,
        nodes: nodes,
        links: links,
      };
    })[0];
  }
}
