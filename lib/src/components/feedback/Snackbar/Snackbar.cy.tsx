import { Snackbar } from "./Snackbar";
import { Button } from "@/components/inputs/Button";

describe("Snackbar Component", () => {
  it("renders correctly with default props", () => {
    cy.mount(<Snackbar open={true} message="Default Snackbar" />);
    cy.get('[role="alert"]').should("be.visible");
    cy.get('[role="alert"]').should("contain", "Default Snackbar");
    cy.get('[role="alert"]').should("have.class", "bg-white");
    cy.get('[role="alert"]').should("have.class", "text-black");
  });



  it("renders with action button", () => {
    cy.mount(
      <Snackbar
        open={true}
        message="Snackbar with Action"
        action={<Button size="small">Undo</Button>}
      />,
    );
    cy.get('[role="alert"]').should("contain", "Snackbar with Action");
    cy.get("button").contains("Undo").should("be.visible");
  });

  it("renders with custom content instead of message", () => {
    cy.mount(
      <Snackbar open={true}>
        <div className="flex flex-col">
          <span className="font-bold">Custom Content</span>
          <span className="text-sm">This is custom content</span>
        </div>
      </Snackbar>,
    );
    cy.get('[role="alert"]').should("contain", "Custom Content");
    cy.get('[role="alert"]').should("contain", "This is custom content");
  });

  it("renders at different positions", () => {
    // Top-right
    cy.mount(
      <Snackbar
        open={true}
        message="Top Right Snackbar"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />,
    );
    cy.get('[role="alert"]').should("have.class", "top-4");
    cy.get('[role="alert"]').should("have.class", "right-4");

    // Bottom-center
    cy.mount(
      <Snackbar
        open={true}
        message="Bottom Center Snackbar"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />,
    );
    cy.get('[role="alert"]').should("have.class", "bottom-4");
    cy.get('[role="alert"]').should("have.class", "left-1/2");
  });

  it("does not render close icon when withCloseIcon is false", () => {
    cy.mount(
      <Snackbar open={true} message="No Close Icon" withCloseIcon={false} />,
    );
    cy.get('[role="alert"]').should("be.visible");
    cy.get('[aria-label="Close"]').should("not.exist");
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    cy.mount(
      <Snackbar open={true} message="Closable Snackbar" onClose={onCloseSpy} />,
    );
    cy.get('[aria-label="Close"]').click();
    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("does not render when open is false", () => {
    cy.mount(<Snackbar open={false} message="Hidden Snackbar" />);
    cy.get('[role="alert"]').should("not.exist");
  });

  it("applies custom styles", () => {
    cy.mount(
      <Snackbar
        open={true}
        message="Custom Styled Snackbar"
        style={{ borderWidth: "3px", borderStyle: "dashed" }}
      />,
    );
    cy.get('[role="alert"]').should("have.css", "border-width", "3px");
    cy.get('[role="alert"]').should("have.css", "border-style", "dashed");
  });

  it("applies custom className", () => {
    cy.mount(
      <Snackbar
        open={true}
        message="Custom Class Snackbar"
        className="custom-test-class"
      />,
    );
    cy.get('[role="alert"]').should("have.class", "custom-test-class");
  });
});
