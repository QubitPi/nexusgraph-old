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
import { Graph, updateGraph } from "../graph/graphDuck";

/**
 * A custom React hook that allows the sharing logic of rendering a new graph onto canvas on UI.
 *
 * Example usage:
 *
 * ```typescript
 * const graph = useRenderGraph(graph);
 * ```
 *
 * The `graph` is the state that triggers the re-rendering of the containing component once being updated. Note
 * that `graph` is initially set to `undefined`
 *
 * @param graph  An new redux representation of the graph to be rendered onto the UI canvas
 *
 * @returns a redux representation of the newly rendered graph
 */
const useRenderGraph = (graph: Graph | undefined) => {
  const dispatch = useDispatch();
  const graphIdList = selectGraphIdList();
  const [newGraph, setNewGraph] = useState<Graph>();

  useEffect(() => {
    if (graph) {
      const graphId = graph.id as string;
      const graphName = graph.name as string;

      dispatch(updateGraph(graph));

      if (!graphIdList.includes(graphId)) {
        dispatch(appendToGraphList({ id: graphId, name: graphName }));
      }

      setNewGraph(graph);
    }
  }, [graph]);

  return newGraph;
};

export default useRenderGraph;
