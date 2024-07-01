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

import { Graph, Link, Node } from "nexusgraph-redux";

/**
 * Converts graph in Theresa API format to Redux state type
 *
 * @param jsonGraph  A graph in JSON format returned from Theresa API
 *
 * @returns a newly constructed objects
 */
export const mapFromTheresaGraph = (jsonGraph: any): Graph => {
  return {
    id: undefined,
    name: undefined,
    nodes: mapFromTheresaNodes(jsonGraph["nodes"]),
    links: mapFromTheresaLinks(jsonGraph["links"]),
  };
};

/**
 * Converts graph nodes in Theresa API format to Redux state type
 *
 * @param jsonNodes  A list of nodes returned from Theresa API
 *
 * @returns a new array of newly constructed objects
 */
export const mapFromTheresaNodes = (jsonNodes: any[]): Node[] => {
  return jsonNodes.map((node) => {
    return {
      id: undefined,
      onCanvasId: node["id"],
      fields: node["fields"],
    };
  });
};

/**
 * Converts graph links in Theresa API format to Redux state type
 *
 * @param jsonLinks  A list of links returned from Theresa API
 *
 * @returns a new array of newly constructed objects
 */
export const mapFromTheresaLinks = (jsonLinks: any[]): Link[] => {
  return jsonLinks.map((link) => {
    return {
      id: undefined,
      onCanvasId: link["id"],
      source: link["source"],
      target: link["target"],
      fields: link["fields"],
    };
  });
};
