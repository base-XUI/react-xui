import { mount } from "cypress/react";
import { Tooltip } from ".";
import { TooltipColor, TooltipPlacement } from "./variants";

const tooltipSelector = '[role="tooltip"]';
const hover = () => cy.get("button").trigger("mouseover");
const unhover = () => cy.get("button").trigger("mouseout");
const focus = () => cy.get("button").focus();
const blur = () => cy.get("button").blur();
const touch = () => cy.get("button").trigger("touchstart");
const getTooltip = () => cy.get(tooltipSelector, { timeout: 1000 });

const mountTooltip = (
  props: React.ComponentProps<typeof Tooltip>,
  label = "Hover me"
) => {
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

    hover();
    getTooltip().should("be.visible");
    unhover();
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should show tooltip on focus unless `disableFocusListener` is true", () => {
    mountTooltip({ title: "Focus tooltip" });
    focus();
    getTooltip().should("be.visible").and("contain", "Focus tooltip");
    blur();
    cy.get(tooltipSelector).should("not.exist");

    mountTooltip({ title: "Focus disabled", disableFocusListener: true });
    focus();
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should not show tooltip on hover if `disableHoverListener` is true", () => {
    mountTooltip({ title: "Hover disabled", disableHoverListener: true });

    hover();
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should not show tooltip on touch if `disableTouchListener` is true", () => {
    mountTooltip({ title: "Touch disabled", disableTouchListener: true });

    touch();
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should apply delays correctly", () => {
    mountTooltip({
      title: "Delayed Tooltip",
      enterDelay: 500,
      leaveDelay: 300,
    });

    hover();
    cy.wait(100);
    cy.get(tooltipSelector).should("not.exist");
    cy.wait(500);
    getTooltip().should("be.visible");

    unhover();
    cy.wait(100);
    cy.get(tooltipSelector).should("be.visible");
    cy.wait(300);
    cy.get(tooltipSelector).should("not.exist");
  });

  it("should display the tooltip with an arrow if `arrow` is true", () => {
    mountTooltip({ title: "Tooltip text", arrow: true });

    hover();
    getTooltip().should("be.visible").and("contain", "Tooltip text");
    getTooltip().should("have.attr", "data-arrow", "true");
  });

  const colors: TooltipColor[] = [
    "gray",
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

  it("should remain visible when hovered if `disableInteractive` is true", () => {
    mountTooltip({ title: "Interactive disabled", disableInteractive: true });

    hover();
    getTooltip().trigger("mouseover", { force: true });
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
