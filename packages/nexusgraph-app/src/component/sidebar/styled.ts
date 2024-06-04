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
import styled from "styled-components";

export const StyledGraphListItem = styled.button<{ displayedItem: boolean }>`
  position: relative;
  width: 40%;
  min-width: 90px;
  aspect-ratio: 1.618 / 1;
  border-radius: 1rem;
  border: none;
  margin: 5%;
  color: #f9bfd5;
  background: rgba(256, 256, 256, 0.6);
  cursor: pointer;
  word-wrap: break-word;
  font-size: 20px;
  & svg {
    height: 30%;
    stroke-width: 1px;
    stroke: #f9bfd5;
  }

  ${(props) => props.displayedItem && "border-style: solid; border-width: 3px; border-color: rgba(245, 95, 145, 0.45);"}

  &:hover {
    border-style: solid;
    border-width: 3px;
    border-color: rgba(245, 95, 145, 0.45);
  }
`;
