import { Accordion } from "./Accordion";
import { AccordionSummary } from "./AccordionSummary";
import { AccordionDetails } from "./AccordionDetails";
import React from "react";

describe("Accordion component", () => {
  it("renders children and toggles details (uncontrolled)", () => {
    cy.mount(
      <Accordion id="a1">
        <AccordionSummary id="a1">Summary</AccordionSummary>
        <AccordionDetails id="a1">Details</AccordionDetails>
      </Accordion>,
    );
    cy.get("button").contains("Summary").click();
    cy.contains("Details").should("be.visible");
    cy.get("button").contains("Summary").click();
    cy.contains("Details").should("not.be.visible");
  });
  //test defaultExpanded
  it("respects defaultExpanded prop", () => {
    cy.mount(
      <Accordion id="a2" defaultExpanded>
        <AccordionSummary id="a2">Summary</AccordionSummary>
        <AccordionDetails id="a2">Details</AccordionDetails>
      </Accordion>,
    );
    cy.contains("Details").should("be.visible");
  });
  //test when expanded (controlled) and custom classes
  it("respects expanded prop (controlled) and applies custom classes", () => {
    const classes = {
      root: "custom-root-class",
      summary: {
        btn: "custom-button-class",
        expandIcon: "custom-icon-class",
        content: "custom-content-class",
      },
      details: "custom-details-class",
    };
    const ControlledAccordions = () => {
      const [expanded, setExpanded] = React.useState<string | false>(false);
      const handleChange =
        (panel: string) =>
        (_event: React.SyntheticEvent, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        };
      return (
        <>
          <Accordion
            id="panel1"
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            classes={classes}
          >
            <AccordionSummary id="panel1">Panel 1</AccordionSummary>
            <AccordionDetails id="panel1">Details 1</AccordionDetails>
          </Accordion>
          <Accordion
            id="panel2"
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary id="panel2">Panel 2</AccordionSummary>
            <AccordionDetails id="panel2">Details 2</AccordionDetails>
          </Accordion>
        </>
      );
    };

    cy.mount(<ControlledAccordions />);
    cy.get("button").contains("Panel 1").click();
    cy.contains("Details 1").should("be.visible");
    cy.contains("Details 2").should("not.be.visible");
    cy.get("div").should("have.class", "custom-root-class");
    cy.get("button").should("have.class", "custom-button-class");
  });
  //test disabled
  it("does not open details when disabled", () => {
    cy.mount(
      <Accordion id="a4" disabled>
        <AccordionSummary id="a4">Summary</AccordionSummary>
        <AccordionDetails id="a4">Details</AccordionDetails>
      </Accordion>,
    );
    cy.get("button").contains("Summary").click({ force: true });
    cy.contains("Details").should("not.be.visible");
  });
  //test when disableGutters and remove margin
  it("applies disableGutters and remove margin", () => {
    cy.mount(
      <Accordion id="a5" disableGutters square>
        <AccordionSummary id="a5">Summary</AccordionSummary>
        <AccordionDetails id="a5">Details</AccordionDetails>
      </Accordion>,
    );
    cy.get("div").should("have.class", "my-0");
  });
  //test when add expandIcon
  it("renders custom expandIcon", () => {
    cy.mount(
      <Accordion id="a6">
        <AccordionSummary
          id="a6"
          expandIcon={<span data-testid="custom-icon">+</span>}
        >
          Summary
        </AccordionSummary>
        <AccordionDetails id="a6">Details</AccordionDetails>
      </Accordion>,
    );
    cy.get('[data-testid="custom-icon"]').should("exist");
  });
  //test onchange function when fired
  it("calls onChange when toggled", () => {
    const onChange = cy.stub().as("onChange");
    cy.mount(
      <Accordion id="a7" onChange={onChange}>
        <AccordionSummary id="a7">Summary</AccordionSummary>
        <AccordionDetails id="a7">Details</AccordionDetails>
      </Accordion>,
    );
    cy.get("button").contains("Summary").click();
    cy.get("@onChange").should("have.been.called");
  });
  //test slots props
  it("supports slots prop for heading", () => {
    cy.mount(
      <Accordion id="a8" slots={{ heading: { component: "h2" } }}>
        <AccordionSummary id="a8">Summary</AccordionSummary>
        <AccordionDetails id="a8">Details</AccordionDetails>
      </Accordion>,
    );
    cy.get("h2").contains("Summary").should("exist");
  });
  // Test expand icon rotation
  it("rotates expand icon when expanded", () => {
    cy.mount(
      <Accordion id="a8" slots={{ heading: { component: "h2" } }}>
        <AccordionSummary id="a8">Summary</AccordionSummary>
        <AccordionDetails id="a8">Details</AccordionDetails>
      </Accordion>,
    );
    // Check initial state (not rotated)
    cy.get("span").should("not.have.class", "rotate-180");
    // Click to expand
    cy.get("button").click();
    // Check rotated state
    cy.get("span").should("have.class", "rotate-180");
  });
});
