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

import { produce } from "immer";
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";
export const GRAPH = "graph";
const UPDATE_GRAPH = GRAPH + "/UPDATE_GRAPH";

/**
 * A Redux representation of a graph node data structure.
 *
 * - The `id` field is the database primary key
 * - The `onCanvasId` is the natural key which is unique across a graph only. This ID field is generated at client
 *   side in {@link GraphBrowser}.
 * - All displayable node properties are stored in `fields`, which is a TS Record whose key is the property name and
 *   value the property value
 *
 * See
 * [documentation](https://nexusgraph.qubitpi.org/docs/design#separating-databases-primary-key-and-business-object-identifier)
 * for more details on Primary Key v.s. Natural Key
 */
export interface Node {
  id?: number;
  onCanvasId: string;
  fields: Record<string, string>;
}

/**
 * A Redux representation of a directed graph link data structure. It has the following stats:
 *
 * - The `id` field is the database primary key
 * - The `onCanvasId` is the natural key which is unique across a graph only. This ID field is generated at client
 *   side in {@link GraphBrowser}.
 * - All displayable node properties are stored in `fields`, which is a TS Record whose key is the property name and
 *   value the property value
 * - It also has a `source` and `target` field which stores the natural keys of the source and target nodes,
 *   respectively
 *
 * See
 * [documentation](https://nexusgraph.qubitpi.org/docs/design#separating-databases-primary-key-and-business-object-identifier)
 * for more details on Primary Key v.s. Natural Key
 */
export interface Link {
  id?: number;
  onCanvasId: string;
  source: string;
  target: string;
  fields: Record<string, string>;
}

/**
 * The Redux representation of a directed graph state.
 *
 * It has 3 fields:
 *
 * 1. An ID
 * 2. A display name
 * 3. The graph data structure that stores all node/link information about this graph
 */
export interface Graph {
  id?: number;
  name?: string;
  createdOn?: Date;
  lastUpdatedOn?: Date;

  nodes: Node[];
  links: Link[];
}

/**
 * The initial state of the currently displayed graph.
 *
 * The ID and display name is undefined and the graph is initially empty
 */
export const initialState: Graph = {
  id: undefined,
  name: undefined,

  nodes: [],
  links: [],
};

export type GraphName = Pick<Graph, "id" | "name">;

interface GraphAction {
  type: typeof UPDATE_GRAPH;
  payload: Graph;
}

/**
 * A standard [selector function](https://redux.qubitpi.org/usage/deriving-data-selectors/#basic-selector-concepts) that
 * proxies read operation on {@link Graph}
 */
export function selectGraph() {
  return useSelector((state: GlobalState) => {
    return state.graph;
  });
}

/**
 * A standard [action creator](https://redux.qubitpi.org/style-guide/#use-action-creators) that prepares the data and
 * performs additional logic before mutating a {@link Graph} in Redux
 *
 * @param graph  The new graph state to be flushed into Redux
 */
export function updateGraph(graph: Graph) {
  return { type: UPDATE_GRAPH, payload: graph };
}

/**
 * The graph slice reducer
 *
 * [Reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#writing-reducers) are functions
 * that take the current state and an action as arguments
 *
 * @param state Graph state
 * @param action Graph action
 *
 * @returns New nodes and links state
 */
export default function graphReducer(state = initialState, action: GraphAction): Graph {
  switch (action.type) {
    case UPDATE_GRAPH:
      return produce(state, (draft) => {
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        draft.nodes = action.payload.nodes;
        draft.links = action.payload.links;
      });
    default:
      return state;
  }
}
