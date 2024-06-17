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

import { Graph, useRenderGraph } from "nexusgraph-redux";
import { useEffect, useState } from "react";
import { usePersistGraph } from "./index";

/**
 * A custom React hook that allows the sharing logic of persisting and rendering a new graph in App.
 *
 * Example usage:
 *
 * ```typescript
 * const { graph, persistAndRenderGraph } = usePersistAndRenderGraph();
 * ```
 *
 * This hook is a combination of {@link usePersistGraph} and {@link useRenderGraph}:
 *
 * ```
 *                  ┌──────────Graph Object───────────┐
 *                  │                                 │
 *                  │                                 │
 *                  │                                 │
 *                  │                                 │
 *                  │                                 │
 * ┌────────────────▼────┐                            │
 * │                     │                            │
 * │   usePersistGraph   │                            │
 * │                     │                            │
 * └────────────────┬────┘                            │
 *                  │                                 │
 *                  │                             ┌───▼──────────────────────┐
 *            │     │              ──────         │                          │
 *          ──┼──   │                             │ usePersistAndRenderGraph │
 *            │     │              ──────         │                          │
 *                  │                             └───┬──────────────────────┘
 *                  │                                 │
 *  ┌───────────────▼───┐                             │
 *  │                   │                             │
 *  │   useRenderGraph  │                             │
 *  │                   │                             │
 *  └───────────────┬───┘                             │
 *                  │                                 │
 *                  │                                 │
 *                  │                                 │
 *                  │                                 │
 *                  │                                 │
 *                  └───────────►Graph State◄─────────┘
 * ```
 */
const usePersistAndRenderGraph = () => {
  const { persistedGraph, persistGraph } = usePersistGraph();
  const { renderedGraph, renderGraph } = useRenderGraph();

  const [graph, setGraph] = useState<Graph>();

  useEffect(() => {
    setGraph(renderedGraph);
  }, [renderedGraph]);

  useEffect(() => {
    renderGraph(persistedGraph);
  }, [persistedGraph]);

  const persistAndRenderGraph = (graph: Graph) => {
    persistGraph(graph);
  };

  return { graph, persistAndRenderGraph };
};

export default usePersistAndRenderGraph;
