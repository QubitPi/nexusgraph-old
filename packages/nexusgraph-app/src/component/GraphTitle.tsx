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

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { selectGraphData } from "../../../nexusgraph-redux";
import { StyledInput } from "./styled";

export const INITIAL_GRAPH_NAME = "Unamed Graph";

interface GraphTitleProps {
  graphId: string;
  onChange: (graphId: string, newTitle: string) => void;
}

export default function GraphTitle(props: GraphTitleProps): JSX.Element {
  const { t } = useTranslation();

  const initialGraphName = t("Unamed Graph");

  const graphData = selectGraphData();

  const [inputValue, setInputValue] = useState(graphData.name ? graphData.name : initialGraphName);

  useEffect(() => {
    setInputValue(graphData.name ? graphData.name : initialGraphName);
  }, [graphData.id]);

  return (
    <StyledInput
      data-testid="graphTitle"
      value={inputValue}
      onChange={(event) => {
        setInputValue(event.target.value);
        props.onChange(props.graphId, event.target.value);
      }}
    />
  );
}
