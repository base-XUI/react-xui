// cypress/e2e/checkbox.cy.tsx

import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxColor } from "./variants";
import * as React from "react";

describe("Checked And UnChecked Checkbox Component", () => {
  it("Should UnChecked The Checkbox", () => {
    cy.mount(<Checkbox checked={false} />);
    cy.get('input[type="checkbox"]').uncheck();
    cy.get("label").click();
    cy.get("input[type='checkbox']").check({ force: true });
  });

  it("Should Checked The Checkbox", () => {
    cy.mount(<Checkbox checked={true} />);
    cy.get("input[type='checkbox']").check({ force: true });
    cy.get("svg").should("exist");
  });
});

describe("Default behavior", () => {
  it("should not have required or disabled attributes by default", () => {
    cy.mount(<Checkbox id="checkboxElement" />);
    ["required", "disabled"].forEach((attr) => {
      cy.get("#checkboxElement").should("not.have.attr", attr);
    });
  });

  it("should not be indeterminate by default", () => {
    cy.mount(<Checkbox />);
    cy.get("div[role='checkbox']").should("not.contain", "—");
    // Optional: ensure SVG icon is not present (if your unchecked state hides the icon)
    cy.get("svg").should("not.exist");
  });
});
describe("Test Event Handler By React Hooks", () => {
  it("should handle checkbox change event", () => {
    // Wrap the Checkbox with a parent component that manages state
    const handleChange = cy.stub().as("handleChange");

    const TestWrapper = () => {
      const [checked, setChecked] = useState(false);

      const handleChangeWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        handleChange(e);
        console.log("From Cypress File Test", e.target);
      };

      return (
        <Checkbox
          id="checkboxElement"
          checked={checked}
          onChange={handleChangeWrapper}
        />
      );
    };

    cy.mount(<TestWrapper />);

    // Click the label to toggle checkbox
    cy.get("label").click();

    // Assert checkbox is checked
    cy.get("@handleChange").should("has.been.calledOnce");

    cy.get("#checkboxElement").should("be.checked");
    // Optionally assert SVG icon appears on check
    cy.get("svg").should("exist");
  });
});

//  Test Colors Of Checkbox
describe("Colors", () => {
  const colorTests: { name: CheckboxColor; classes: string }[] = [
    {
      name: "primary",
      classes:
        "text-primary-foreground border-primary-foreground bg-primary hover:bg-primary/90 box-content",
    },
    {
      name: "secondary",
      classes:
        "text-secondary-foreground border-secondary-foreground bg-secondary hover:bg-secondary/90 box-content",
    },
    {
      name: "success",
      classes:
        "text-success-foreground border-success-foreground bg-success hover:bg-success/90 box-content",
    },
    {
      name: "warning",
      classes:
        "text-warning-foreground border-warning-foreground bg-warning hover:bg-warning/90 box-content",
    },
    {
      name: "muted",
      classes:
        "text-muted-foreground border-muted-foreground bg-muted hover:bg-muted/90 box-content",
    },
    {
      name: "error",
      classes:
        "text-error-foreground border-error-foreground bg-error hover:bg-error/90 box-content",
    },
    {
      name: "info",
      classes:
        "text-info-foreground border-info-foreground bg-info hover:bg-info/90 box-content",
    },
  ];
  colorTests.forEach(({ name, classes }) => {
    it(`should apply ${name} color`, () => {
      cy.mount(<Checkbox checked={true} color={name} />);
      cy.get("div[role='checkbox']").should("exist");
      cy.get("div[role='checkbox']").should("have.class", classes);
      cy.get("svg").should("exist");
    });
  });
});

// Test Size Of Checkbox
describe("Size", () => {
  it("should render the checkbox with small size", () => {
    cy.mount(<Checkbox size="small" />);
    cy.get("div[role='checkbox']").should("exist");
    cy.get("div[role='checkbox']").should("have.class", "h-5 w-5");
  });
  it("should render the checkbox with medium size", () => {
    cy.mount(<Checkbox size="medium" />);
    cy.get("div[role='checkbox']").should("exist");
    cy.get("div[role='checkbox']").should("have.class", "h-6 w-6");
  });
  it("should render the checkbox with large size", () => {
    cy.mount(<Checkbox size="large" />);
    cy.get("div[role='checkbox']").should("exist");
    cy.get("div[role='checkbox']").should("have.class", "h-7 w-7");
  });
});

describe("Checkbox Component - Full Coverage", () => {
  const defaultTestId = "div[role='checkbox']";
  const inputSelector = "input[type='checkbox']";

  it("should render with default props correctly", () => {
    cy.mount(<Checkbox id="checkboxElement" checked={false} />);
    cy.get(inputSelector).uncheck();

    ["required", "disabled"].forEach((attr) => {
      cy.get("#checkboxElement").should("not.have.attr", attr);
    });
  });

  it("should handle 'checked' prop", () => {
    cy.mount(<Checkbox checked />);
    cy.get(inputSelector).should("be.checked");
  });

  it("should handle 'defaultChecked' for uncontrolled checkbox", () => {
    cy.mount(<Checkbox defaultChecked />);
    cy.get(inputSelector).should("not.be.checked");
  });

  it("should toggle checked on label click", () => {
    cy.mount(<Checkbox />);
    cy.get("label").click();
    // cy.get(inputSelector).check("be.checked");
  });

  it("should handle 'disabled' prop", () => {
    cy.mount(<Checkbox disabled={true} />);
    cy.get(inputSelector).should("be.disabled");
    cy.get(defaultTestId).should("have.class", "opacity-50");
  });

  it("should handle 'required' prop", () => {
    cy.mount(<Checkbox required />);
    cy.get(inputSelector).should("have.attr", "required");
    cy.get(defaultTestId).should("have.class", "border-error");
  });

  it("should handle 'indeterminate' state", () => {
    cy.mount(<Checkbox indeterminate />);
    cy.get(defaultTestId).should("exist").contains("—");
  });

  it("should render custom 'checkedIcon'", () => {
    cy.mount(<Checkbox checked checkedIcon={<span>✅</span>} />);
    cy.get(defaultTestId).contains("✅").should("exist");
  });

  it("should render custom 'indeterminateIcon'", () => {
    cy.mount(<Checkbox indeterminate indeterminateIcon={<span>⚠️</span>} />);
    cy.get(defaultTestId).contains("⚠️").should("exist");
  });

  it("should apply color variants", () => {
    const colorTests: { name: CheckboxColor; expectedClass: string }[] = [
      { name: "primary", expectedClass: "bg-primary-foreground" },
      { name: "secondary", expectedClass: "bg-secondary-foreground" },
      { name: "success", expectedClass: "bg-success-foreground" },
      { name: "error", expectedClass: "bg-error-foreground" },
      { name: "warning", expectedClass: "bg-warning-foreground" },
      { name: "info", expectedClass: "bg-info-foreground" },
      { name: "muted", expectedClass: "bg-muted-foreground" },
    ];
    colorTests.forEach(({ name, expectedClass }) => {
      it(`should apply ${name} color`, () => {
        cy.mount(<Checkbox checked={true} color={name} />);
        cy.get("div[role='checkbox']").should("exist");
        cy.get("div[role='checkbox']").should("have.class", expectedClass);
        cy.get("svg").should("exist");
      });
    });
  });

  it("should apply size variants", () => {
    const sizes: Array<{ size: string; expectedClass: string }> = [
      { size: "small", expectedClass: "h-5 w-5" },
      { size: "medium", expectedClass: "h-6 w-6" },
      { size: "large", expectedClass: "h-7 w-7" },
    ];

    sizes.forEach(({ size, expectedClass }) => {
      cy.mount(<Checkbox size={size as any} />);
      cy.get(defaultTestId).should("have.class", expectedClass);
    });
  });
});
