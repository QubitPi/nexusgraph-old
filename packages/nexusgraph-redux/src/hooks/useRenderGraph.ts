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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { appendToGraphList, selectGraphIdList } from "../graph-list/graphListDuck";
import { Graph, updateGraph } from "../graph/graphDuck";

/**
 * A custom React hook that allows the sharing logic of rendering a new graph onto canvas on UI.
 *
 * It exports
 *
 * 1. a [React state](https://react.qubitpi.org/reference/react/useState) called `renderedGraph` that represents the
 *    displayed graph on canvas
 * 2. a proxy method that flushes an updated {@link Graph} object into Redux store
 *
 * Example usage:
 *
 * ```typescript
 * const { renderedGraph, renderGraph } = useRenderGraph()
 *
 * useEffect(() => {
 *   ...
 * }, [renderedGraph]);
 *
 * ...
 *
 * renderGraph(myGraph);
 * ```
 *
 * The `renderedGraph` will be the state that triggers the re-rendering of the containing component once being updated.
 * Note that `renderedGraph` is initially set to `undefined` and will be mutated if calling `renderGraph` results in
 * a [different representation](https://immer.qubitpi.org/) flushed into Redux
 *
 * @returns a redux representation of the most up-to-date graph
 */
const useRenderGraph = () => {
  const dispatch = useDispatch();
  const graphIdList = selectGraphIdList();
  const [renderedGraph, setRenderedGraph] = useState<Graph>();

  const renderGraph = (graph: Graph | undefined) => {
    if (graph) {
      const graphId = graph.id as number;
      const graphName = graph.name as string;

      dispatch(updateGraph(graph));

      if (!graphIdList.includes(graphId)) {
        dispatch(appendToGraphList({ id: graphId, name: graphName }));
      }

      setRenderedGraph(graph);
    }
  };

  return { renderedGraph, renderGraph };
};

export default useRenderGraph;
