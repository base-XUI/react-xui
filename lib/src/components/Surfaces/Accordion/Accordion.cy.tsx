// import { Accordion } from "./Accordion";
// import { AccordionSummary } from "./AccordionSummary";

// describe("Accordion component", () => {
//   it("renders all sections", () => {
//     cy.mount(
//       <Accordion>
//         <AccordionSummary>Section 1</AccordionSummary>
//         <div>Content 1</div>
//         <AccordionSummary>Section 2</AccordionSummary>
//         <div>Content 2</div>
//       </Accordion>,
//     );
//     // Check if both sections are rendered
//     cy.get("h3").should("have.length", 2);
//     cy.get("div").should("have.length", 2);
//     // Check if the section titles are visible
//     cy.contains("Section 1").should("exist");
//     cy.contains("Section 2").should("exist");
//   });
// });
