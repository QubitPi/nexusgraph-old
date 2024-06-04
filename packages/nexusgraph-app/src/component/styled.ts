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

export const StyledDeleteButton = styled.button`
  border: none;
  background-color: transparent;

  & svg {
    position: relative;
    left: 1vw;
    top: 2vh;
    height: 3vh;
    color: #fff;
    display: inline-block;
    padding-left: 1%;
    background: transparent;
    background-color: transparent;
    z-index: 999;
  }

  & svg:hover {
    cursor: pointer;
    color: gray;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
  }
`;

export const StyledInput = styled.input`
  font-size: 3vw;
  font-weight: bold;
  color: #fff;
  background-color: transparent;
  border: none;
`;
