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
import cors from "cors";
import express from "express";
import jsonGraphqlExpress from "json-graphql-server";

const PORT = 5000;
const app = express();
const data = {
  graphs: [
    {
      id: 1,
      user: 10000,
      name: "My First Graph",
      nodes: [
        { id: 1000, fields: { name: "Nexus Graph" } },
        { id: 1001, fields: { name: "People's lives" } },
      ],
      links: [{ id: 2000, source: 1000, target: 1001, fields: { type: "changes" } }],
      created_on: new Date("2023-12-21"),
      last_updated_on: new Date("2023-12-22"),
    },
  ],
};

app.use(cors());
app.use("/", jsonGraphqlExpress.default(data));
app.listen(PORT);
