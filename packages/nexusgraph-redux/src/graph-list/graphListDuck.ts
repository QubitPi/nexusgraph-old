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
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";

export const GRAPH_LIST_STATE = "graphList";
const UPDATE_GRAPH_LIST = GRAPH_LIST_STATE + "/UPDATE_GRAPH_LIST";
const APPEND_GRAPH_LIST = GRAPH_LIST_STATE + "/APPEND_GRAPH_LIST";
const UPDATE_SINGLE_ITEM = GRAPH_LIST_STATE + "/UPDATE_SINGLE_ITEM";

/**
 * The Redux representation of a single graph among a list of graph info
 *
 * Each includes 2 pieces of information
 *
 * 1. Graph ID
 * 2. Display name of that graph
 */
export interface GraphMetaData {
  id: string;
  name: string;
}

interface GraphListAction {
  type: typeof GRAPH_LIST_STATE;
  payload: GraphMetaData[];
}

const initialState: GraphMetaData[] = [];

/**
 * A standard [selector function](https://redux.qubitpi.org/usage/deriving-data-selectors/#basic-selector-concepts) that
 * proxies read operation on {@link GraphMetaData} list
 */
export function selectGraphList() {
  return useSelector((state: GlobalState) => state.graphList);
}

/**
 * A standard [action creator](https://redux.qubitpi.org/style-guide/#use-action-creators) that prepares the data and
 * performs additional logic before mutating the displayed graph list
 *
 * @param graphListState  The new graph list to be flushed into Redux
 */
export function updateGraphList(graphListState: GraphMetaData[]) {
  return { type: UPDATE_GRAPH_LIST, payload: graphListState };
}

/**
 * A standard [action creator](https://redux.qubitpi.org/style-guide/#use-action-creators) that prepares the data and
 * performs additional logic before appending a new graph metadata object to the displayed graph list
 *
 * @param metadata  The object representing the new provided graph metadata
 */
export function appendToGraphList(metadata: GraphMetaData) {
  return { type: APPEND_GRAPH_LIST, payload: [metadata] };
}

/**
 * A standard [action creator](https://redux.qubitpi.org/style-guide/#use-action-creators) that prepares the data and
 * performs additional logic before updating an existing metadata object in displayed graph list
 *
 * @param metadata  The object representing the new provided graph metadata
 */
export function updateSingleItem(metadata: GraphMetaData) {
  return { type: UPDATE_SINGLE_ITEM, payload: [metadata] };
}

/**
 * Graph list slice reducer
 *
 * @param state The current {@link GraphMetaData[]}
 * @param action {@link GraphListAction} for updating a directory
 *
 * @returns New directory state
 */
export default function graphListReducer(state = initialState, action: GraphListAction): GraphMetaData[] {
  switch (action.type) {
    case UPDATE_GRAPH_LIST:
      return action.payload;
    case APPEND_GRAPH_LIST:
      return [...state, ...action.payload];
    case UPDATE_SINGLE_ITEM:
      return state.map((item) => {
        return item.id == action.payload[0].id ? action.payload[0] : item;
      });
    default:
      return state;
  }
}
