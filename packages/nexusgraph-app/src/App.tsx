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
import { produce } from "immer";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { GraphClient } from "../../nexusgraph-db";
import { GraphBrowser } from "../../nexusgraph-graph";
import {
  GraphMetaData,
  GraphState,
  initialState,
  selectGraphData,
  selectGraphList,
  updateGraphData,
  updateGraphList,
  updateSingleItem,
} from "../../nexusgraph-redux";
import logo from "../public/logo.svg";
import user from "../public/user.svg";
import { DeleteButton } from "./component";
import GraphTitle from "./component/GraphTitle";
import { SideBar } from "./component/sidebar";
import { GraphClientContext } from "./Contexts";
import {
  StyledApp,
  StyledAppLogo,
  StyledAppName,
  StyledBody,
  StyledFooter,
  StyledGraphBrowser,
  StyledGraphTitle,
  StyledHeader,
  StyledSidebar,
  StyledUserIcon,
} from "./styled";

/**
 * {@link App} defines the overall [layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background)
 * as well as the common dynamics of the app, such as deleting a graph or updating a graph state.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const graphClient: GraphClient = useContext(GraphClientContext) as GraphClient;

  const graphSate = selectGraphData();
  const graphId = graphSate.id;
  const graphList = selectGraphList();

  const setDisplayingGraphById = (graphId: string | undefined) => {
    if (graphId == null) {
      return;
    }

    graphClient.getGraphById(graphId).then((graph) => {
      dispatch(
        updateGraphData({
          id: graph.id,
          name: graph.name,
          nodes: graph.nodes,
          links: graph.links,
        })
      );
    });
  };

  const onTitleUpdate = (graphId: string, newTitle: string) => {
    if (graphId == null) {
      const error = new Error("graphId is null");
      Sentry.captureException(error);
      throw error;
    }

    const newGraphData: GraphState = produce(graphSate, (draft) => {
      draft.name = newTitle;
    });

    graphClient.saveOrUpdate(newGraphData).then((response) => {
      dispatch(updateSingleItem({ id: graphId, name: newTitle }));
    });
  };

  const deleteGraphById = (graphId: string) => {
    if (graphId == null) {
      const error = new Error("graphId is null");
      Sentry.captureException(error);
      throw error;
    }

    graphClient.deleteGraphById(graphId).then((response) => {
      const nextDisplayedGraphId = getNextDisplayedGraphId(graphList, graphId);

      if (nextDisplayedGraphId == null) {
        dispatch(updateGraphList([]));
        dispatch(updateGraphData(initialState));
        return;
      }

      graphClient.getGraphById(nextDisplayedGraphId).then((graph) => {
        dispatch(
          updateGraphData({
            id: graph.id,
            name: graph.name,
            nodes: graph.nodes,
            links: graph.links,
          })
        );
        dispatch(updateGraphList(graphList.filter((metadata) => metadata.id != graphId)));
      });
    });
  };

  return (
    <StyledApp>
      <StyledHeader>
        <StyledUserIcon>
          <img src={user} alt="User" />
        </StyledUserIcon>
        {graphId && (
          <StyledGraphTitle>
            <GraphTitle graphId={graphId} onChange={onTitleUpdate} />
          </StyledGraphTitle>
        )}
      </StyledHeader>

      <StyledBody>
        <StyledSidebar>
          <SideBar onClick={setDisplayingGraphById} graphList={graphList} />
        </StyledSidebar>
        <StyledGraphBrowser id="graphBrowser">
          {graphId && <DeleteButton graphId={graphId} onClick={deleteGraphById} />}
          <GraphBrowser />
        </StyledGraphBrowser>
      </StyledBody>

      <StyledFooter>
        <StyledAppLogo>
          <img src={logo} alt="Logo" />
        </StyledAppLogo>
        <StyledAppName>Nexus Graph</StyledAppName>
      </StyledFooter>
    </StyledApp>
  );
}

function getNextDisplayedGraphId(graphList: GraphMetaData[], deletedGraphId: string) {
  const listLen = graphList.length;

  if (listLen == 1) {
    return null;
  }

  const deletedGraphIdIdx = graphList.findIndex((metadata) => metadata.id == deletedGraphId);

  return deletedGraphIdIdx == listLen - 1 ? graphList[deletedGraphIdIdx - 1].id : graphList[deletedGraphIdIdx + 1].id;
}
