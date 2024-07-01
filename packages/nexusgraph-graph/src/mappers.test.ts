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

import { v4 as uuidv4 } from "uuid";
import { mapToBasicNodes, mapToBasicRelationships } from "./mappers";

const SOURCE_REDUX_NODE = {
  id: 1,
  onCanvasId: uuidv4(),
  fields: {
    name: "Jack",
    desc: "A person",
  },
};
const SOURCE_BASIC_NODE = {
  id: `${SOURCE_REDUX_NODE.id}`,
  elementId: SOURCE_REDUX_NODE.onCanvasId,
  labels: ["*"],
  properties: SOURCE_REDUX_NODE.fields,
  propertyTypes: {
    name: "string",
    desc: "string",
  },
};

const TARGET_REDUX_NODE = {
  id: 2,
  onCanvasId: uuidv4(),
  fields: {
    name: "Tom",
    desc: "Yet another person",
  },
};
const TARGET_BASIC_NODE = {
  id: `${TARGET_REDUX_NODE.id}`,
  elementId: TARGET_REDUX_NODE.onCanvasId,
  labels: ["*"],
  properties: TARGET_REDUX_NODE.fields,
  propertyTypes: {
    name: "string",
    desc: "string",
  },
};

const REDUX_LINK = {
  id: 1,
  onCanvasId: uuidv4(),
  source: SOURCE_REDUX_NODE.onCanvasId,
  target: TARGET_REDUX_NODE.onCanvasId,
  fields: {
    type: "label1",
  },
};
const BASIC_REL = {
  id: `${REDUX_LINK.id}`,
  elementId: REDUX_LINK.onCanvasId,
  startNodeId: `${SOURCE_BASIC_NODE.id}`,
  endNodeId: `${TARGET_BASIC_NODE.id}`,
  type: REDUX_LINK.fields.type,
  properties: {
    type: "label1",
  },
  propertyTypes: {
    type: "string",
  },
};

describe("mappers maps between Redux representation of nodes/edges and Neo4J arc nodes/rels", () => {
  test("nodes", () => {
    const reduxNodes = [SOURCE_REDUX_NODE, TARGET_REDUX_NODE];
    const expectedBasicNodes = [SOURCE_BASIC_NODE, TARGET_BASIC_NODE];
    expect(mapToBasicNodes(reduxNodes)).toStrictEqual(expectedBasicNodes);
  });

  test("links", () => {
    expect(mapToBasicRelationships([REDUX_LINK], [SOURCE_REDUX_NODE, TARGET_REDUX_NODE])).toStrictEqual([BASIC_REL]);
  });
});
