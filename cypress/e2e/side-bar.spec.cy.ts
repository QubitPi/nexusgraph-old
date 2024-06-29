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

describe("Side bar displays new graph button and graph list", () => {
  beforeEach(() => {
    cy.openApp().deleteAllGraphs();
  });

  it("displays new graph button all the time", () => {
    cy.get("button[id='newGraphButton']").should("exist");
  });

  it("graph list is initially empty", () => {
    cy.get('[data-testid^="graphListItem-"]').should("not.exist");
  });

  it("when a new graph is created with the new graph button, graph list becomes populated", () => {
    cy.newGraph();

    cy.get('[data-testid^="graphListItem-"]').should("exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("exist");
  });
});
