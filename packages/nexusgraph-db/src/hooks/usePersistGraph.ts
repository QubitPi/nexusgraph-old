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

import * as Sentry from "@sentry/react";
import { Graph } from "nexusgraph-redux";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphClientContext } from "../Contexts";
import { GraphClient } from "../graph/GraphClient";

/**
 * A custom React hook that allows the sharing logic of persisting a new or existing graph into database.
 *
 * It exports
 *
 * 1. a [React state](https://react.qubitpi.org/reference/react/useState) called `persistedGraph` that reflects the
 *    hydrated graph in database, and
 * 2. a proxy method that uses {@link GraphClient} to persist an updated {@link Graph} object into database
 *
 * Example usage:
 *
 * ```typescript
 * const { persistedGraph, persistGraph } = usePersistGraph();
 *
 * useEffect(() => {
 *   ...
 * }, [persistedGraph]);
 *
 * ...
 *
 * persistGraph(myGraph);
 * ```
 *
 * The `persistedGraph` will be the state that triggers the re-rendering of the containing component once being updated.
 * Note that `persistedGraph` is initially set to `undefined` and will be mutated if calling `persistGraph` results in
 * a modified graph in database
 *
 * @returns a redux representation of the persisted graph
 */
const usePersistGraph = () => {
  const { t } = useTranslation();
  const graphClient: GraphClient = useContext(GraphClientContext) as GraphClient;
  const [persistedGraph, setPersistedGraph] = useState<Graph>();

  const persistGraph = (graph: Graph) => {
    if (graph) {
      return graphClient
        .saveOrUpdate({
          id: graph.id,
          name: graph.name ? graph.name : t("Untitled Graph"),
          nodes: graph.nodes,
          links: graph.links,
        })
        .then((persistedGraph) => {
          setPersistedGraph(persistedGraph);
          return persistedGraph;
        })
        .catch((error) => {
          Sentry.captureException(error);
          throw error;
        });
    }
  };

  return { persistedGraph, persistGraph };
};

export default usePersistGraph;
