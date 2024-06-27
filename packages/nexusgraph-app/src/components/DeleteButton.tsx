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

import { TrashIcon } from "@heroicons/react/24/outline";
import { StyledDeleteButton } from "./styled";

interface DeleteButtonProps {
  graphId: number;
  onClick: (graphId: number) => void;
}

/**
 * {@link DeleteButton} is a self-managing component that is responsible for a delete button styling (excluding button
 * label) only.
 *
 * Thus {@link DeleteButton} should be logic-context agnostic and its
 * [single-responsibility](https://en.wikipedia.org/wiki/Single-responsibility_principle) should be **styling**
 *
 * @returns a DOM object
 */
export default function DeleteButton(props: DeleteButtonProps): JSX.Element {
  return (
    <StyledDeleteButton onClick={() => props.onClick(props.graphId)}>
      <TrashIcon data-testid="deleteButton" />
    </StyledDeleteButton>
  );
}
