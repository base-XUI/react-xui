import { createRef } from "react";
import { Radio } from "./Radio";
import { RadioColor, RadioSize } from "./variants";
import { Circle, Check } from "lucide-react";

describe("Radio Component: Basic Functionality", () => {
  it("should render the default radio button correctly", () => {
    cy.mount(<Radio data-testid="radio-input" name="test" value="option1" />);
    cy.get('[data-testid="radio-input"]').should("exist");
    cy.get('input[type="radio"]').should("not.be.checked");
  });

  it("should display the checked state when the checked prop is true", () => {
    cy.mount(
      <Radio
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        name="test"
        value="option1"
        checked
      />,
    );
    cy.get('input[type="radio"]').should("be.checked");
    cy.get('[data-testid="radio-root"]').should(
      "have.attr",
      "data-state",
      "checked",
    );
  });

  it("should have the correct aria-checked attribute", () => {
    cy.mount(
      <Radio
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        name="test"
        value="option1"
        checked
      />,
    );
    cy.get('[data-testid="radio-root"]').should(
      "have.attr",
      "aria-checked",
      "true",
    );

    cy.mount(
      <Radio
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        name="test"
        value="option1"
        checked={false}
      />,
    );
    cy.get('[data-testid="radio-root"]').should(
      "have.attr",
      "aria-checked",
      "false",
    );
  });

  it("should display an error style when required and unchecked", () => {
    cy.mount(
      <Radio
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        name="test"
        value="option1"
        required
        checked={false}
      />,
    );
    cy.get('[data-testid="radio-root"]').should("have.class", "border-error");
  });

  it("should not display an error style when required and checked", () => {
    cy.mount(
      <Radio
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        name="test"
        value="option1"
        required
        checked
      />,
    );
    cy.get('[data-testid="radio-root"]').should(
      "not.have.class",
      "border-error",
    );
  });

  it("should apply disabled styles and prevent interaction", () => {
    const onChangeStub = cy.stub().as("onChange");
    cy.mount(
      <Radio
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        name="test"
        value="option1"
        disabled
        onChange={onChangeStub}
      />,
    );

    cy.get('input[type="radio"]').should("be.disabled");
    cy.get('[data-testid="radio-root"]').should("have.class", "opacity-50");
    cy.get('[data-testid="radio-root"]').should(
      "have.class",
      "cursor-not-allowed",
    );

    cy.get('input[type="radio"]').click({ force: true });
    cy.get("@onChange").should("not.have.been.called");
  });
});

describe("Radio Group Behavior", () => {
  it("should only allow one option to be selected at a time within a group", () => {
    cy.mount(
      <>
        <Radio name="group1" value="a" />
        <Radio name="group1" value="b" />
        <Radio name="group1" value="c" />
      </>,
    );

    cy.get('input[value="a"]').click({ force: true });
    cy.get('input[value="a"]').should("be.checked");
    cy.get('input[value="b"]').should("not.be.checked");

    cy.get('input[value="b"]').click({ force: true });
    cy.get('input[value="a"]').should("not.be.checked");
    cy.get('input[value="b"]').should("be.checked");
  });

  it("should handle uncontrolled state with defaultChecked correctly", () => {
    cy.mount(<Radio name="test" value="option1" defaultChecked />);
    cy.get('input[value="option1"]').should("be.checked");
  });

  it("should isolate radio groups with the same name in different scopes (e.g., fieldset)", () => {
    const onChangeStub = cy.stub().as("onChange"); // ← إضافة هنا

    cy.mount(
      <>
        <fieldset>
          <legend>Group A</legend>
          <Radio name="scoped-group" value="a1" onChange={onChangeStub} />
          <Radio name="scoped-group" value="a2" onChange={onChangeStub} />
        </fieldset>
        <hr />
        <fieldset>
          <legend>Group B</legend>
          <Radio name="scoped-group" value="b1" onChange={onChangeStub} />
          <Radio name="scoped-group" value="b2" onChange={onChangeStub} />
        </fieldset>
      </>,
    );

    // Click in Group A
    cy.get('input[value="a1"]').click({ force: true });
    cy.get('input[value="a1"]').should("be.checked");
    cy.get('input[value="b1"]').should("not.be.checked");

    // Click in Group B
    cy.get('input[value="b2"]').click({ force: true });
    cy.get('input[value="b2"]').should("be.checked");

    // التأكد من أن onChange تم استدعاؤها مرتين
    cy.get("@onChange").should("have.callCount", 2);
  });
});

describe("Radio Component: Customization", () => {
  it("should support custom icon and checkedIcon", () => {
    cy.mount(
      <Radio
        name="test"
        value="option1"
        icon={<Check data-testid="icon-check" />}
        checkedIcon={<Circle data-testid="icon-circle" />}
      />,
    );

    cy.get('[data-testid="icon-check"]').should("be.visible");
    cy.get('input[type="radio"]').click({ force: true });
    cy.get('[data-testid="icon-circle"]').should("be.visible");
    cy.get('[data-testid="icon-check"]').should("not.exist");
  });

  it("should use custom slot components and props", () => {
    cy.mount(
      <Radio
        name="test"
        value="option1"
        id="custom-id"
        slots={{ root: "label" }}
        slotProps={{
          root: {
            className: "custom-label-style",
            ["data-testid" as string]: "custom-label",
          },
          input: {
            className: "custom-input-style",
          },
        }}
      />,
    );

    cy.get('label[data-testid="custom-label"]').should(
      "have.class",
      "custom-label-style",
    );
    cy.get("input#custom-id").should("have.class", "custom-input-style");
  });

  it("should apply inline styles via the sx prop", () => {
    cy.mount(
      <Radio
        sx={{ backgroundColor: "rgb(255, 0, 0)", border: "2px solid blue" }}
        slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
      />,
    );

    cy.get('[data-testid="radio-root"]')
      .should("have.css", "background-color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid")
      .and("have.css", "border-color", "rgb(0, 0, 255)");
  });
});

describe("Radio Component: Interaction and Accessibility", () => {
  it("should call the onChange handler on interaction", () => {
    const onChangeStub = cy.stub().as("onChange");
    cy.mount(<Radio name="test" value="option1" onChange={onChangeStub} />);

    cy.get('input[type="radio"]').click({ force: true });
    cy.get("@onChange").should("have.been.calledOnce");
  });

  it("should forward refs to the root and input elements", () => {
    const rootRef = createRef<HTMLLabelElement>();
    const inputRef = createRef<HTMLInputElement>();

    cy.mount(
      <Radio
        slots={{ root: "label" }}
        slotProps={{
          root: { ref: rootRef, ["data-testid" as string]: "root" },
          input: { ref: inputRef },
        }}
      />,
    );

    cy.get('[data-testid="root"]').should((element) => {
      expect(element[0]).to.equal(rootRef.current);
    });

    cy.wrap(inputRef).its("current").should("not.be.null");
    cy.wrap(inputRef).its("current.tagName").should("eq", "INPUT");
  });
});

describe("Radio Component: Edge Cases", () => {
  it("should render an error message for invalid icon props", () => {
    // Prevent the test from failing due to a console error, but check for it.
    cy.on("uncaught:exception", (err) => {
      expect(err.message).to.include('Invalid "icon"');
      // Return false to prevent the test from failing
      return false;
    });

    cy.mount(<Radio icon={"" as any} />); // Pass an invalid icon
    cy.get('[data-testid="icon-error-msg"]')
      .should("exist")
      .and("contain.text", "Invalid Icon");
  });
});

describe("Radio Variants: Colors", () => {
  const colors: RadioColor[] = [
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
    "muted",
  ];

  colors.forEach((color) => {
    it(`should correctly apply the "${color}" color classes`, () => {
      cy.mount(
        <Radio
          color={color}
          checked
          slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        />,
      );

      cy.get('[data-testid="radio-root"]').should("have.class", `bg-${color}`);
    });
  });
});

describe("Radio Variants: Sizes", () => {
  const sizes: Array<{ size: RadioSize; expectedClass: string }> = [
    { size: "small", expectedClass: "h-4 w-4" },
    { size: "medium", expectedClass: "h-5 w-5" },
    { size: "large", expectedClass: "h-6 w-6" },
  ];
  sizes.forEach(({ size, expectedClass }) => {
    it(`should apply correct classes for size: ${size}`, () => {
      cy.mount(
        <Radio
          size={size}
          slotProps={{ root: { ["data-testid" as string]: "radio-root" } }}
        />,
      );
      cy.get('[data-testid="radio-root"]').should("have.class", expectedClass);
    });
  });
});
