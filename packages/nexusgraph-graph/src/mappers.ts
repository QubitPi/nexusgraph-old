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
      id: node["id"],
      elementId: node["id"],
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
export const mapToBasicRelationships = (links: Link[]): BasicRelationship[] => {
  return links.map((link) => {
    const propertyTypes: Record<string, string> = {};
    for (const propertyName of Object.keys(link.fields)) {
      propertyTypes[propertyName] = "string";
    }

    return {
      id: link["id"],
      elementId: link["id"],
      startNodeId: link["source"],
      endNodeId: link["target"],
      type: link.fields["type"],
      properties: link.fields,
      propertyTypes: propertyTypes,
    } as BasicRelationship;
  });
};
