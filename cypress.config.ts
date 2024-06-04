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
import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    supportFile: "cypress/support/commands.ts",
    env: {
      skipSignIn: process.env.SKIP_SIGN_IN as string,
      userEmail: process.env.TEST_USER_EMAIL as string,
      password: process.env.TEST_USER_PASSWORD as string,
      logtoEndpointUrl: process.env.LOGTO_ENDPOINT_URL as string,
      nodeEnv: process.env.NODE_ENV as string,
      entityExtractionServer: (process.env.THERESA_API_URL as string) + "entityExtraction",
      nodeExpand: (process.env.THERESA_API_URL as string) + "expand/",
      graphApiEndpoint: process.env.GRAPH_API_RESOURCE as string,
    },
    retries: {
      runMode: 10,
      openMode: 0,
    },
  },
});
