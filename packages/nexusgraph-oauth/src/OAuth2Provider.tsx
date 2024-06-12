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
import { useNavigate } from "react-router-dom";

import { LogtoConfig, LogtoProvider, useHandleSignInCallback } from "@logto/react";

/**
 * Creat LogtoProvider to provide a Logto context
 *
 * @param param0 App content
 *
 * @returns Logto provider component
 */
const OAuth2Provider = ({ children }: any): JSX.Element => {
  const config: LogtoConfig = {
    endpoint: process.env.LOGTO_ENDPOINT_URL as string,
    appId: process.env.LOGTO_APP_ID as string,
    resources: [process.env.LOGTO_API_RESOURCE_IDENTIFIER as string],
  };
  return <LogtoProvider config={config}>{children}</LogtoProvider>;
};

/**
 * Navigate to root path when finished signIn
 *
 * @returns void
 */
export const Callback = () => {
  const navigate = useNavigate();

  const { isLoading } = useHandleSignInCallback(() => {
    navigate("/");
  });

  if (isLoading) {
    return <div>Redirecting...</div>;
  }

  return <></>;
};
export default OAuth2Provider;
