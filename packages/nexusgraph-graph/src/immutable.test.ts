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
import { Graph } from "../../nexusgraph-redux";
import { addLink, addNode, mutateLinkFieldById, mutateNodeFieldById } from "./immutable";

const OLD_GRAPH_STATE = produce({} as Graph, (draft) => {
  draft.id = "graph1";
  draft.name = "My Graph";
  draft.nodes = [
    {
      id: "foo",
      fields: {
        name: "Jack",
        desc: "A person",
      },
    },
    {
      id: "bar",
      fields: {
        name: "Tom",
        desc: "Yet another person",
      },
    },
  ];
  draft.links = [
    {
      id: "bat",
      source: "node1",
      target: "node2",
      fields: {
        type: "label1",
      },
    },
    {
      id: "baz",
      source: "node3",
      target: "node4",
      fields: {
        type: "label2",
      },
    },
  ];
});

describe("Graph interactions", () => {
  test("adding a new node creates a deeply-new graph state object", () => {
    expect(
      addNode(OLD_GRAPH_STATE, {
        id: "newPerson",
        fields: {
          name: "Amy",
          description: "New Person",
        },
      })
    ).toStrictEqual({
      id: "graph1",
      name: "My Graph",
      nodes: [
        {
          id: "foo",
          fields: {
            name: "Jack",
            desc: "A person",
          },
        },
        {
          id: "bar",
          fields: {
            name: "Tom",
            desc: "Yet another person",
          },
        },
        {
          id: "newPerson",
          fields: {
            name: "Amy",
            description: "New Person",
          },
        },
      ],
      links: [
        {
          id: "bat",
          source: "node1",
          target: "node2",
          fields: {
            type: "label1",
          },
        },
        {
          id: "baz",
          source: "node3",
          target: "node4",
          fields: {
            type: "label2",
          },
        },
      ],
    });
  });

  test("adding a new link creates a deeply-new graph state object", () => {
    expect(
      addLink(OLD_GRAPH_STATE, {
        id: "newLink",
        source: "node10",
        target: "node11",
        fields: {
          type: "new link label",
        },
      })
    ).toStrictEqual({
      id: "graph1",
      name: "My Graph",
      nodes: [
        {
          id: "foo",
          fields: {
            name: "Jack",
            desc: "A person",
          },
        },
        {
          id: "bar",
          fields: {
            name: "Tom",
            desc: "Yet another person",
          },
        },
      ],
      links: [
        {
          id: "bat",
          source: "node1",
          target: "node2",
          fields: {
            type: "label1",
          },
        },
        {
          id: "baz",
          source: "node3",
          target: "node4",
          fields: {
            type: "label2",
          },
        },
        {
          id: "newLink",
          source: "node10",
          target: "node11",
          fields: {
            type: "new link label",
          },
        },
      ],
    });
  });

  test("mutating node field by ID generates a deeply-new graph state object", () => {
    expect(mutateNodeFieldById(OLD_GRAPH_STATE, "bar", "name", "Mike")).toStrictEqual({
      id: "graph1",
      name: "My Graph",
      nodes: [
        {
          id: "foo",
          fields: {
            name: "Jack",
            desc: "A person",
          },
        },
        {
          id: "bar",
          fields: {
            name: "Mike",
            desc: "Yet another person",
          },
        },
      ],
      links: [
        {
          id: "bat",
          source: "node1",
          target: "node2",
          fields: {
            type: "label1",
          },
        },
        {
          id: "baz",
          source: "node3",
          target: "node4",
          fields: {
            type: "label2",
          },
        },
      ],
    });
  });

  test("mutating link field by ID generates a deeply-new graph state object", () => {
    expect(mutateLinkFieldById(OLD_GRAPH_STATE, "bat", "type", "new label")).toStrictEqual({
      id: "graph1",
      name: "My Graph",
      nodes: [
        {
          id: "foo",
          fields: {
            name: "Jack",
            desc: "A person",
          },
        },
        {
          id: "bar",
          fields: {
            name: "Tom",
            desc: "Yet another person",
          },
        },
      ],
      links: [
        {
          id: "bat",
          source: "node1",
          target: "node2",
          fields: {
            type: "new label",
          },
        },
        {
          id: "baz",
          source: "node3",
          target: "node4",
          fields: {
            type: "label2",
          },
        },
      ],
    });
  });
});
