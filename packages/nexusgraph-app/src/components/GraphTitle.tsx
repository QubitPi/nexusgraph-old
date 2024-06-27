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

import { selectGraph } from "nexusgraph-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledInput } from "./styled";

interface GraphTitleProps {
  graphId: number;
  onChange: (graphId: number, newTitle: string) => void;
}

export default function GraphTitle(props: GraphTitleProps): JSX.Element {
  const { t } = useTranslation();

  const initialGraphName = t("Unamed Graph");

  const graph = selectGraph();

  const [inputValue, setInputValue] = useState(graph.name ? graph.name : initialGraphName);

  useEffect(() => {
    setInputValue(graph.name ? graph.name : initialGraphName);
  }, [graph.id]);

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
