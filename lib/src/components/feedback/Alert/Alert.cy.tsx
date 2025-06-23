import { Alert, AlertTitle } from "./Alert";
import { Button } from "@/components/inputs/Button";

describe("Alert Component", () => {
  // Test basic rendering
  it("renders correctly with default props", () => {
    cy.mount(<Alert>This is an alert</Alert>);
    cy.get("div[role='alert']").should("exist");
    cy.get("div[role='alert']").should("contain", "This is an alert");
  });

  // Test severity variants
  it("renders with different severity levels", () => {
    cy.mount(
      <div className="flex flex-col gap-4">
        <Alert severity="success">Success Alert</Alert>
        <Alert severity="info">Info Alert</Alert>
        <Alert severity="warning">Warning Alert</Alert>
        <Alert severity="error">Error Alert</Alert>
      </div>
    );
    
    // Check that all alerts are rendered
    cy.get("div[role='alert']").should("have.length", 4);
    
    // Check content
    cy.get("div[role='alert']").eq(0).should("contain", "Success Alert");
    cy.get("div[role='alert']").eq(1).should("contain", "Info Alert");
    cy.get("div[role='alert']").eq(2).should("contain", "Warning Alert");
    cy.get("div[role='alert']").eq(3).should("contain", "Error Alert");
  });

  // Test style variants
  it("renders with different style variants", () => {
    cy.mount(
      <div className="flex flex-col gap-4">
        <Alert variant="outlined">Outlined Alert</Alert>
        <Alert variant="filled">Filled Alert</Alert>
      </div>
    );
    
    cy.get("div[role='alert']").should("have.length", 2);
    cy.get("div[role='alert']").eq(0).should("contain", "Outlined Alert");
    cy.get("div[role='alert']").eq(1).should("contain", "Filled Alert");
  });

  // Test color override
  it("renders with color override", () => {
    cy.mount(
      <Alert severity="success" color="warning">
        Success Alert with warning color
      </Alert>
    );
    
    cy.get("div[role='alert']").should("exist");
    cy.get("div[role='alert']").should("contain", "Success Alert with warning color");
  });

  // Test with close button
  it("renders with close button and triggers onClose", () => {
    const onCloseSpy = cy.spy().as("onCloseSpy");
    
    cy.mount(
      <Alert onClose={onCloseSpy}>
        Alert with close button
      </Alert>
    );
    
    cy.get("button[aria-label='Close']").should("exist");
    cy.get("button[aria-label='Close']").click();
    cy.get("@onCloseSpy").should("have.been.calledOnce");
  });

  // Test with custom action
  it("renders with custom action", () => {
    const actionClickSpy = cy.spy().as("actionClickSpy");
    
    cy.mount(
      <Alert 
        action={
          <Button 
            variant="text" 
            size="small" 
            onClick={actionClickSpy}
          >
            UNDO
          </Button>
        }
      >
        Alert with custom action
      </Alert>
    );
    
    cy.contains("UNDO").should("exist");
    cy.contains("UNDO").click();
    cy.get("@actionClickSpy").should("have.been.calledOnce");
  });

  // Test with no icon
  it("renders with no icon", () => {
    cy.mount(
      <Alert icon={false}>
        Alert with no icon
      </Alert>
    );
    
    // Check that the alert exists but doesn't have an icon
    cy.get("div[role='alert']").should("exist");
    cy.get("div[role='alert'] > svg").should("not.exist");
  });

  // Test with custom icon
  it("renders with custom icon", () => {
    cy.mount(
      <Alert icon={<span className="custom-icon">🚀</span>}>
        Alert with custom icon
      </Alert>
    );
    
    cy.get(".custom-icon").should("exist");
    cy.get(".custom-icon").should("contain", "🚀");
  });

  // Test with AlertTitle
  it("renders with AlertTitle", () => {
    cy.mount(
      <Alert severity="success">
        <AlertTitle>Success Title</AlertTitle>
        Alert with title
      </Alert>
    );
    
    cy.get("div[role='alert']").should("exist");
    cy.get("div[role='alert']").should("contain", "Success Title");
    cy.get("div[role='alert']").should("contain", "Alert with title");
  });

  // Test with custom component
  it("renders with custom component", () => {
    cy.mount(
      <Alert component="section">
        Alert as section
      </Alert>
    );
    
    cy.get("section[role='alert']").should("exist");
    cy.get("section[role='alert']").should("contain", "Alert as section");
  });
});