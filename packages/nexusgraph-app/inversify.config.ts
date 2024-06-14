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

import { Container } from "inversify";
import "reflect-metadata"; // https://stackoverflow.com/a/37535207

import * as Sentry from "@sentry/react";
import { AstraiosGraphClient, GraphClient, JsonGraphQLServerClient } from "nexusgraph-db";
import { JsonServerClient, NLPClient, TheresaClient } from "nexusgraph-nlp";
import TYPES from "./types";

/**
 * Instantiate an inversify container for dependency injection
 */
const container = new Container();

/**
 * Bind the class we use to implement the interface
 */
if (process.env.NLP_CLIENT == "TheresaClient") {
  container.bind<NLPClient>(TYPES.NLPClient).to(TheresaClient).inSingletonScope();
} else if (process.env.NLP_CLIENT == "JsonServerClient") {
  container.bind<NLPClient>(TYPES.NLPClient).to(JsonServerClient).inSingletonScope();
} else {
  throw new Error("Unknown NLP_CLIENT implementation");
}

/**
 * Bind a {@link GraphClient} implementation at runtime according to the following rule:
 *
 * - If the value of `GRAPH_API_CLIENT` environment variable is "AstraiosGraphClient", an instance of
 *   {@link AstraiosGraphClient} will be injected
 * - If the value of `GRAPH_API_CLIENT` environment variable is "JsonGraphQLServerClient", an instance of
 *   {@link JsonGraphQLServerClient} will be injected
 * - Any other values will cause an error "Unknown GRAPH_API_CLIENT implementation" to be thrown
 *
 * Invoking this method will bind a specified value to {@link TYPES.userId} and {@link TYPES.accessToken}. If the Graph
 * client has already bound, this method does nothing.
 *
 * @param userId  The provided binding value for {@link TYPES.userId}
 * @param accessToken  The provided binding value for {@link TYPES.accessToken}
 */
const bindGraphClient = (userId: string, accessToken: string) => {
  if (container.isBound(TYPES.GraphApiClient)) {
    // Re-binding causes "Ambiguous match found for serviceIdentifier: Symbol(GraphClient)" error,
    // so we bind it only once
    return;
  }

  container.bind<string>(TYPES.userId).toConstantValue(userId);
  container.bind<string>(TYPES.accessToken).toConstantValue(accessToken);

  if (process.env.GRAPH_API_CLIENT == "AstraiosGraphClient") {
    container.bind<GraphClient>(TYPES.GraphApiClient).to(AstraiosGraphClient).inSingletonScope();
  } else if (process.env.GRAPH_API_CLIENT == "JsonGraphQLServerClient") {
    container.bind<GraphClient>(TYPES.GraphApiClient).to(JsonGraphQLServerClient).inSingletonScope();
  } else {
    const error = new Error("Unknown GRAPH_API_CLIENT implementation");
    Sentry.captureException(error);
    throw error;
  }
};

export { container, bindGraphClient };
