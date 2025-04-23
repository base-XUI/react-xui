import { Typography } from "./Typography";

describe("Typography Component", () => {
  it("renders default typography correctly", () => {
    cy.mount(<Typography>Sample Text</Typography>);
    cy.get("p").should("exist").and("contain.text", "Sample Text");
  });

  it("renders with different variants", () => {
    cy.mount(<Typography variant="h1">Heading 1</Typography>);
    cy.get("h1").should("exist").and("contain.text", "Heading 1");

    cy.mount(<Typography variant="h2">Heading 2</Typography>);
    cy.get("h2").should("exist").and("contain.text", "Heading 2");

    cy.mount(<Typography variant="h3">Heading 3</Typography>);
    cy.get("h3").should("exist").and("contain.text", "Heading 3");

    cy.mount(<Typography variant="body1">Body Text</Typography>);
    cy.get("p").should("exist").and("contain.text", "Body Text");

    // Fix: caption variant renders as p element not span based on HTML_MAPPINGS
    cy.mount(<Typography variant="caption">Caption Text</Typography>);
    cy.get("p").should("exist").and("contain.text", "Caption Text");
  });

  it("renders with different text alignments", () => {
    cy.mount(<Typography align="start">Start Aligned</Typography>);
    cy.get("p").should("have.class", "text-start");

    cy.mount(<Typography align="center">Center Aligned</Typography>);
    cy.get("p").should("have.class", "text-center");

    cy.mount(<Typography align="end">End Aligned</Typography>);
    cy.get("p").should("have.class", "text-end");
  });

  it("renders with different colors", () => {
    cy.mount(<Typography color="primary">Primary Color</Typography>);
    cy.get("p").should("have.class", "text-primary");

    cy.mount(<Typography color="secondary">Secondary Color</Typography>);
    cy.get("p").should("have.class", "text-secondary");

    cy.mount(<Typography color="destructive">Destructive Color</Typography>);
    cy.get("p").should("have.class", "text-destructive");
  });

  it("applies noWrap styling correctly", () => {
    cy.mount(<Typography noWrap>Text that should not wrap</Typography>);
    cy.get("p").should("have.class", "whitespace-nowrap");
  });

  it("applies gutterBottom styling correctly", () => {
    cy.mount(<Typography gutterBottom>Text with bottom margin</Typography>);
    cy.get("p").should("have.class", "mb-2");
  });

  it("applies paragraph styling correctly", () => {
    cy.mount(<Typography paragraph>Paragraph text</Typography>);
    cy.get("p").should("have.class", "mb-4");
  });

  it("allows custom component", () => {
    cy.mount(
      <Typography component="label" htmlFor="test-input">
        Label Text
      </Typography>,
    );
    cy.get("label")
      .should("exist")
      .and("contain.text", "Label Text")
      .and("have.attr", "for", "test-input");
  });

  it("applies custom font family", () => {
    cy.mount(
      <Typography fontFamily="secondary">Custom Font Family</Typography>,
    );
    cy.get("p").should("have.class", "font-secondary");
  });

  it("respects inherit property", () => {
    cy.mount(<Typography inherit>Inherited Text</Typography>);
    // When inherit is true, the typography variant classes should not be applied
    cy.get("p").should("not.have.class", /text-/);
  });
});
