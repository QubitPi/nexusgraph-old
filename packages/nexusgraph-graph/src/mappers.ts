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
import { BasicNode, BasicRelationship } from "neo4j-devtools-arc";
import { Link, Node } from "nexusgraph-redux";

/**
 * Converts Redux-shaped graph nodes into format compatible with Neo4J graphing library.
 *
 * @param nodes  A list of nodes stored in Redux
 *
 * @returns a new array of newly constructed objects
 */
export const mapToBasicNodes = (nodes: Node[]): BasicNode[] => {
  return nodes.map((node) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(node.fields)) {
      propertyTypes[propertyName] = "string";
    }

    return {
      id: String(node["id"]),
      elementId: node["onCanvasId"],
      labels: ["*"],
      properties: node.fields,
      propertyTypes: propertyTypes,
    } as BasicNode;
  });
};

/**
 * Converts Redux-shaped graph links into format compatible with Neo4J graphing library.
 *
 * @param links  A list of links stored in Redux
 *
 * @returns a new array of newly constructed objects
 */
export const mapToBasicRelationships = (links: Link[], nodes: Node[]): BasicRelationship[] => {
  return links.map((link) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(link.fields)) {
      propertyTypes[propertyName] = "string";
    }

    // neo4j-arc links (BasicRelationship) identifies source and target nodes by DB primary key - id
    // This conflicts with Nexus Graph's design, which links source and target by natural key instead - onCnavasId
    // We need to make an exeption here - having startNodeId and endNodeId point to id
    const canvasIdToId = new Map();
    nodes.forEach((node) => canvasIdToId.set(node.onCanvasId, node.id));

    return {
      id: String(link["id"]),
      elementId: link["onCanvasId"],
      // startNodeId: link["source"],
      // endNodeId: link["target"],
      startNodeId: String(canvasIdToId.get(link["source"])),
      endNodeId: String(canvasIdToId.get(link["target"])),
      type: link.fields["type"],
      properties: link.fields,
      propertyTypes: propertyTypes,
    } as BasicRelationship;
  });
};

export const mapToId = (elements: Node[] | Link[], canvasId: string): number => {
  const id = elements.find((e) => e.onCanvasId == canvasId)?.id;

  if (!id) {
    const error = new Error(`No element was found with canvasId=${canvasId}`);
    Sentry.captureException(error);
    throw error;
  }

  return id;
};

export const mapToCanvasId = (elements: Node[] | Link[], id: number): string => {
  const onCanvasId = elements.find((e) => e.id == id)?.onCanvasId;

  if (!onCanvasId) {
    const error = new Error(`No element was found with id=${id}`);
    Sentry.captureException(error);
    throw error;
  }

  return onCanvasId;
};
