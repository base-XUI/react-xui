import { Tooltip } from ".";
import { mount } from "cypress/react";

describe("Tooltip Component", () => {
    it("should display the tooltip on hover", () => {
        mount(
            <Tooltip title="Tooltip text">
                <button>Hover me</button>
            </Tooltip>
        );

        // Ensure the tooltip is not visible initially
        cy.get('[role="tooltip"]').should("not.exist");

        // Hover over the button
        cy.get("button").trigger("mouseenter");

        // Ensure the tooltip becomes visible
        cy.get('[role="tooltip"]').should("be.visible").and("contain", "Tooltip text");
    });

    it("should hide the tooltip when the mouse leaves", () => {
        mount(
            <Tooltip title="Tooltip text">
                <button>Hover me</button>
            </Tooltip>
        );

        // Hover over the button
        cy.get("button").trigger("mouseenter");

        // Ensure the tooltip becomes visible
        cy.get('[role="tooltip"]').should("be.visible");

        // Move the mouse away
        cy.get("button").trigger("mouseleave");

        // Ensure the tooltip is hidden
        cy.get('[role="tooltip"]').should("not.exist");
    });

    it("should not display the tooltip when `disableHoverListener` is true", () => {
        mount(
            <Tooltip title="Tooltip text" disableHoverListener>
                <button>Hover me</button>
            </Tooltip>
        );

        // Hover over the button
        cy.get("button").trigger("mouseenter");

        // Ensure the tooltip is not visible
        cy.get('[role="tooltip"]').should("not.exist");
    });

    it("should display the tooltip with an arrow if `arrow` is true", () => {
        mount(
            <Tooltip title="Tooltip text" arrow>
                <button>Hover me</button>
            </Tooltip>
        );

        // Hover over the button
        cy.get("button").trigger("mouseenter");

        // Ensure the tooltip is visible and contains the arrow
        cy.get('[role="tooltip"]').should("be.visible");
        cy.get('[role="tooltip"]').should("have.class", "arrow");
    });

    it("should render the tooltip with the correct color", () => {
        const colors = ["default"
            , "primary"
            , "secondary"
            , "success"
            , "error"
            , "warning"
            , "info"];
        colors.forEach((color) => {
            mount(
                <Tooltip title={`Tooltip with ${color} color`} color={color}>
                    <button>Hover me</button>
                </Tooltip>
            );

            cy.get("button").trigger("mouseenter");
            cy.get('[role="tooltip"]').should("be.visible").and("have.class", color);

            cy.get("button").trigger("mouseleave");
        });
    });

    it("should render the tooltip in the correct placement", () => {
        const placements = ["auto-end"
            , "auto-start"
            , "auto"
            , "bottom-end"
            , "bottom-start"
            , "bottom"
            , "left-end"
            , "left-start"
            , "left"
            , "right-end"
            , "right-start"
            , "right"
            , "top-end"
            , "top-start"
            , "top"];
        placements.forEach((placement) => {
            mount(
                <Tooltip title={`Tooltip on ${placement}`} placem--ent={placement}>
                    <button>Hover me</button>
                </Tooltip>
            );

            cy.get("button").trigger("mouseenter");
            cy.get('[role="tooltip"]').should("be.visible").and("contain", `Tooltip on ${placement}`);
            cy.get('[role="tooltip"]').should("have.class", placement);

            cy.get("button").trigger("mouseleave");
        });
    });

    it("should remain open when `interactive` is true", () => {
        mount(
            <Tooltip title="Interactive Tooltip" interactive>
                <button>Hover me</button>
            </Tooltip>
        );

        cy.get("button").trigger("mouseenter");
        cy.get('[role="tooltip"]').should("be.visible");

        // Simulate interaction with the tooltip
        cy.get('[role="tooltip"]').trigger("mouseenter");
        cy.get('[role="tooltip"]').should("be.visible");

        // Move the mouse away from the button and tooltip
        cy.get("button").trigger("mouseleave");
        cy.get('[role="tooltip"]').should("be.visible"); // Tooltip should remain visible
    });

    it("should render with default props", () => {
        mount(
            <Tooltip title="Default Tooltip">
                <button>Hover me</button>
            </Tooltip>
        );

        cy.get("button").trigger("mouseenter");
        cy.get('[role="tooltip"]').should("be.visible").and("contain", "Default Tooltip");
    });
});
