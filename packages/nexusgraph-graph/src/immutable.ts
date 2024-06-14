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

import { produce } from "immer";
import { Graph, Link, Node } from "nexusgraph-redux";

/**
 * Add a new node to the specified graph.
 *
 * @param oldGraphState  A Redux state of the provided graph
 * @param node  The new node to add to the provided graph
 *
 * @returns a new graph state with the new node added
 */
export const addNode = (oldGraphState: Graph, node: Node): Graph => {
  return produce(oldGraphState, (draft) => {
    draft.nodes.push(node);
  });
};

/**
 * Add a new link to the specified graph.
 *
 * @param oldGraphState  A Redux state of the provided graph
 * @param link  The new link to add to the provided graph
 *
 * @returns a new graph state with the new link added
 */
export const addLink = (oldGraphState: Graph, link: Link): Graph => {
  return produce(oldGraphState, (draft) => {
    draft.links.push(link);
  });
};

/**
 * Updates a property of a node in a specified graph and returns the graph with the updated node.
 *
 * @param oldGraphState  A Redux state of the provided graph
 * @param nodeId  The ID of the node to be modified
 * @param fieldName  The name of the field to modify
 * @param newFieldValue  The new value for the field
 *
 * @returns a new graph state with the updated node
 */
export const mutateNodeFieldById = (
  oldGraphState: Graph,
  nodeId: string,
  fieldName: string,
  newFieldValue: string
): Graph => {
  return produce(oldGraphState, (draft) => {
    draft.nodes.forEach((node) => {
      if (node.id == nodeId) {
        node.fields[`${fieldName}`] = newFieldValue;
      }
    });
  });
};

/**
 * Updates a property of a link in a specified graph and returns the graph with the updated link.
 *
 * @param oldGraphState  A Redux state of the provided graph
 * @param linkId  The ID of the link to be modified
 * @param fieldName  The name of the field to modify
 * @param newFieldValue  The new value for the field
 *
 * @returns a new graph state with the updated link
 */
export const mutateLinkFieldById = (
  oldGraphState: Graph,
  linkId: string,
  fieldName: string,
  newFieldValue: string
): Graph => {
  return produce(oldGraphState, (draft) => {
    draft.links.forEach((link) => {
      if (link.id == linkId) {
        link.fields[`${fieldName}`] = newFieldValue;
      }
    });
  });
};
