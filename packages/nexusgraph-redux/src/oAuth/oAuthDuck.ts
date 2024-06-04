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
import { useSelector } from "react-redux";
import { GlobalState } from "../globalState";

export const OAUTH_STATE = "oAuth";
const UPDATE_OAUTH_STATE = OAUTH_STATE + "/UPDATE_OAUTH_STATE";

export interface OAuthState {
  accessToken: string;
  userInfo: { sub: string };
}

interface OAuthAction {
  type: typeof OAUTH_STATE;
  payload: OAuthState;
}

const initialState: OAuthState = {
  accessToken: "initialToken",
  userInfo: { sub: "initialUserId" },
};

export function selectOAuth() {
  return useSelector((state: GlobalState) => state.oAuth);
}

export default function oAuthReducer(state = initialState, action: OAuthAction): OAuthState {
  switch (action.type) {
    case UPDATE_OAUTH_STATE:
      return action.payload;
    default:
      return state;
  }
}

export function updateOAuthState(oAuthState: OAuthState) {
  return { type: UPDATE_OAUTH_STATE, payload: oAuthState };
}
