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
 * Webservice interface library.
 */
export interface GraphClient {
  saveOrUpdate(graph: Graph): Promise<Graph>;

  getGraphById(graphId: string): Promise<Graph>;

  deleteGraphById(graphId: string): Promise<Graph>;

  getGraphListMetaDataByUserId(userId: string): Promise<GraphMetaData[]>;
}
