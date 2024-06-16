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

import { Graph, GraphMetaData } from "nexusgraph-redux";

/**
 * {@link GraphClient} is an GraphQL abstraction layer between Nexus Graph and database that store graph data.
 */
export interface GraphClient {
  /**
   * Either save or update the given graph instance, depending on whether the {@link Graph.id} is `undefined`
   *
   * @param graph  The object to be persisted into database
   */
  saveOrUpdate(graph: Graph): Promise<Graph>;

  /**
   * Searches for a graph by {@link Graph.id}.
   *
   * @param graphId  The provided ID to search for
   *
   * @returns the graph in database that matches the given ID
   */
  getGraphById(graphId: string): Promise<Graph>;

  /**
   * Deletes a graph by {@link Graph.id}.
   *
   * @param graphId  The provided ID to match the to-be deleted graph
   *
   * @returns the graph info that has been deleted
   */
  deleteGraphById(graphId: string): Promise<Graph>;

  /**
   * Returns a list of un-paginated graph metadata associated with a given OAuth user.
   *
   * @param userId  The specified {@link OAuthState.userInfo.sub | OIDC ID} of a user
   */
  getGraphListMetaDataByUserId(userId: string): Promise<GraphMetaData[]>;
}
