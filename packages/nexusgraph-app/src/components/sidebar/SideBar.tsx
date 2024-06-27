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

import { GraphMetaData, selectGraph } from "nexusgraph-redux";
import { NewGraphButton } from "./new-graph-button";
import { StyledGraphListItem } from "./styled";

interface SideBarProps {
  onClick: (graphId: number | undefined) => void;
  graphList: GraphMetaData[];
}

export default function SideBar(props: SideBarProps): JSX.Element {
  const graphId = selectGraph().id;

  return (
    <>
      <NewGraphButton />
      {props.graphList.map((metaData) => (
        <StyledGraphListItem
          key={metaData.id}
          data-testid={`graphListItem-${metaData.id}`}
          onClick={() => props.onClick(metaData.id)}
          displayedItem={metaData.id == graphId}
        >
          {metaData.name}
        </StyledGraphListItem>
      ))}
    </>
  );
}
