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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useLogto } from "@logto/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { DefaultGraphClient, GraphClient } from "../../nexusgraph-db";
import { Callback } from "../../nexusgraph-oauth";
import { updateOAuthState } from "../../nexusgraph-redux";
import App from "./App";
import { StyledSpinner } from "./styled";

interface ProdAppProps {
  initReduxStore: (userId: string, graphClient: GraphClient, dispatch: any) => void;
}

/**
 * The {@link ProdApp} involves OAuth2 authentication and authorization.
 *
 * All prod configurations are put here
 *
 * @returns DOM
 */
export default function ProdApp(props: ProdAppProps): JSX.Element {
  const dispatch = useDispatch();

  const { signIn, signOut, isAuthenticated, isLoading, getAccessToken, fetchUserInfo, error } = useLogto();

  if (error && isAuthenticated) {
    signOut(process.env.LOGTO_SIGN_OUT_REDIRECT_URL as string);
  }

  if (!isAuthenticated && !isLoading) {
    signIn(process.env.LOGTO_SIGN_IN_CALLBACK_URL as string);
  }

  useEffect(() => {
    const logtoApiResource = process.env.LOGTO_API_RESOURCE_IDENTIFIER as string;
    getAccessToken(logtoApiResource).then((token: any) => {
      fetchUserInfo().then((userInfo: any) => {
        dispatch(
          updateOAuthState({
            accessToken: token,
            userInfo: { sub: userInfo["sub"] },
          })
        );

        const userId = userInfo["sub"];
        const accessToken = token;
        const graphClient = new DefaultGraphClient(userId, accessToken);
        props.initReduxStore(userId, graphClient, dispatch);
      });
    });
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <StyledSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Callback />} />
      </Routes>
    </Router>
  );
}
