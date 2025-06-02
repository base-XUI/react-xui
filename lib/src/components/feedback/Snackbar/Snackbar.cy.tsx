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

  it("calls onClose when autoHideDuration expires", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    const autoHideDuration = 2000;

    cy.clock();
    cy.mount(
      <Snackbar
        open={true}
        message="Auto-hiding Snackbar"
        onClose={onCloseSpy}
        autoHideDuration={autoHideDuration}
      />,
    );

    cy.get('[role="alert"]').should("be.visible");
    cy.tick(autoHideDuration);
    // Add a small additional tick to allow React to process the state update
    cy.tick(50);
    cy.get("@onCloseSpy").should("have.been.called");
  });

  it("does not render when open is false", () => {
    cy.mount(<Snackbar open={false} message="Hidden Snackbar" />);
    cy.get('[role="alert"]').should("not.exist");
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
