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
import { Graph, GraphState } from "nexusgraph-redux";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GraphClientContext } from "../Contexts";
import { GraphClient } from "../graph/GraphClient";

/**
 * A custom React hook that allows the sharing logic of creating a new graph in database.
 *
 * Example usage:
 *
 * ```typescript
 * const [graphObject, setGraphObject] = useState<Graph>();
 * const graphState = useCreateNewGraph(graphObject);
 * ```
 *
 * The `graphState` is the state that triggers the re-rendering of the containing component once being updated. Note
 * that `graphState` is initially set to `undefined`
 *
 * @param graph  An in-memory representation of the graph to be persisted into the database
 *
 * @returns a redux representation of the persisted graph
 */
const useCreateNewGraph = (graph: Graph | undefined) => {
  const { t } = useTranslation();
  const graphClient: GraphClient = useContext(GraphClientContext) as GraphClient;
  const [graphState, setGraphState] = useState<GraphState>();

  useEffect(() => {
    if (graph) {
      graphClient
        .saveOrUpdate({
          name: t("Untitled Graph"),
          nodes: graph.nodes,
          links: graph.links,
        })
        .then((graphState) => {
          setGraphState(graphState);
        })
        .catch((error) => {
          Sentry.captureException(error);
          throw error;
        });
    }
  }, [graph]);

  return graphState;
};

export default useCreateNewGraph;
