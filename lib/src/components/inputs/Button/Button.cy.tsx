import { Button } from "./Button";

describe("Button Component", () => {
  it("renders default button correctly", () => {
    cy.mount(<Button>Click me</Button>);
    cy.get("button").should("exist").and("contain.text", "Click me");
  });

  it("renders with different variants", () => {
    // Test outlined variant
    cy.mount(<Button variant="outlined">Outlined</Button>);
    cy.get("button").should("have.class", "border");

    // Test text variant with explicitly setting color to inherit
    // to avoid color settings overriding variant styling
    cy.mount(
      <Button variant="text" color="inherit">
        Text Button
      </Button>,
    );
    cy.get("button")
      .should("not.have.class", "bg-primary")
      .and("have.class", "bg-transparent");
  });

  it("renders with different colors", () => {
    cy.mount(<Button color="primary">Primary</Button>);
    cy.get("button").should("exist");

    cy.mount(<Button color="secondary">Secondary</Button>);
    cy.get("button").should("exist");

    cy.mount(<Button color="error">Error</Button>);
    cy.get("button").should("exist");
  });

  it("renders with different sizes", () => {
    cy.mount(<Button size="small">Small</Button>);
    cy.get("button").should("have.class", "h-8").and("have.class", "px-3");

    cy.mount(<Button size="large">Large</Button>);
    cy.get("button").should("have.class", "h-12").and("have.class", "px-6");
  });

  it("renders as a full width button", () => {
    cy.mount(<Button fullWidth>Full Width</Button>);
    cy.get("button").should("have.class", "w-full");
  });

  it("disables the button when disabled prop is true", () => {
    cy.mount(<Button disabled>Disabled</Button>);
    cy.get("button").should("be.disabled");
  });

  it("shows loading state", () => {
    cy.mount(<Button loading>Loading</Button>);
    cy.get("button").should("contain", "⌛");
    cy.get("button").should("contain", "Loading");
  });

  it("renders with loading at different positions", () => {
    cy.mount(
      <Button loading loadingPosition="start">
        Start
      </Button>,
    );
    cy.get("button .mr-2").should("exist");

    cy.mount(
      <Button loading loadingPosition="end">
        End
      </Button>,
    );
    cy.get("button .ml-2").should("exist");
  });

  it("renders with custom loading indicator", () => {
    const customIndicator = <span data-testid="custom-loader">Loading...</span>;
    cy.mount(
      <Button loading loadingIndicator={customIndicator}>
        Custom Loader
      </Button>,
    );
    cy.get('[data-testid="custom-loader"]').should("exist");
  });

  it("renders with start icon", () => {
    const startIcon = <span data-testid="start-icon">→</span>;
    cy.mount(<Button startIcon={startIcon}>With Start Icon</Button>);
    cy.get('[data-testid="start-icon"]').should("exist");
    cy.get("button").contains("With Start Icon");
  });

  it("renders with end icon", () => {
    const endIcon = <span data-testid="end-icon">←</span>;
    cy.mount(<Button endIcon={endIcon}>With End Icon</Button>);
    cy.get('[data-testid="end-icon"]').should("exist");
    cy.get("button").contains("With End Icon");
  });

  it("renders as a custom element type", () => {
    cy.mount(
      <Button component="a" href="#test">
        Link Button
      </Button>,
    );
    cy.get("a")
      .should("have.attr", "href", "#test")
      .and("contain.text", "Link Button");
  });
});
