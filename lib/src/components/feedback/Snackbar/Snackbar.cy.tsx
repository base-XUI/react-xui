import { Snackbar } from "./Snackbar";

const action = <button data-cy="snackbar-action">UNDO</button>;

describe("Snackbar component", () => {
  it("renders when open is true", () => {
    cy.mount(<Snackbar open message="Test Snackbar" />);
    cy.contains("Test Snackbar").should("exist");
  });

  it("does not render when open is false", () => {
    cy.mount(<Snackbar open={false} message="Hidden Snackbar" />);
    cy.contains("Hidden Snackbar").should("not.exist");
  });

  it("auto-hides after duration", () => {
    cy.mount(<Snackbar open autoHideDuration={1000} message="Auto-hide" />);
    cy.contains("Auto-hide").should("exist");
    cy.wait(1200);
    cy.contains("Auto-hide").should("not.exist");
  });

  it("calls onClose when auto-hide triggers", () => {
    const onClose = cy.stub().as("onClose");
    cy.mount(
      <Snackbar
        open
        autoHideDuration={500}
        message="Close Test"
        onClose={onClose}
      />,
    );
    cy.wait(600);
    cy.get("@onClose").should("have.been.calledWith", undefined, "timeout");
  });

  it("renders action button", () => {
    cy.mount(<Snackbar open message="With Action" action={action} />);
    cy.get('[data-cy="snackbar-action"]').should("exist");
  });

  it("supports anchorOrigin positioning", () => {
    cy.mount(
      <Snackbar
        open
        message="Top Left"
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      />,
    );
    cy.contains("Top Left").parent().parent().should("have.class", "top-6");
    cy.contains("Top Left").parent().parent().should("have.class", "left-6");
  });

  it("renders children when message is not provided", () => {
    cy.mount(
      <Snackbar open>
        <span data-cy="snackbar-children">Child Content</span>
      </Snackbar>,
    );
    cy.get('[data-cy="snackbar-children"]').should("exist");
    cy.contains("Child Content").should("exist");
  });
});
