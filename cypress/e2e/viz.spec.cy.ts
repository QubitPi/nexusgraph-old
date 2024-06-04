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
describe("Graph visualization tests", () => {
  before(() => {
    cy.openApp();
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.deleteAllGraphs();
  });

  afterEach(() => {
    cy.deleteAllGraphs();
  });

  it("can create new node by double clicking the canvas", () => {
    cy.newGraph()
      .get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 200, { force: true })
      .trigger("dblclick", 200, 200, { force: true })
      .get('[data-testid="nodeGroups"]', { timeout: 10000 })
      .contains("New Node");
  });

  it("can create a new relationship by alt-clicking two nodes in sequence", () => {
    cy.get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 200, { force: true })
      .trigger("dblclick", 200, 200, { force: true });

    cy.wait(3000);

    cy.get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 100, { force: true })
      .trigger("dblclick", 200, 100, { force: true });

    cy.get(`[aria-label^="graph-node"]`)
      .each(($el) => {
        cy.wrap($el).rightclick({
          altKey: true,
          metaKey: true,
          shiftKey: true,
          ctrlKey: true,
          multiple: true,
          force: true,
        });
      })
      .get(".relationships")
      .should("exist");
  });
});
