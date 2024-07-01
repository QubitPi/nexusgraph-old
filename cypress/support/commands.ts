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

Cypress.Commands.add("openApp", () => {
  if (Cypress.env("skipSignIn") == "true") {
    cy.visit("http://localhost:3000/");
  } else {
    cy.login(Cypress.env("userEmail"), Cypress.env("password"))
      .then(() => {
        cy.request("http://localhost:3000/").then((resp) => {
          expect(resp.status).to.eq(200);
        });
      })
      .wait(10000); // wait before login redirection completes
  }
});

Cypress.Commands.add("login", (userEmail: string, password: string) => {
  cy.origin(Cypress.env("logtoEndpointUrl"), { args: { userEmail, password } }, ({ userEmail, password }) => {
    cy.visit("http://localhost:3000").wait(5000); // The reason we need to wait for few secs is https://github.com/cypress-io/cypress/issues/25255#issuecomment-1383156758
    cy.get('input[name="identifier"]').type(userEmail);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  });
});

Cypress.Commands.add("newGraph", () => {
  cy.get("button[id='newGraphButton']")
    .click({ force: true })
    .get("[data-testid='newGraphMethodButton-NLP']")
    .click({ force: true })
    .get("textarea", { timeout: 10000 })
    .click({ force: true })
    .type("我爱中国")
    .wait(3000) // needs to wait before MethodModal is fully initialized
    .get("[data-testid='newGraphButton-NLP']", { timeout: 10000 })
    .click({ force: true })
    .get('[data-testid^="graphListItem-"]', { timeout: 10000 })
    .should("exist")
    .get("svg")
    .find(`[aria-label^="graph-node"]`)
    .should("exist");
});

Cypress.Commands.add("setBrowserLanguage", (language, languages, acceptLanguages) => {
  cy.visit("http://localhost:3000/", {
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, "language", { value: language });
      Object.defineProperty(win.navigator, "languages", { value: languages });
      Object.defineProperty(win.navigator, "accept_languages", { value: acceptLanguages });
    },
  });
});
