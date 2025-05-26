import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./Card";
import { Button } from "../../inputs/Button"; // Update import path as needed

describe("Card Component", () => {
  it("renders basic card with content", () => {
    cy.mount(
      <Card>
        <CardContent>Simple Card Content</CardContent>
      </Card>,
    );

    cy.get('[data-slot="card"]').should("exist");
    cy.get('[data-slot="card-content"]').contains("Simple Card Content");
  });

  it("renders all subcomponents correctly", () => {
    cy.mount(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
          <CardAction>
            <Button>Test Action</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Test Content</p>
        </CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>,
    );

    cy.get('[data-slot="card-header"]').should("exist");
    cy.get('[data-slot="card-title"]').contains("Test Title");
    cy.get('[data-slot="card-description"]').contains("Test Description");
    cy.get('[data-slot="card-action"]').find("button").contains("Test Action");
    cy.get('[data-slot="card-content"]').contains("Test Content");
    cy.get('[data-slot="card-footer"]').contains("Test Footer");
  });

  it("applies custom class names correctly", () => {
    cy.mount(
      <Card className="custom-card-class">
        <CardHeader className="custom-header-class">
          <CardTitle className="custom-title-class">Title</CardTitle>
        </CardHeader>
      </Card>,
    );

    cy.get('[data-slot="card"]').should("have.class", "custom-card-class");
    cy.get('[data-slot="card-header"]').should(
      "have.class",
      "custom-header-class",
    );
    cy.get('[data-slot="card-title"]').should(
      "have.class",
      "custom-title-class",
    );
  });

  it("handles card interactions", () => {
    const clickSpy = cy.spy().as("clickSpy");

    cy.mount(
      <Card>
        <CardHeader>
          <CardAction>
            <Button onClick={clickSpy}>Click Me</Button>
          </CardAction>
        </CardHeader>
      </Card>,
    );

    cy.get('[data-slot="card-action"] button').click();
    cy.get("@clickSpy").should("have.been.calledOnce");
  });

  it("renders border variations correctly", () => {
    cy.mount(
      <Card className="border-primary border-t-4">
        <CardContent>Accent Border Card</CardContent>
      </Card>,
    );

    cy.get('[data-slot="card"]')
      .should("have.class", "border-t-4")
      .and("have.class", "border-primary");
  });

  it("renders responsive layouts", () => {
    cy.mount(
      <Card>
        <CardHeader>
          <CardTitle>Responsive Test</CardTitle>
          <CardAction>
            <Button>Action</Button>
          </CardAction>
        </CardHeader>
      </Card>,
    );

    // Test responsive behavior at different viewports
    cy.viewport(768, 800);
    cy.get('[data-slot="card-header"]').should(
      "have.css",
      "grid-template-columns",
    );

    cy.viewport(320, 600);
    cy.get('[data-slot="card-header"]').should(
      "have.css",
      "grid-template-columns",
    );
  });
});
