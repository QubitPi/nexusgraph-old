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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { appendToGraphList, selectGraphIdList } from "../graph-list/graphListDuck";
import { Graph, updateGraphData } from "../graph/graphDuck";

/**
 * A custom React hook that allows the sharing logic of rendering a new graph onto canvas on UI.
 *
 * Example usage:
 *
 * ```typescript
 * const graphState = useRenderGraph(graphState);
 * ```
 *
 * The `graphState` is the state that triggers the re-rendering of the containing component once being updated. Note
 * that `graphState` is initially set to `undefined`
 *
 * @param graphState  An new redux representation of the graph to be rendered onto the UI canvas
 *
 * @returns a redux representation of the newly rendered graph
 */
const useRenderGraph = (graphState: Graph | undefined) => {
  const dispatch = useDispatch();
  const graphIdList = selectGraphIdList();
  const [newGraphState, setNewGraphState] = useState<Graph>();

  useEffect(() => {
    if (graphState) {
      const graphId = graphState.id as string;
      const graphName = graphState.name as string;

      dispatch(updateGraphData(graphState));

      if (!graphIdList.includes(graphId)) {
        dispatch(appendToGraphList({ id: graphId, name: graphName }));
      }

      setNewGraphState(graphState);
    }
  }, [graphState]);

  return newGraphState;
};

export default useRenderGraph;
