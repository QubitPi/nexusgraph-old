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
describe("Graph title", () => {
  before(() => {
    cy.openApp();
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("if user has no graph (e.g. first-time login or graph list is empty), title section is not shown", () => {
    cy.get('[data-testid="graphTitle"]').should("not.exist");
  });

  it("when user creates a graph, title section shows up", () => {
    cy.newGraph();

    cy.get('[data-testid="graphTitle"]').should("exist");
  });

  it("reflects the updated title immediately in sidebase list when user update title", () => {
    cy.get('[data-testid="graphTitle"]')
      .click({ force: true })
      .clear()
      .type("Modified Title")
      .get('[data-testid^="graphListItem-"]')
      .contains("Modified Title");
  });

  it("still preserves the updated title after a page reloadl; i.e. change gets persisted into database", () => {
    cy.get('[data-testid="graphTitle"]')
      .click({ force: true })
      .clear()
      .type("Yet Another Modified Title")
      .reload(true)
      .get('[data-testid^="graphListItem-"]')
      .contains("Yet Another Modified Title");
  });
});
