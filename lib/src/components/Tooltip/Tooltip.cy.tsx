import { mount } from "cypress/react";
import { Tooltip } from ".";
import { TooltipColor, TooltipPlacement } from "./variants";

describe("Tooltip Component", () => {
  it("should display the tooltip on hover", () => {
    mount(
      <Tooltip title="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );

    // Ensure the tooltip is not visible initially
    cy.get('[role="tooltip"]').should("not.exist");

    // Hover over the button
    cy.get("button").trigger("mouseover");

    // Ensure the tooltip becomes visible
    cy.get('[role="tooltip"]', { timeout: 500 })
      .should("be.visible")
      .and("contain", "Tooltip text");
  });

  it("should hide the tooltip when the mouse leaves", () => {
    mount(
      <Tooltip title="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );

    cy.get("button").click({ force: true }).trigger("mouseover");
    cy.get('[role="tooltip"]').should("be.visible").and("contain", "Tooltip text");
    cy.get("button").trigger("mouseout");
    cy.get('[role="tooltip"]').should("not.exist");
  });

  it("should not display the tooltip when `disableHoverListener` is true", () => {
    mount(
      <Tooltip title="Tooltip text" disableHoverListener>
        <button>Hover me</button>
      </Tooltip>,
    );

    cy.get("button").trigger("mouseover");
    cy.get('[role="tooltip"]').should("not.exist");
  });

  it("should display the tooltip with an arrow if `arrow` is true", () => {
    mount(
      <Tooltip title="Tooltip text" arrow >
        <button>Hover me</button>
      </Tooltip>,
    );

    cy.get("button").trigger("mouseover");
    cy.get('[role="tooltip"]', { timeout: 500 }).should("be.visible");
    cy.get('[role="tooltip"]').and("contain", "Tooltip text");
    cy.get('[role="tooltip"]').should("have.attr", "data-arrow", "true");
  });

  it("should render the tooltip with the correct color", () => {
    const colors: TooltipColor[] = [
      "default",
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
    ];

    colors.forEach((color) => {
      mount(
        <Tooltip title={`Tooltip with ${color} color`} color={color}>
          <button>Hover me</button>
        </Tooltip>,
      );

      cy.get("button").trigger("mouseover");
      cy.get('[role="tooltip"]')
        .should("be.visible")
        .and("contain", `Tooltip with ${color} color`)
        .and("have.attr", 'data-color', color);

      cy.get("button").trigger("mouseout");
    });
  });

  it("should render the tooltip in the correct placement", () => {
    const placements: TooltipPlacement[] = [
      "top",
      "bottom",
      "left",
      "right",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "left-start",
      "left-end",
      "right-start",
      "right-end",
      "auto",
      "auto-start",
      "auto-end",
    ];

    placements.forEach((placement) => {
      mount(
        <Tooltip title={`Tooltip on ${placement}`} placement={placement}>
          <button>Hover me</button>
        </Tooltip>,
      );

      cy.get("button").trigger("mouseover");
      cy.get('[role="tooltip"]')
        .should("be.visible")
        .and("contain", `Tooltip on ${placement}`)
        .and("have.attr", "data-placement", placement);

      cy.get("button").trigger("mouseout");
    });
  });

  it("should remain open when `interactive` is true", () => {
    mount(
      <Tooltip title="Interactive Tooltip" interactive>
        <button>Hover me</button>
      </Tooltip>,
    );

    cy.get("button").trigger("mouseover");
    cy.get('[role="tooltip"]').trigger("mouseover");
    cy.get('[role="tooltip"]').should("be.visible");

    // Simulate hovering tooltip (note: this assumes `pointer-events: auto` on tooltip)
    cy.get('[role="tooltip"]').trigger("mouseover");

    cy.get("button").trigger("mouseout");
    cy.get('[role="tooltip"]').should("be.visible");
  });

  it("should render with default props", () => {
    mount(
      <Tooltip title="Default Tooltip">
        <button>Hover me</button>
      </Tooltip>,
    );

    cy.get("button").trigger("mouseover");
    cy.get('[role="tooltip"]').should("be.visible").and("contain", "Default Tooltip");
  });
});
