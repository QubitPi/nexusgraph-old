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
import { Container } from "inversify";

import { JsonServerClient, NLPClient, TheresaClient } from "../nexusgraph-nlp";

/**
 * Define the types identifier to get dependency
 */
const TYPES = {
  accessToken: Symbol("accessToken"),
  userId: Symbol("userId"),

  NLPClient: Symbol("NLPClient"),
};

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

export { container, TYPES };
