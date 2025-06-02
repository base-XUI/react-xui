import { mount } from "cypress/react";

import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { CardTitle } from "./CardTitle";
import { CardAction } from "./CardAction";
import { CardFooter } from "./CardFooter";

const mountCard = (component: React.ReactElement) => {
  mount(component);
};

describe("Card Component", () => {
  describe("Basic Rendering", () => {
    it("should render a basic card", () => {
      mountCard(<Card data-testid="basic-card">Basic Card</Card>);

      cy.get('[data-testid="basic-card"]')
        .should("exist")
        .should("have.attr", "data-slot", "card")
        .should("have.class", "bg-card")
        .should("have.class", "rounded-xl")
        .should("have.class", "border")
        .should("have.class", "shadow-sm");
    });

    it("should render as div by default", () => {
      mountCard(<Card data-testid="default-element">Content</Card>);

      cy.get('[data-testid="default-element"]')
        .should("be.visible")
        .should("have.prop", "tagName", "DIV");
    });

    it("should apply custom className", () => {
      mountCard(
        <Card data-testid="custom-class" className="custom-test-class">
          Content
        </Card>,
      );

      cy.get('[data-testid="custom-class"]')
        .should("have.class", "custom-test-class")
        .should("have.class", "bg-card"); // Should still have default classes
    });
  });

  describe("Polymorphic Behavior", () => {
    it("should render as article when component prop is article", () => {
      mountCard(
        <Card component="article" data-testid="article-card">
          Article Content
        </Card>,
      );

      cy.get('[data-testid="article-card"]').should(
        "have.prop",
        "tagName",
        "ARTICLE",
      );
    });

    it("should render as section when component prop is section", () => {
      mountCard(
        <Card component="section" data-testid="section-card">
          Section Content
        </Card>,
      );

      cy.get('[data-testid="section-card"]').should(
        "have.prop",
        "tagName",
        "SECTION",
      );
    });

    it("should pass through additional props", () => {
      mountCard(
        <Card
          component="article"
          data-testid="props-card"
          id="test-id"
          role="banner"
          aria-label="Test card"
        >
          Content
        </Card>,
      );

      cy.get('[data-testid="props-card"]')
        .should("have.id", "test-id")
        .should("have.attr", "role", "banner")
        .should("have.attr", "aria-label", "Test card");
    });
  });

  describe("CardHeader Component", () => {
    it("should render card header with correct attributes", () => {
      mountCard(
        <Card>
          <CardHeader data-testid="card-header">Header Content</CardHeader>
        </Card>,
      );

      cy.get('[data-testid="card-header"]')
        .should("exist")
        .should("have.attr", "data-slot", "card-header")
        .should("have.class", "grid")
        .should("have.class", "px-6");
    });

    it("should apply grid layout for action buttons", () => {
      mountCard(
        <Card>
          <CardHeader data-testid="header-with-action">
            <CardTitle>Title</CardTitle>
            <CardAction data-testid="action">Action</CardAction>
          </CardHeader>
        </Card>,
      );

      cy.get('[data-testid="header-with-action"]').should(
        "have.class",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
      );

      cy.get('[data-testid="action"]').should(
        "have.attr",
        "data-slot",
        "card-action",
      );
    });
  });

  describe("CardTitle Component", () => {
    it("should render card title with correct styling", () => {
      mountCard(
        <Card>
          <CardHeader>
            <CardTitle data-testid="card-title">Test Title</CardTitle>
          </CardHeader>
        </Card>,
      );

      cy.get('[data-testid="card-title"]')
        .should("contain.text", "Test Title")
        .should("have.attr", "data-slot", "card-title")
        .should("have.class", "font-semibold")
        .should("have.class", "leading-none");
    });

    it("should accept custom className", () => {
      mountCard(
        <Card>
          <CardHeader>
            <CardTitle
              data-testid="custom-title"
              className="text-2xl text-blue-600"
            >
              Custom Title
            </CardTitle>
          </CardHeader>
        </Card>,
      );

      cy.get('[data-testid="custom-title"]')
        .should("have.class", "text-2xl")
        .should("have.class", "text-blue-600")
        .should("have.class", "font-semibold"); // Should keep default classes
    });
  });

  describe("CardAction Component", () => {
    it("should render card action with correct positioning", () => {
      mountCard(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardAction data-testid="card-action">
              <button>Action Button</button>
            </CardAction>
          </CardHeader>
        </Card>,
      );

      cy.get('[data-testid="card-action"]')
        .should("exist")
        .should("have.attr", "data-slot", "card-action")
        .should("have.class", "col-start-2")
        .should("have.class", "justify-self-end");
    });

    it("should handle multiple action buttons", () => {
      mountCard(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardAction data-testid="multiple-actions">
              <button data-testid="edit-btn">Edit</button>
              <button data-testid="delete-btn">Delete</button>
            </CardAction>
          </CardHeader>
        </Card>,
      );

      cy.get('[data-testid="multiple-actions"]')
        .should("exist")
        .within(() => {
          cy.get('[data-testid="edit-btn"]').should("contain.text", "Edit");
          cy.get('[data-testid="delete-btn"]').should("contain.text", "Delete");
        });
    });
  });

  describe("CardContent Component", () => {
    it("should render card content with correct padding", () => {
      mountCard(
        <Card>
          <CardContent data-testid="card-content">
            <p>Content text</p>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="card-content"]')
        .should("exist")
        .should("have.attr", "data-slot", "card-content")
        .should("have.class", "px-6")
        .should("contain.text", "Content text");
    });

    it("should handle rich content", () => {
      mountCard(
        <Card>
          <CardContent data-testid="rich-content">
            <h3 data-testid="content-heading">Heading</h3>
            <p data-testid="content-paragraph">Paragraph</p>
            <ul data-testid="content-list">
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="rich-content"]').within(() => {
        cy.get('[data-testid="content-heading"]').should(
          "contain.text",
          "Heading",
        );
        cy.get('[data-testid="content-paragraph"]').should(
          "contain.text",
          "Paragraph",
        );
        cy.get('[data-testid="content-list"] li').should("have.length", 2);
      });
    });
  });

  describe("CardFooter Component", () => {
    it("should render card footer with correct styling", () => {
      mountCard(
        <Card>
          <CardFooter data-testid="card-footer">
            <button>Footer Button</button>
          </CardFooter>
        </Card>,
      );

      cy.get('[data-testid="card-footer"]')
        .should("exist")
        .should("have.attr", "data-slot", "card-footer")
        .should("have.class", "flex")
        .should("have.class", "items-center")
        .should("have.class", "px-6");
    });

    it("should handle multiple footer elements", () => {
      mountCard(
        <Card>
          <CardFooter data-testid="footer-multiple">
            <button data-testid="save-btn">Save</button>
            <button data-testid="cancel-btn">Cancel</button>
            <span data-testid="status">Status</span>
          </CardFooter>
        </Card>,
      );

      cy.get('[data-testid="footer-multiple"]').within(() => {
        cy.get('[data-testid="save-btn"]').should("exist");
        cy.get('[data-testid="cancel-btn"]').should("exist");
        cy.get('[data-testid="status"]').should("contain.text", "Status");
      });
    });
  });

  describe("Complete Card Compositions", () => {
    it("should render complete card with all sections", () => {
      mountCard(
        <Card data-testid="complete-card">
          <CardHeader data-testid="complete-header">
            <CardTitle data-testid="complete-title">Complete Card</CardTitle>
            <CardAction data-testid="complete-action">
              <button>Edit</button>
            </CardAction>
          </CardHeader>
          <CardContent data-testid="complete-content">
            <p>This is the content section.</p>
          </CardContent>
          <CardFooter data-testid="complete-footer">
            <button>Save</button>
            <button>Cancel</button>
          </CardFooter>
        </Card>,
      );

      // Check all sections exist
      cy.get('[data-testid="complete-card"]').should("exist");
      cy.get('[data-testid="complete-header"]').should("exist");
      cy.get('[data-testid="complete-title"]').should(
        "contain.text",
        "Complete Card",
      );
      cy.get('[data-testid="complete-action"]').should("exist");
      cy.get('[data-testid="complete-content"]').should(
        "contain.text",
        "content section",
      );
      cy.get('[data-testid="complete-footer"]').should("exist");
    });

    it("should handle partial card compositions gracefully", () => {
      // Card with only header and content
      mountCard(
        <Card data-testid="partial-card">
          <CardHeader>
            <CardTitle>Partial Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Only header and content</p>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="partial-card"]').should("exist");
      cy.get('[data-slot="card-header"]').should("exist");
      cy.get('[data-slot="card-content"]').should("exist");
      cy.get('[data-slot="card-footer"]').should("not.exist");
    });
  });

  describe("Interactive Behavior", () => {
    it("should handle click events on action buttons", () => {
      const onEditClick = cy.stub().as("onEditClick");
      const onDeleteClick = cy.stub().as("onDeleteClick");

      mountCard(
        <Card>
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
            <CardAction>
              <button data-testid="edit-btn" onClick={onEditClick}>
                Edit
              </button>
              <button data-testid="delete-btn" onClick={onDeleteClick}>
                Delete
              </button>
            </CardAction>
          </CardHeader>
        </Card>,
      );

      cy.get('[data-testid="edit-btn"]').click();
      cy.get("@onEditClick").should("have.been.called");

      cy.get('[data-testid="delete-btn"]').click();
      cy.get("@onDeleteClick").should("have.been.called");
    });

    it("should handle form interactions in card content", () => {
      mountCard(
        <Card>
          <CardContent>
            <form data-testid="card-form">
              <input
                data-testid="name-input"
                type="text"
                placeholder="Enter name"
              />
              <button data-testid="submit-btn" type="submit">
                Submit
              </button>
            </form>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="name-input"]')
        .type("Test User")
        .should("have.value", "Test User");

      cy.get('[data-testid="submit-btn"]').should("be.visible");
    });
  });

  describe("Accessibility", () => {
    it("should support ARIA attributes", () => {
      mountCard(
        <Card
          component="article"
          data-testid="accessible-card"
          role="article"
          aria-labelledby="card-title"
        >
          <CardHeader>
            <CardTitle id="card-title">Accessible Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This card follows accessibility best practices.</p>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="accessible-card"]')
        .should("have.attr", "role", "article")
        .should("have.attr", "aria-labelledby", "card-title");

      cy.get("#card-title").should("contain.text", "Accessible Card");
    });

    it("should be keyboard navigable", () => {
      mountCard(
        <Card>
          <CardHeader>
            <CardTitle>Keyboard Navigation</CardTitle>
            <CardAction>
              <button data-testid="first-btn">First</button>
              <button data-testid="second-btn">Second</button>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <button data-testid="footer-btn">Footer Button</button>
          </CardFooter>
        </Card>,
      );

      // Tab through focusable elements
      cy.get('[data-testid="first-btn"]').focus().should("be.focused");
      cy.get('[data-testid="second-btn"]').focus().should("be.focused");
      cy.get('[data-testid="footer-btn"]').focus().should("be.focused");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty card", () => {
      mountCard(<Card data-testid="empty-card" />);

      cy.get('[data-testid="empty-card"]').should("exist").should("be.empty");
    });

    it("should handle very long content", () => {
      const longContent = "Lorem ipsum ".repeat(100);

      mountCard(
        <Card data-testid="long-content-card" className="w-64">
          <CardContent>
            <p data-testid="long-text">{longContent}</p>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="long-content-card"]').should("exist");
      cy.get('[data-testid="long-text"]')
        .should("contain.text", "Lorem ipsum")
        .should("be.visible");
    });

    it("should handle special characters in content", () => {
      const specialContent = "Special chars: !@#$%^&*()_+{}|:<>?[]\\;',./";

      mountCard(
        <Card>
          <CardContent>
            <p data-testid="special-chars">{specialContent}</p>
          </CardContent>
        </Card>,
      );

      cy.get('[data-testid="special-chars"]').should(
        "contain.text",
        specialContent,
      );
    });
  });
});
