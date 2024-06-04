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
describe("Node Inspector Panel rendering", () => {
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

  it("Updating pane title instantly changes the correspoinding node caption on canvas", () => {
    cy.get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 200, { force: true })
      .trigger("dblclick", 200, 200, { force: true });

    cy.wait(1000);

    cy.get(`[aria-label^="graph-node"]`)
      .trigger("mouseover", { force: true })
      .trigger("mouseenter", { force: true })
      .get('[data-testid="viz-details-pane-title"]')
      .find("[contenteditable]")
      .clear()
      .type("Jack{enter}", { force: true })
      .contains("Jack");
  });

  it.skip("Updating node label is instant", () => {
    cy.get('[data-testid="graphCanvas"]')
      .trigger("click", 200, 200, { force: true })
      .trigger("dblclick", 200, 200, { force: true });

    cy.wait(1000);

    cy.get(`[aria-label^="graph-node"]`)
      .first()
      .trigger("mouseover", { force: true })
      .trigger("mouseenter", { force: true })
      .trigger("click", { force: true })
      .get('[data-testid="styleable-node-label"]', { timeout: 5000 })
      .clear()
      .type("Person{enter}", { force: true })
      .wait(1500)
      .get('[data-testid="styleable-node-label"]', { timeout: 5000 })
      .contains("Person");
  });

  it("Updating relationship type is instant", () => {
    cy.newGraph();

    cy.wait(3000);

    cy.get(".relationship", { timeout: 5000 })
      .trigger("click", { force: true })
      .get('[data-testid="rel-type"]', { timeout: 5000 })
      .first()
      .clear()
      .type("New Link Label{enter}", { force: true })
      .wait(1500)
      .get('[data-testid="rel-type"]', { timeout: 5000 })
      .contains("New Link Label");
  });
});
