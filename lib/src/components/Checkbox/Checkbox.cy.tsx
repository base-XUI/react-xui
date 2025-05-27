import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxColor, CheckboxSize } from "./variants";

describe("Checkbox Component - Full Coverage", () => {
  const inputSelector = "[data-testid='checkbox-input']";
  const spanHolderSelector = "[data-testid='checkbox-span-holder']";

  it("should render with default props correctly", () => {
    cy.mount(<Checkbox defaultChecked={false} />);
    cy.get(inputSelector).should("not.be.checked");
    cy.get(spanHolderSelector).should("exist");
    cy.get(inputSelector).should("not.have.attr", "disabled");
    cy.get(inputSelector).should("not.have.attr", "required");
  });

  it("should handle 'checked' prop", () => {
    cy.mount(<Checkbox checked={true} />);
    cy.get(inputSelector).should("be.checked");
    cy.get("svg").should("exist");
  });

  it("should handle 'defaultChecked' for uncontrolled checkbox", () => {
    cy.mount(<Checkbox defaultChecked={true} />);
    cy.get(inputSelector).should("be.checked");
  });

  it("should toggle checked on click", () => {
    const TestWrapper = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      );
    };

    cy.mount(<TestWrapper />);
    cy.get(spanHolderSelector).click();
    cy.get(inputSelector).should("be.checked");
  });

  it("should handle 'disabled' state", () => {
    cy.mount(<Checkbox disabled />);
    cy.get(inputSelector).should("be.disabled");
    cy.get(spanHolderSelector).should("have.class", "opacity-50");
  });

  it("should handle 'required' validation", () => {
    cy.mount(<Checkbox required />);
    cy.get(inputSelector).should("have.attr", "required");
    cy.get(spanHolderSelector).should("have.class", "border-error");
  });

  it("should display indeterminate state", () => {
    cy.mount(<Checkbox indeterminate />);
    cy.get("svg").should("exist");
  });

  it("should render custom icon when checked", () => {
    cy.mount(
      <Checkbox
        checked
        checkedIcon={<span data-testid="custom-checked-icon">✅</span>}
      />,
    );
    cy.get("[data-testid='custom-checked-icon']").should("exist");
  });

  it("should render custom icon when indeterminate", () => {
    cy.mount(
      <Checkbox
        indeterminate
        indeterminateIcon={
          <span data-testid="custom-indeterminate-icon">⚠️</span>
        }
      />,
    );
    cy.get("[data-testid='custom-indeterminate-icon']").should("exist");
  });
});

describe("Checkbox Colors", () => {
  const colors: CheckboxColor[] = [
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
    "muted",
  ];
  const spanHolderSelector = "[data-testid='checkbox-span-holder']";
  colors.forEach((color) => {
    it(`should apply ${color} color classes`, () => {
      cy.mount(<Checkbox color={color} checked />);
      cy.get(spanHolderSelector).should((el) => {
        expect(el).to.have.class(`bg-${color}`);
        expect(el).to.have.class(`text-${color}-foreground`);
        expect(el).to.have.class(`border-${color}-foreground`);
      });
    });
  });
});

describe("Checkbox Sizes", () => {
  const sizes: Array<{ size: CheckboxSize; expectedClass: string }> = [
    { size: "small", expectedClass: "h-4 w-4 text-xs" },
    { size: "medium", expectedClass: "h-5 w-5 text-sm" },
    { size: "large", expectedClass: "h-6 w-6 text-base" },
  ];

  sizes.forEach(({ size, expectedClass }) => {
    it(`should apply ${size} size`, () => {
      cy.mount(<Checkbox size={size} />);
      cy.get("[data-testid='checkbox-span-holder']").should(
        "have.class",
        expectedClass,
      );
    });
  });
});

describe("Checkbox Icon Validation", () => {
  const spanHolderSelector = "[data-testid='checkbox-span-holder']";

  it("should show error if icon is not a valid React element", () => {
    cy.mount(
      <Checkbox
        icon="invalid-icon-string" // invalid type
        checked={false}
      />,
    );

    cy.get(spanHolderSelector).should("not.exist");
  });

  it("should show error if checkedIcon is not a valid React element", () => {
    cy.mount(
      <Checkbox
        checkedIcon={123} // invalid type
        checked={true}
      />,
    );

    cy.get(spanHolderSelector).should("not.exist");
  });
  it("should show error if indeterminateIcon is not a valid React element", () => {
    cy.mount(
      <Checkbox
        indeterminate={true}
        indeterminateIcon={123} // invalid type
        checked={true}
      />,
    );

    cy.get(spanHolderSelector).should("not.exist");
  });
});

describe("Checkbox - slotProps, value, and id", () => {
  const inputSelector = "[data-testid='checkbox-input']";
  const spanHolderSelector = "[data-testid='checkbox-span-holder']";

  it("should apply slotProps.root correctly", () => {
    cy.mount(
      <Checkbox
        slotProps={{
          root: {
            className: "custom-slotProps-root-class",
            ["slotProps-root-data-custom" as string]: "true",
          },
          input: {},
        }}
      />,
    );

    // Check the span element for custom class and data attribute
    cy.get(spanHolderSelector)
      .should("have.class", "custom-slotProps-root-class")
      .and("have.attr", "slotprops-root-data-custom", "true");
  });

  it("should apply slotProps.input correctly (title, name, style)", () => {
    cy.mount(
      <Checkbox
        slotProps={{
          input: {
            title: "custom-slotProps-input-title",
            name: "custom-slotProps-input-name",
            style: { cursor: "pointer" },
          },
          root: {},
        }}
      />,
    );

    // Check input attributes
    cy.get(inputSelector)
      .should("have.attr", "title", "custom-slotProps-input-title")
      .and("have.attr", "name", "custom-slotProps-input-name");

    // Check inline style
    cy.get(inputSelector).should("have.css", "cursor").and("equal", "pointer");
  });

  it("should pass the correct value to input", () => {
    cy.mount(<Checkbox value="test-value" />);
    cy.get(inputSelector).should("have.attr", "value", "test-value");
  });

  it("should use the provided id on input", () => {
    cy.mount(<Checkbox id="custom-checkbox-id" />);
    cy.get(inputSelector).should("have.id", "custom-checkbox-id");
  });
});
