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
import { v4 as uuidv4 } from "uuid";
import { addLink, addNode, mutateLinkFieldById, mutateNodeFieldById } from "./immutable";

const JACK: Node = {
  id: 1,
  onCanvasId: uuidv4(),
  fields: {
    name: "Jack",
    desc: "A person",
  },
};
const TOM: Node = {
  id: 2,
  onCanvasId: uuidv4(),
  fields: {
    name: "Tom",
    desc: "Yet another person",
  },
};
const LINK1: Link = {
  id: 3,
  onCanvasId: uuidv4(),
  source: "node1",
  target: "node2",
  fields: {
    type: "label1",
  },
};
const LINK2: Link = {
  id: 4,
  onCanvasId: uuidv4(),
  source: "node3",
  target: "node4",
  fields: {
    type: "label2",
  },
};
const GRAPH_ID = 5;
const GRAPH_NAME = "My Graph";

const OLD_GRAPH_STATE = produce({} as Graph, (draft) => {
  draft.id = GRAPH_ID;
  draft.name = GRAPH_NAME;
  draft.nodes = [JACK, TOM];
  draft.links = [LINK1, LINK2];
});

describe("Graph interactions", () => {
  test("adding a new node creates a deeply-new graph state object", () => {
    const newNodeID = 6;
    expect(
      addNode(OLD_GRAPH_STATE, {
        id: newNodeID,
        onCanvasId: "newPerson",
        fields: {
          name: "Amy",
          description: "New Person",
        },
      })
    ).toStrictEqual({
      id: GRAPH_ID,
      name: GRAPH_NAME,
      nodes: [
        JACK,
        TOM,
        {
          id: newNodeID,
          onCanvasId: "newPerson",
          fields: {
            name: "Amy",
            description: "New Person",
          },
        },
      ],
      links: [LINK1, LINK2],
    });
  });

  test("adding a new link creates a deeply-new graph state object", () => {
    const newLinkId = 7;
    expect(
      addLink(OLD_GRAPH_STATE, {
        id: newLinkId,
        onCanvasId: "newLink",
        source: "node10",
        target: "node11",
        fields: {
          type: "new link label",
        },
      })
    ).toStrictEqual({
      id: GRAPH_ID,
      name: GRAPH_NAME,
      nodes: [JACK, TOM],
      links: [
        LINK1,
        LINK2,
        {
          id: newLinkId,
          onCanvasId: "newLink",
          source: "node10",
          target: "node11",
          fields: {
            type: "new link label",
          },
        },
      ],
    });
  });

  test("mutating node field by natural key generates a deeply-new graph state object", () => {
    expect(mutateNodeFieldById(OLD_GRAPH_STATE, TOM.onCanvasId, "name", "Mike")).toStrictEqual({
      id: GRAPH_ID,
      name: GRAPH_NAME,
      nodes: [
        JACK,
        {
          id: TOM.id,
          onCanvasId: TOM.onCanvasId,
          fields: {
            name: "Mike",
            desc: TOM.fields.desc,
          },
        },
      ],
      links: [LINK1, LINK2],
    });
  });

  test("mutating link field by natural key generates a deeply-new graph state object", () => {
    expect(mutateLinkFieldById(OLD_GRAPH_STATE, LINK1.onCanvasId, "type", "new label")).toStrictEqual({
      id: GRAPH_ID,
      name: GRAPH_NAME,
      nodes: [JACK, TOM],
      links: [
        {
          id: LINK1.id,
          onCanvasId: LINK1.onCanvasId,
          source: LINK1.source,
          target: LINK1.target,
          fields: {
            type: "new label",
          },
        },
        LINK2,
      ],
    });
  });
});
