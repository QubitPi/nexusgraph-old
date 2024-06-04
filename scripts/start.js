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
"use strict";

const configFactory = require("../config/webpack/webpack.config");
const devServerConfig = require("../config/webpack/webpackDevServer.config");

const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = configFactory("development");

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...devServerConfig(), open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log("Starting server on http://localhost:3000");
});
