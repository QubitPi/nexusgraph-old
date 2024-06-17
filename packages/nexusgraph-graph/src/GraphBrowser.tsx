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
import i18next from "i18next";
import {
  DETAILS_PANE_TITLE_UPDATE,
  GraphInteractionCallBack,
  GraphVisualizer,
  NODE_LABEL_UPDATE,
  NODE_ON_CANVAS_CREATE,
  PROP_UPDATE,
  REL_ON_CANVAS_CREATE,
  REL_TYPE_UPDATE,
  resources,
} from "neo4j-devtools-arc";
import { usePersistAndRenderGraph } from "nexusgraph-db";
import { Link, Node, selectGraph } from "nexusgraph-redux";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { addLink, addNode, mutateLinkFieldById, mutateNodeFieldById } from "./immutable";
import { mapToBasicNodes, mapToBasicRelationships } from "./mappers";
import { theme } from "./themes";

/**
 * {@link GraphBrowser} abstracts away the graphing capabilities of Nexus Graph and is the "config" component on top of
 * neo4j-arc graphing library.
 *
 * It is logically the same component as [neo4j-browser](https://github.com/QubitPi/neo4j-browser)'s
 * [VisualizationView.tsx](https://github.com/QubitPi/neo4j-browser/blob/master/src/browser/modules/Stream/CypherFrame/VisualizationView/VisualizationView.tsx)
 *
 * @returns a React DOM object
 */
export default function GraphBrowser(): JSX.Element {
  const isFullscreen = true;

  const displayedGraph = selectGraph();
  const { persistAndRenderGraph } = usePersistAndRenderGraph();

  const [hasVis, setHasVis] = useState<boolean>(true);
  const [visElement, setVisElement] = useState<null | {
    svgElement: unknown;
    graphElement: unknown;
    type: "plan" | "graph";
  }>(null);

  const onGraphInteraction: GraphInteractionCallBack = (event, properties) => {
    if (event == NODE_ON_CANVAS_CREATE) {
      if (properties == null) {
        const error = new Error(
          "properties (NODE_ON_CANVAS_CREATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const newGraph = addNode(displayedGraph, {
        id: Math.random().toString(36).slice(2),
        fields: {
          name: properties["name"],
          description: properties["description"],
          labels: properties["labels"],
        },
      } as Node);

      persistAndRenderGraph(newGraph);
    }

    if (event == NODE_LABEL_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (NODE_LABEL_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const nodeId = properties["nodeId"];
      const newLabel = properties["newLabel"];
    }

    if (event == REL_ON_CANVAS_CREATE) {
      if (properties == null) {
        const error = new Error(
          "properties (REL_ON_CANVAS_CREATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const newGraph = addLink(displayedGraph, {
        id: properties["type"],
        source: properties["sourceNodeId"],
        target: properties["targetNodeId"],
        fields: {
          type: properties["type"],
        },
      } as Link);

      persistAndRenderGraph(newGraph);
    }

    if (event == REL_TYPE_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (REL_TYPE_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const relId = properties["relId"] as string;
      const newType = properties["newType"] as string;

      const newGraph = mutateLinkFieldById(displayedGraph, relId, "type", newType);

      persistAndRenderGraph(newGraph);
    }

    if (event == PROP_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (NODE_PROP_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const isNode = properties["isNode"];
      const nodeOrRelId = properties["nodeOrRelId"] as string;
      const propKey = properties["propKey"] as string;
      const propVal = properties["propVal"] as string;

      const newGraph = isNode
        ? mutateNodeFieldById(displayedGraph, nodeOrRelId, propKey, propVal)
        : mutateLinkFieldById(displayedGraph, nodeOrRelId, propKey, propVal);

      persistAndRenderGraph(newGraph);
    }

    if (event == DETAILS_PANE_TITLE_UPDATE) {
      if (properties == null) {
        const error = new Error(
          "properties (DETAILS_PANE_TITLE_UPDATE) is null. " +
            "This might be graph modeling logic change in neo4j-devtools-arc is not updated in GraphInteractionCallBack"
        );
        Sentry.captureException(error);
        throw error;
      }

      const isNode = properties["isNode"];
      const nodeOrRelId = properties["nodeOrRelId"] as string;
      const titlePropertyKey = properties["titlePropertyKey"] as string;
      const newTitle = properties["newTitle"] as string;

      const newGraph = isNode
        ? mutateNodeFieldById(displayedGraph, nodeOrRelId, titlePropertyKey, newTitle)
        : mutateLinkFieldById(displayedGraph, nodeOrRelId, titlePropertyKey, newTitle);

      persistAndRenderGraph(newGraph);
    }
  };

  i18next.addResources("en", "translation", resources.en.translation);
  i18next.addResources("zh", "translation", resources.zh.translation);

  const themeData = theme;

  return (
    <>
      {displayedGraph && (
        <ThemeProvider theme={themeData}>
          <GraphVisualizer
            maxNeighbours={100}
            hasTruncatedFields={false}
            // graphStyleData={undefined}
            // updateStyle={undefined}
            // getNeighbours={undefined}
            nodes={mapToBasicNodes(displayedGraph.nodes)}
            autocompleteRelationships={false}
            relationships={mapToBasicRelationships(displayedGraph.links)}
            isFullscreen={isFullscreen}
            assignVisElement={(svgElement: any, graphElement: any) => {
              setVisElement({ svgElement, graphElement, type: "graph" });
              setHasVis(true);
            }}
            nodeLimitHit={false}
            getAutoCompleteCallback={undefined}
            // setGraph={undefined}
            // setNodePropertiesExpandedByDefault={undefined}
            // nodePropertiesExpandedByDefault={true}
            wheelZoomRequiresModKey={!isFullscreen}
            wheelZoomInfoMessageEnabled={false}
            // disableWheelZoomInfoMessage={() => {}}
            // DetailsPaneOverride={undefined}
            // OverviewPaneOverride={undefined}
            useGeneratedDefaultColors={false}
            initialZoomToFit={true}
            onGraphInteraction={onGraphInteraction}
            showPropertiesTable={false}
          />
        </ThemeProvider>
      )}
    </>
  );
}
