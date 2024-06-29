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

describe("'Integration'-style tests", () => {
  beforeEach(() => {
    cy.openApp().deleteAllGraphs();
  });

  it("deleting graph when there is only 1 graph", () => {
    cy.newGraph()
      .get('[data-testid="deleteButton"]')
      .click({ force: true })
      .get('[data-testid^="graphListItem-"]')
      .should("not.exist")
      .get("svg")
      .find(`[aria-label^="graph-node"]`)
      .should("not.exist");
  });

  it("deleting the last graph when there are multiple graphs", () => {
    cy.newGraph()
      .wait(5000)
      .newGraph()
      .get('[data-testid="deleteButton"]')
      .click({ force: true })
      .get('[data-testid^="graphListItem-"]')
      .should("exist")
      .get("svg")
      .find(`[aria-label^="graph-node"]`)
      .should("exist");
  });
});
