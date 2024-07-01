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

/**
 * The Inversify type identifiers at runtime
 */
const TYPES = {
  /**
   * The OAuth 2 access token the currently logged-in user use for access backend API.
   */
  accessToken: Symbol("accessToken"),

  /**
   * The OIDC ID (i.e. the Natural Key) of the currently logged-in user.
   */
  userId: Symbol("userId"),

  /**
   * The database Primary Key associated with user.
   */
  userPrimaryKey: Symbol("userPrimaryKey"),

  /**
   * The Graph client for Graph Data CRUD.
   */
  GraphApiClient: Symbol("GraphApiClient"),

  /**
   * The AI client for entity extractions.
   */
  NLPClient: Symbol("NLPClient"),
};

export default TYPES;
