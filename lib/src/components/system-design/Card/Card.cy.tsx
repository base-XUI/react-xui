import { mount } from "cypress/react";
import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { CardActions } from "./CardActions";
import { CardMedia } from "./CardMedia";
import { CardActionArea } from "./CardActionArea";

describe("Card Component", () => {
  it("renders basic card with default props", () => {
    mount(
      <Card>
        <CardContent>Basic card content</CardContent>
      </Card>,
    );

    cy.get('[data-slot="card"]').should("exist");
    cy.get('[data-slot="card-content"]').should(
      "contain.text",
      "Basic card content",
    );
  });

  it("renders filled variant by default", () => {
    mount(<Card />);
    cy.get('[data-slot="card"]').should("have.class", "bg-card");
  });

  it("renders outlined variant", () => {
    mount(<Card variant="outlined" />);
    cy.get('[data-slot="card"]')
      .should("have.class", "bg-transparent")
      .should("have.class", "border");
  });

  it("renders square variant without rounded corners", () => {
    mount(<Card square />);
    cy.get('[data-slot="card"]').should("not.have.class", "rounded-xl");
  });

  it("renders with custom component", () => {
    mount(<Card component="article" />);
    cy.get('article[data-slot="card"]').should("exist");
  });

  it("applies custom className", () => {
    mount(<Card className="custom-class" />);
    cy.get('[data-slot="card"]').should("have.class", "custom-class");
  });
});

describe("CardHeader Component", () => {
  it("renders title and subheader", () => {
    mount(
      <Card>
        <CardHeader title="Test Title" subheader="Test Subheader" />
      </Card>,
    );

    cy.get('[data-slot="card-title"]').should("contain.text", "Test Title");
    cy.get('[data-slot="card-subheader"]').should(
      "contain.text",
      "Test Subheader",
    );
  });

  it("renders avatar and action", () => {
    mount(
      <Card>
        <CardHeader
          avatar={<div data-testid="avatar">A</div>}
          action={<button data-testid="action">Action</button>}
        />
      </Card>,
    );

    cy.get('[data-slot="card-avatar"]').should("exist");
    cy.get('[data-testid="avatar"]').should("contain.text", "A");
    cy.get('[data-slot="card-action"]').should("exist");
    cy.get('[data-testid="action"]').should("contain.text", "Action");
  });
});

describe("CardContent Component", () => {
  it("renders content with proper padding", () => {
    mount(
      <Card>
        <CardContent>Content text</CardContent>
      </Card>,
    );

    cy.get('[data-slot="card-content"]')
      .should("contain.text", "Content text")
      .should("have.class", "px-6");
  });
});

describe("CardActions Component", () => {
  it("renders actions with default alignment", () => {
    mount(
      <Card>
        <CardActions>
          <button>Save</button>
          <button>Cancel</button>
        </CardActions>
      </Card>,
    );

    cy.get('[data-slot="card-actions"]')
      .should("have.class", "justify-start")
      .should("contain.text", "Save")
      .should("contain.text", "Cancel");
  });

  it("renders with different alignments", () => {
    mount(
      <Card>
        <CardActions alignment="end">
          <button>Action</button>
        </CardActions>
      </Card>,
    );

    cy.get('[data-slot="card-actions"]').should("have.class", "justify-end");
  });

  it("renders with different spacing", () => {
    mount(
      <Card>
        <CardActions spacing="comfortable">
          <button>Action</button>
        </CardActions>
      </Card>,
    );

    cy.get('[data-slot="card-actions"]').should("have.class", "gap-4");
  });
});

describe("CardMedia Component", () => {
  it("renders image with src", () => {
    mount(
      <Card>
        <CardMedia src="test-image.jpg" alt="Test image" />
      </Card>,
    );

    cy.get('[data-slot="card-media"] img')
      .should("have.attr", "src", "test-image.jpg")
      .should("have.attr", "alt", "Test image");
  });

  it("renders placeholder when no src provided", () => {
    mount(
      <Card>
        <CardMedia />
      </Card>,
    );

    cy.get('[data-slot="card-media"] svg').should("exist");
  });

  it("applies aspect ratio classes", () => {
    mount(
      <Card>
        <CardMedia aspectRatio="1/1" />
      </Card>,
    );

    cy.get('[data-slot="card-media"]').should("have.class", "aspect-square");
  });
});

describe("CardActionArea Component", () => {
  it("handles click events", () => {
    const handleClick = cy.stub().as("handleClick");
    mount(
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardContent>Clickable content</CardContent>
        </CardActionArea>
      </Card>,
    );

    cy.get('[data-slot="card-action-area"]').click();
    cy.get("@handleClick").should("have.been.called");
  });

  it("renders as disabled", () => {
    mount(
      <Card>
        <CardActionArea disabled>
          <CardContent>Disabled content</CardContent>
        </CardActionArea>
      </Card>,
    );

    cy.get('[data-slot="card-action-area"]')
      .should("have.class", "opacity-50")
      .should("have.class", "pointer-events-none");
  });
});

describe("Card Integration", () => {
  it("renders complex card with all components", () => {
    mount(
      <Card className="w-96">
        <CardHeader
          title="Complex Card"
          subheader="With all components"
          avatar={<div>A</div>}
          action={<button>View</button>}
        />
        <CardMedia src="test-image.jpg" alt="Test" />
        <CardContent>
          <p>This is content</p>
        </CardContent>
        <CardActions>
          <button>Save</button>
          <button>Cancel</button>
        </CardActions>
      </Card>,
    );

    cy.get('[data-slot="card"]').should("exist");
    cy.get('[data-slot="card-header"]').should("exist");
    cy.get('[data-slot="card-media"]').should("exist");
    cy.get('[data-slot="card-content"]').should("exist");
    cy.get('[data-slot="card-actions"]').should("exist");
  });
});
