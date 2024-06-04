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

export interface GraphMetaData {
  id: string;
  name: string;
}

interface GraphListAction {
  type: typeof GRAPH_LIST_STATE;
  payload: GraphMetaData[];
}

const initialState: GraphMetaData[] = [];

export function selectGraphList() {
  return useSelector((state: GlobalState) => state.graphList);
}

/**
 * Graph list reducer
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

export function updateGraphList(graphListState: GraphMetaData[]) {
  return { type: UPDATE_GRAPH_LIST, payload: graphListState };
}

export function appendToGraphList(metadata: GraphMetaData) {
  return { type: APPEND_GRAPH_LIST, payload: [metadata] };
}

export function updateSingleItem(metadata: GraphMetaData) {
  return { type: UPDATE_SINGLE_ITEM, payload: [metadata] };
}
