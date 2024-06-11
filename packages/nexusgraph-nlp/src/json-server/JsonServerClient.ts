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
import axios from "axios";
import { injectable } from "inversify";
import { Graph } from "nexusgraph-redux";
import "reflect-metadata";
import { NLPClient } from "../NLPClient";

/**
 * An implementation of {@link NLPClient} that serving local dev and tests
 */
@injectable()
export class JsonServerClient implements NLPClient {
  public entityExtraction(text: string): Promise<Graph> {
    return this.remoteEntityExtraction(text);
  }

  /**
   * Asynchronously returns the same graph data for dev and test.
   *
   * @param text  Not used
   *
   * @returns a Promise the Redux state
   */
  private remoteEntityExtraction = async (text: string): Promise<Graph> => {
    return {
      nodes: await this.fetchRemote("nodes"),
      links: await this.fetchRemote("links"),
    };
  };

  /**
   * Asynchronously returns the same JSON at a specified json-server API path.
   *
   * The supported paths are:
   *
   * 1. "nodes"
   * 2. "links"
   *
   * @param path  The provided path, without any `/`
   *
   * @returns a Promise wrapping a JSON object
   */
  private fetchRemote = async (path: string) => {
    const response = axios.get("http://localhost:3001/" + path);

    response.catch(async (error) => {
      throw new Error(error);
    });

    return (await response).data;
  };
}
