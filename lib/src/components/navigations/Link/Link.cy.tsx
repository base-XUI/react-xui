import { Link } from "./Link";

describe("Link Component", () => {
  it("renders default Link correctly", () => {
    cy.mount(<Link href="#">Link</Link>);
    cy.get("a")
      .should("exist")
      .and("have.attr", "href", "#")
      .and("contain.text", "Link");
  });
  // Test with text decoration class
  it("renders with different text decorations", () => {
    // Test always underline
    cy.mount(<Link underline="always">Link underline</Link>);
    cy.get("a").should("have.class", "underline");

    // Test hover underline
    cy.mount(<Link underline="hover">hover underline</Link>);
    cy.get("a").should("have.class", "hover:underline");
    // Test no underline
    cy.mount(<Link underline="none">none underline</Link>);
    cy.get("a").should("have.class", "no-underline");
  });
  // Test with different colors
  it("renders with different colors", () => {
    cy.mount(<Link color="primary">Primary</Link>);
    cy.get("a").should("exist");

    cy.mount(<Link color="secondary">Secondary</Link>);
    cy.get("a").should("exist");

    cy.mount(<Link color="success">Success</Link>);
    cy.get("a").should("exist");

    cy.mount(<Link color="warning">Warning</Link>);
    cy.get("a").should("exist");

    cy.mount(<Link color="error">Error</Link>);
    cy.get("a").should("exist");
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
