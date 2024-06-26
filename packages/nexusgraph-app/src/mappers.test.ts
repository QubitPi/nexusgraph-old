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

import { mapFromTheresaGraph, mapFromTheresaLinks, mapFromTheresaNodes } from "./mappers";

const JSON_NODES = [
  {
    fields: {
      name: "I",
      type: "entity",
    },
    id: "nojchzzhfk8wqftekbufl",
  },
  {
    fields: {
      name: "Knowledge Graph",
      type: "entity",
    },
    id: "nl8uppsqmkg586x5u71q9",
  },
];
const MAPPED_NODES = [
  {
    id: undefined,
    onCanvasId: "nojchzzhfk8wqftekbufl",
    fields: {
      name: "I",
      type: "entity",
    },
  },
  {
    id: undefined,
    onCanvasId: "nl8uppsqmkg586x5u71q9",
    fields: {
      name: "Knowledge Graph",
      type: "entity",
    },
  },
];

const JSON_LINKS = [
  {
    fields: {
      type: "have a career in",
    },
    id: "n6t9801j5xuxhln9wh3na",
    source: "nojchzzhfk8wqftekbufl",
    target: "nl8uppsqmkg586x5u71q9",
  },
];
const MAPPED_LINKS = [
  {
    id: undefined,
    onCanvasId: "n6t9801j5xuxhln9wh3na",
    source: "nojchzzhfk8wqftekbufl",
    target: "nl8uppsqmkg586x5u71q9",
    fields: {
      type: "have a career in",
    },
  },
];

const JSON_GRAPH = {
  nodes: JSON_NODES,
  links: JSON_LINKS,
};
const MAPPED_GRAPH = {
  id: undefined,
  name: undefined,
  nodes: MAPPED_NODES,
  links: MAPPED_LINKS,
};

describe("mappers maps between Theresa API representation of nodes/links and Redux nodes/links", () => {
  test("nodes", () => {
    expect(mapFromTheresaNodes(JSON_NODES)).toStrictEqual(MAPPED_NODES);
  });

  test("links", () => {
    expect(mapFromTheresaLinks(JSON_LINKS)).toStrictEqual(MAPPED_LINKS);
  });

  test("graph", () => {
    expect(mapFromTheresaGraph(JSON_GRAPH)).toStrictEqual(MAPPED_GRAPH);
  });
});
