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

import "reflect-metadata";
import { GraphClient } from "../GraphClient";
import { JsonGraphQLServerClient } from "./JsonGraphQLServerClient";

const graphClient: GraphClient = new JsonGraphQLServerClient("10000");

describe("Client abstracts away the db layer and presents a semantic layer for app", () => {
  it("should extract response object from any operations", () => {
    const responseData = {
      data: {
        createGraph: {
          id: "2",
          name: "My Graph",
          created_on: "2024-07-15T00:00:00.000Z",
          last_updated_on: "2024-07-15T00:00:00.000Z",
          user_id: "10000",
        },
      },
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(graphClient["extractEntity"]("createGraph", responseData)).toEqual({
      id: 2,
      name: "My Graph",
      created_on: "2024-07-15T00:00:00.000Z",
      last_updated_on: "2024-07-15T00:00:00.000Z",
      user_id: "10000",
    });
  });
});
