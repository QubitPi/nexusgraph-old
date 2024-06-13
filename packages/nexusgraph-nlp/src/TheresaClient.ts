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

import * as Sentry from "@sentry/react";
import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { Graph } from "../../nexusgraph-redux";
import { NLPClient } from "./NLPClient";

const ENTITY_EXTRACTION_PATH_PARAM = "entityExtraction";

/**
 * An implementation of {@link NLPClient} that delegates NLP to theresa AI service.
 */
@injectable()
export class TheresaClient implements NLPClient {
  public entityExtraction(text: string): Promise<Graph> {
    return this.remoteEntityExtration(text);
  }

  /**
   * Given an array of editor lines, this method asynchronously performs entity extration on them and converts the
   * extracted entities to the format of {@link Graph}.
   *
   * @param textLines  The specified editor contents to perform entity extration
   *
   * @returns a Promise the Redux state
   */
  private remoteEntityExtration = async (text: string): Promise<Graph> => {
    const response = this.fetchRemote(text);
    const data: Graph = (await response).data;
    return data;
  };

  /**
   * Queries configured Machine Learning WS to perform the named entity extration on a list of specified texts
   *
   * The HTTP query concats texts into a single string so that only 1 round-trip is executed
   *
   * @param text  The provided text
   *
   * @returns a Promise of the WS response data
   */
  private fetchRemote = async (text: string) => {
    const instanceAxios = axios.create({
      baseURL: process.env.NLP_API_URL as string,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    };
    const payload = {
      columns: ["text"],
      data: [[text]],
    };

    const response = instanceAxios.post(
      ENTITY_EXTRACTION_PATH_PARAM,
      {
        dataframe_split: payload,
      },
      config
    );

    response.catch(async (error) => {
      Sentry.captureException(error);
    });

    return await response;
  };
}
