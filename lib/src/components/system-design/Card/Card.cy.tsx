import { mount } from "cypress/react";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { CardTitle } from "./CardTitle";
import { CardAction } from "./CardAction";
import { CardFooter } from "./CardFooter";

describe("Card Component", () => {
  it("should render basic card with correct classes", () => {
    mount(<Card data-testid="basic-card">Basic Card</Card>);
    cy.get('[data-testid="basic-card"]')
      .should("exist")
      .should("have.attr", "data-slot", "card")
      .should("have.class", "bg-card")
      .should("have.class", "rounded-xl");
  });

  it("should support polymorphic rendering", () => {
    mount(
      <Card component="article" data-testid="article-card">
        Content
      </Card>,
    );
    cy.get('[data-testid="article-card"]').should(
      "have.prop",
      "tagName",
      "ARTICLE",
    );
  });

  it("should render complete card composition", () => {
    mount(
      <Card data-testid="complete-card">
        <CardHeader>
          <CardTitle data-testid="title">Test Title</CardTitle>
          <CardAction data-testid="action">
            <button>Edit</button>
          </CardAction>
        </CardHeader>
        <CardContent data-testid="content">
          <p>Content text</p>
        </CardContent>
        <CardFooter data-testid="footer">
          <button>Save</button>
        </CardFooter>
      </Card>,
    );

    cy.get('[data-testid="complete-card"]').should("exist");
    cy.get('[data-testid="title"]').should("contain.text", "Test Title");
    cy.get('[data-testid="action"]').should(
      "have.attr",
      "data-slot",
      "card-action",
    );
    cy.get('[data-testid="content"]').should("contain.text", "Content text");
    cy.get('[data-testid="footer"]').should("have.class", "flex");
  });

  it("should handle interactive behavior", () => {
    const onEditClick = cy.stub().as("onEditClick");
    mount(
      <Card>
        <CardHeader>
          <CardAction>
            <button data-testid="edit-btn" onClick={onEditClick}>
              Edit
            </button>
          </CardAction>
        </CardHeader>
      </Card>,
    );

    cy.get('[data-testid="edit-btn"]').click();
    cy.get("@onEditClick").should("have.been.called");
  });

  it("should support accessibility features", () => {
    mount(
      <Card
        component="article"
        data-testid="accessible-card"
        role="article"
        aria-labelledby="card-title"
      >
        <CardHeader>
          <CardTitle id="card-title">Accessible Card</CardTitle>
        </CardHeader>
      </Card>,
    );

    cy.get('[data-testid="accessible-card"]')
      .should("have.attr", "role", "article")
      .should("have.attr", "aria-labelledby", "card-title");
  });
});
