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
describe("Delete button removes displaying graph both from UI and database", () => {
  before(() => {
    cy.openApp();
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("if user has no graph (e.g. first-time login or graph list is empty), button is disabled", () => {
    cy.get('[data-testid="deleteButton"]').should("not.exist");
  });

  it("when user creates a graph, button becomes active", () => {
    cy.newGraph();

    cy.get('[data-testid="deleteButton"]').should("exist");
  });

  it("when user deletes the graph, the button becomes in-active again", () => {
    cy.get('[data-testid="deleteButton"]').click();

    cy.get('[data-testid^="graphListItem-"]').should("not.exist");
    cy.get("svg").find(`[aria-label^="graph-node"]`).should("not.exist");

    cy.get('[data-testid="deleteButton"]').should("not.exist");
  });
});
