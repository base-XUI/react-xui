import { mount } from "cypress/react";
import { Tooltip } from ".";
import { TooltipColor, TooltipPlacement } from "./variants";

const tooltipSelector = '[role="tooltip"]';
const hover = () => cy.get("button").trigger("mouseover");
const unhover = () => cy.get("button").trigger("mouseout");
const getTooltip = () => cy.get(tooltipSelector, { timeout: 500 });

const mountTooltip = (props: React.ComponentProps<typeof Tooltip>, label = "Hover me") => {
  mount(
    <Tooltip {...props}>
      <button>{label}</button>
    </Tooltip>
  );
};

describe("Tooltip Component", () => {
  it("should display the tooltip on hover", () => {
    mountTooltip({ title: "Tooltip text" });

    cy.get(tooltipSelector).should("not.exist");
    hover();
    getTooltip().should("be.visible").and("contain", "Tooltip text");
  });

  it("should hide the tooltip when the mouse leaves", () => {
    mountTooltip({ title: "Tooltip text" });

    cy.get("button").click({ force: true });
    hover();
    getTooltip().should("be.visible").and("contain", "Tooltip text");
    unhover();
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should not display the tooltip when `disableHoverListener` is true", () => {
    mountTooltip({ title: "Tooltip text", disableHoverListener: true });

    hover();
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should display the tooltip with an arrow if `arrow` is true", () => {
    mountTooltip({ title: "Tooltip text", arrow: true });

    hover();
    getTooltip().should("be.visible").and("contain", "Tooltip text");
    getTooltip().should("have.attr", "data-arrow", "true");
  });

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
    it(`should render tooltip with color: ${color}`, () => {
      mountTooltip({ title: `Tooltip with ${color} color`, color });

      hover();
      getTooltip()
        .should("be.visible")
        .and("contain", `Tooltip with ${color} color`)
        .and("have.attr", "data-color", color);

      unhover();
    });
  });

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
    it(`should render tooltip with placement: ${placement}`, () => {
      mountTooltip({ title: `Tooltip on ${placement}`, placement });

      hover();
      getTooltip()
        .should("be.visible")
        .and("contain", `Tooltip on ${placement}`)
        .and("have.attr", "data-placement", placement);

      unhover();
    });
  });

  it("should remain open when `interactive` is true", () => {
    mountTooltip({ title: "Interactive Tooltip", interactive: true });

    hover();
    getTooltip().trigger("mouseover");
    getTooltip().should("be.visible");

    unhover();
    getTooltip().should("be.visible");
  });

  it("should render with default props", () => {
    mountTooltip({ title: "Default Tooltip" });

    hover();
    getTooltip().should("be.visible").and("contain", "Default Tooltip");
  });
});
