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

export type { GlobalState } from "./src/globalState";
export * from "./src/graph-list/graphListDuck";
export { default, GRAPH_DATA, initialState, selectGraphData, updateGraphData } from "./src/graph/graphDuck";
export type { GraphName, GraphState } from "./src/graph/graphDuck";
export * from "./src/oAuth/oAuthDuck";
export { default as ReduxStoreProvider } from "./src/ReduxStoreProvider";

/**
 * A Redux representation of a graph node data structure.
 *
 * It has an ID field whose scope is not assumed. It can be unique across a graph or unique across database. All
 * displayable node properties are stored in `fields`, which is a TS Record whose key is the property name and value the
 * property value
 */
export interface Node {
  id: string;
  fields: Record<string, string>;
}

/**
 * A Redux representation of a directed graph link data structure.
 *
 * It has an ID field whose scope is not assumed. It can be unique across a graph or unique across database. All
 * displayable node properties are stored in `fields`, which is a TS Record whose key is the property name and value the
 * property value
 *
 * It also has a `source` and `target` field which stores the ID's of the source and target nodes, respectively
 */
export interface Link {
  id: string;
  source: string;
  target: string;
  fields: Record<string, string>;
}

/**
 * A Redux representation of a directed graph data structure.
 *
 * It has a list of {@link Node}'s and a list of {@link Link}'s
 */
export interface Graph {
  nodes: Node[];
  links: Link[];
}
