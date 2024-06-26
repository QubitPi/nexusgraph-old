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

import axios from "axios";

import { NLPClient } from "./NLPClient";
import { TheresaClient } from "./TheresaClient";

import { v4 as uuidv4 } from "uuid";
const theresaClient: NLPClient = new TheresaClient();

jest.mock("axios");

describe("NLP delegates processing to remote WS", () => {
  it("returns graph", async () => {
    const nlpData = {
      nodes: [
        {
          fields: {
            label: "China",
            type: "entity",
          },
          id: "China",
          onCanvasId: uuidv4(),
        },
        {
          fields: {
            label: "Mandarin",
            type: "entity",
          },
          id: "Mandarin",
          onCanvasId: uuidv4(),
        },
      ],
      links: [
        {
          fields: {
            label: "capital",
          },
          source: "Mandarin",
          target: "China",
        },
      ],
    };

    axios.create = jest.fn(() => axios);
    Object(axios.post).mockResolvedValueOnce(nlpData);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    theresaClient["fetchRemote"]("China").then((nlpState: any) => {
      expect(nlpState).toEqual(nlpData);

      expect(axios.create).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith(
        "entityExtraction",
        {
          dataframe_split: {
            columns: ["text"],
            data: [["China"]],
          },
        },
        { headers: { "Content-Type": "application/json", accept: "*/*" } }
      );
    });
  });
});
