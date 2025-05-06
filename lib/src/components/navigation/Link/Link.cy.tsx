import { Link } from "./Link";

describe("Link Component", () => {
  it("renders default Link correctly", () => {
    cy.mount(<Link>Link</Link>);
    cy.get("a").should("have.attr", "href", "#").and("contain.text", "Link");
  });

  it("renders as a custom element type", () => {
    cy.mount(<Link component="button">Link Button</Link>);
    cy.get("button")
      .should("not.have.attr", "href")
      .and("contain.text", "Link Button")
      .and("have.attr", "onClick", "undefined");
  });
});
