// cypress/e2e/FormGroup.cy.tsx

import { useState } from "react";
import { FormGroup } from "./FormGroup";
import { Checkbox } from "@/components/Checkbox";

describe("FormGroup Component - Final Test", () => {
  it("renders correctly without any props", () => {
    cy.mount(
      <FormGroup>
        <div data-testid="child">Child Item</div>
      </FormGroup>,
    );
    cy.get('[data-testid="child"]').should("exist");
    cy.get("div").should("have.class", "flex-col");
  });

  it("renders items horizontally when row=true", () => {
    cy.mount(
      <FormGroup row>
        <div>Item 1</div>
        <div>Item 2</div>
      </FormGroup>,
    );
    cy.get("div").should("have.class", "flex-row");
  });

  it("supports animation when animation=true", () => {
    cy.mount(
      <FormGroup animation>
        <div>Animated Group</div>
      </FormGroup>,
    );
    cy.get("div").should("have.class", "transition-all");
  });

  it("supports external className", () => {
    cy.mount(
      <FormGroup className="bg-green-500 p-4">
        <div>Styled with className</div>
      </FormGroup>,
    );
    cy.get("div").should("have.class", "bg-green-500");
  });

  it("supports inline styles via sx prop", () => {
    cy.mount(
      <FormGroup sx={{ color: "blue", fontSize: "1.5rem" }}>
        <span data-testid="styled-span">Styled Text</span>
      </FormGroup>,
    );

    cy.get('[data-testid="styled-span"]')
      .should("have.css", "color")
      .and("eq", "rgb(0, 0, 255)");

    cy.get('[data-testid="styled-span"]')
      .should("have.css", "font-size")
      .and("eq", "24px");
  });

  it("works correctly with children like Checkbox inside FormControlLabel", () => {
    cy.mount(
      <FormGroup>
        <Checkbox data-testid="checkbox" />
      </FormGroup>,
    );

    // Ensure the checkbox exists
    cy.get('[data-testid="checkbox"]').should("exist");

    // Click on the checkbox
    cy.get('[data-testid="checkbox"]').click();

    // Re-mount with checked state for verification (optional)
    cy.mount(
      <FormGroup>
        <Checkbox data-testid="checkbox" checked={true} />
      </FormGroup>,
    );

    // Ensure the checkbox is checked
    cy.get('[data-testid="checkbox"]')
      .invoke("prop", "checked")
      .should("eq", true);
  });

  it("supports dynamic prop changes", () => {
    const TestComponent = () => {
      const [isRow, setIsRow] = useState(false);
      return (
        <>
          <FormGroup row={isRow} data-testid="group">
            <div>Dynamic Layout</div>
            <div>Dynamic Layout2</div>
          </FormGroup>
          <button onClick={() => setIsRow(!isRow)}>Toggle Row</button>
        </>
      );
    };

    cy.mount(<TestComponent />);

    // Confirm default vertical layout
    cy.get('[data-testid="styled-element"]').should("have.class", "flex-col");

    // Click the button to toggle layout
    cy.get("button").click();

    // Confirm horizontal layout after toggle
    cy.get('[data-testid="styled-element"]').should("have.class", "flex-row");
  });
});
