// Copyright 2024 Jiaqi Liu. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { produce } from "immer";
import { useSelector } from "react-redux";
import { GlobalState, Link, Node } from "../..";
export const GRAPH_DATA = "graphData";
const UPDATE_GRAPH_DATA = GRAPH_DATA + "/UPDATE_GRAPH_DATA";

/**
 * The Redux representation of a directed graph state.
 *
 * It has 3 fields:
 *
 * 1. An ID
 * 2. A display name
 * 3. The graph data structure that stores all node/link information about this graph
 */
export interface GraphState {
  id?: string;
  name?: string;

  nodes: Node[];
  links: Link[];
}

/**
 * The initial state of the currently displayed graph.
 *
 * The ID and display name is undefined and the graph is initially empty
 */
export const initialState: GraphState = {
  id: undefined,
  name: undefined,

  nodes: [],
  links: [],
};

export type GraphName = Pick<GraphState, "id" | "name">;

interface GraphAction {
  type: typeof UPDATE_GRAPH_DATA;
  payload: GraphState;
}

/**
 * A standard [selector function](https://redux.qubitpi.org/usage/deriving-data-selectors/#basic-selector-concepts) that
 * proxies read operation on {@link GraphState}
 */
export function selectGraphData() {
  return useSelector((state: GlobalState) => {
    return state.graphData;
  });
}

/**
 * A standard [action creator](https://redux.qubitpi.org/style-guide/#use-action-creators) that prepares the data and
 * performs additional logic before mutating a {@link GraphState} in Redux
 *
 * @param graphState  The new graph state to be flushed into Redux
 */
export function updateGraphData(graphState: GraphState) {
  return { type: UPDATE_GRAPH_DATA, payload: graphState };
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
export default function graphReducer(state = initialState, action: GraphAction): GraphState {
  switch (action.type) {
    case UPDATE_GRAPH_DATA:
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
