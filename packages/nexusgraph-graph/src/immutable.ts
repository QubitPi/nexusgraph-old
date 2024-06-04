// Copyright 2024 Jiaqi Liu. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { produce } from "immer";
import { GraphState, Link, Node } from "../../nexusgraph-redux";

export const addNode = (oldGraphState: GraphState, node: Node): GraphState => {
  return produce(oldGraphState, (draft) => {
    draft.nodes.push(node);
  });
};

export const addLink = (oldGraphState: GraphState, link: Link): GraphState => {
  return produce(oldGraphState, (draft) => {
    draft.links.push(link);
  });
};

export const mutateNodeFieldById = (
  oldGraphState: GraphState,
  nodeId: string,
  fieldName: string,
  newFieldValue: string
): GraphState => {
  return produce(oldGraphState, (draft) => {
    draft.nodes.forEach((node) => {
      if (node.id == nodeId) {
        node.fields[`${fieldName}`] = newFieldValue;
      }
    });
  });
};

export const mutateLinkFieldById = (
  oldGraphState: GraphState,
  linkId: string,
  fieldName: string,
  newFieldValue: string
): GraphState => {
  return produce(oldGraphState, (draft) => {
    draft.links.forEach((link) => {
      if (link.id == linkId) {
        link.fields[`${fieldName}`] = newFieldValue;
      }
    });
  });
};
