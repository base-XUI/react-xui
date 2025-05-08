import { Link } from "./Link";

describe("Link Component", () => {
  it("renders default Link correctly", () => {
    cy.mount(<Link href="#">Link</Link>);
    cy.get("a")
      .should("exist")
      .and("have.attr", "href", "#")
      .and("contain.text", "Link");
  });

  it("renders as a Button", () => {
    cy.mount(
      <Link component="button" role="button" onClick={() => {}}>
        Link Button
      </Link>,
    );
    cy.get("button")
      .should("not.have.attr", "href", "#")
      .and("have.attr", "role", "button")
      .and("contain.text", "Link Button")
      .click();
  });
});
