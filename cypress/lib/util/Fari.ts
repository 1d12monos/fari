export const Fari = {
  startLeaveCookie() {
    cy.visit("/");
  },
  start() {
    cy.visit("/");
    this.get("cookie-consent").click();
  },
  /**
   * Url needs to be in `../../../serve.json`
   * @param url
   */
  visit(url: string) {
    cy.visit(url);
  },
  get(tag: string) {
    return cy.get(`[data-cy='${tag}']`);
  },
  getByText(text: string) {
    return cy.contains(text);
  },
  find(element: Cypress.Chainable, tag: string) {
    return element.find(`[data-cy='${tag}']`);
  },
  getAttribute(element: Cypress.Chainable, attr: string) {
    return element.invoke("attr", attr);
  },
  waitContentEditable() {
    const contentEditableDelay = 300;

    cy.wait(contentEditableDelay + 100);
  },
  closeBackdrop() {
    cy.get(".MuiPopover-root").eq(0).click();
  },
  closeDrawer() {
    cy.get(".MuiBackdrop-root").eq(0).click();
  },
  toggleDarkMode() {
    Fari.get("page.toggle-dark-mode").click();
  },
  changeLanguage(language: string) {
    Fari.get("page.languages").click();
    cy.get(`[data-value="${language}"]`).click();
  },
};
