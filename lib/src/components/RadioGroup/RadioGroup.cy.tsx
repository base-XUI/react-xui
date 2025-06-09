// cypress/component/RadioGroup.cy.tsx

import { ChangeEvent } from "react";
import { RadioGroup } from "@/components/RadioGroup";
import { Radio } from "../API/Radio";
import { FormControlLabel } from "../API/FormControlLabel";

describe("RadioGroup Component", () => {
  const TestRadioGroup = ({ row = false }: { row?: boolean }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>, val: string) => {
      console.log("onChange triggered:", e);
      console.log("onChange triggered:", val);
    };

    return (
      <RadioGroup
        name="test-group"
        row={row}
        onChange={(e, value) => handleChange(e, value as string)}
        defaultValue="1"
      >
        <Radio value="1" id="radio-1" />
        Option 1
        <Radio value="2" id="radio-2" />
        Option 2
        <Radio value="3" disabled id="radio-3" />
        Disabled Option
      </RadioGroup>
    );
  };

  const TestRadioGroupWithFormControlLabel = ({
    row = false,
  }: {
    row?: boolean;
  }) => {
    return (
      <RadioGroup name="fl-group" row={row} defaultValue="B">
        <FormControlLabel label="Option A" control={<Radio value="A" />} />
        <FormControlLabel label="Option B" control={<Radio value="B" />} />
        <FormControlLabel
          label="Disabled Option"
          control={<Radio value="C" disabled />}
        />
      </RadioGroup>
    );
  };

  it("renders without errors", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('[data-testid="root-component"]').should("have.length", 3);
  });

  it("has correct default selected value", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('input[value="1"]').should("be.checked");
  });

  it("can change selected radio button", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('input[value="2"]').click();
    cy.get('input[value="2"]').should("be.checked");
  });

  it("shows required indicator (*) when FormControlLabel's Radio is required", () => {
    cy.mount(
      <RadioGroup name="fl-required">
        <FormControlLabel
          label="Required Option"
          control={<Radio value="X" required />}
        />
      </RadioGroup>,
    );

    // Check for asterisk inside FormControlLabel
    cy.contains("Required Option")
      .parent()
      .find("*")
      .contains("*")
      .should("exist");
  });
  it("validates required FormControlLabel radio on form submit", () => {
    cy.mount(
      <form>
        <RadioGroup name="fl-validate">
          <FormControlLabel
            label="Agree"
            control={<Radio value="agree" required />}
          />
        </RadioGroup>
        <button type="submit">Submit</button>
      </form>,
    );

    cy.get("button").click();
    cy.window().then((win) => {
      cy.stub(win, "alert").callsFake(() => {}); // Optional: intercept alert
    });

    // Browser will show native validation popup if the field is required and empty
    cy.get("input[type=radio]:invalid").should("exist");
  });
  it("ignores disabled radios when updating group state", () => {
    cy.mount(
      <RadioGroup name="test-group" defaultValue="1">
        <Radio value="1" />
        <Radio value="2" />
        <Radio value="3" disabled />
      </RadioGroup>,
    );

    cy.get('input[value="1"]').should("be.checked"); // القيمة الافتراضية
    cy.get('input[value="3"]').should("be.disabled");

    cy.get('input[value="2"]').click();
    cy.get('input[value="2"]').should("be.checked"); // التأكد من أن الراديو النشط يتم تحديده
    cy.get('input[value="3"]').should("not.be.checked"); // التأكد من أن الراديو المعطَّل لم يتم تحديده
  });

  it("applies row layout class", () => {
    cy.mount(<TestRadioGroup row />);
    cy.get(".flex-row").should("exist");
  });

  it("triggers onValueChange when clicked", () => {
    const onValueChangeSpy = cy.spy().as("onValueChangeSpy");

    cy.mount(
      <RadioGroup name="group" onValueChange={onValueChangeSpy}>
        <Radio value="A" />A
        <Radio value="B" />B
      </RadioGroup>,
    );

    cy.get('input[value="B"]').click();
    cy.get("@onValueChangeSpy").should("have.been.calledWith", "B");
  });

  it("triggers onChange event with metadata", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    cy.mount(
      <RadioGroup name="group" onChange={onChangeSpy}>
        <Radio value="X" />X
        <Radio value="Y" />Y
      </RadioGroup>,
    );

    cy.get('input[value="Y"]').click();
    cy.get("@onChangeSpy").should("have.been.calledOnce");
    cy.get("@onChangeSpy").then((args: any) => {
      const callArgs = args.firstCall.args;
      expect(callArgs[1]).to.equal("Y"); // value
      expect(callArgs[2]).to.include.keys("id", "value", "name", "checked");
    });
  });

  it("supports required styling", () => {
    cy.mount(
      <RadioGroup name="required-group">
        <Radio value="yes" required />
        Yes
        <Radio value="no" />
        No
      </RadioGroup>,
    );

    cy.get('input[type="radio"]').each(() => {
      cy.contains("*").should("exist");
    });
  });

  it("respects different colors and sizes via props", () => {
    cy.mount(
      <RadioGroup name="styled-group">
        <Radio color="secondary" size="small" value="sml" />
        Small
        <Radio color="success" size="large" value="lrg" />
        Large
      </RadioGroup>,
    );

    cy.get('[data-state="unchecked"]')
      .eq(0)
      .should("have.class", "text-secondary-foreground");

    cy.get('[data-state="unchecked"]')
      .eq(1)
      .should("have.class", "text-success-foreground");
  });

  it("renders icons correctly", () => {
    cy.mount(
      <RadioGroup name="icon-group">
        <Radio
          checkedIcon={<span data-testid="custom-checked-icon">✔</span>}
          value="1"
        />
        With Icon
      </RadioGroup>,
    );

    cy.get('input[value="1"]').click();
    cy.get('[data-testid="custom-checked-icon"]').should("exist");
  });

  // ✅ New Tests: FormControlLabel Support

  it("renders FormControlLabel with Radio correctly", () => {
    cy.mount(<TestRadioGroupWithFormControlLabel />);
    cy.get('[data-testid="root-component"]').should("have.length", 3);
    cy.get('input[value="A"]').should("exist");
    cy.get('input[value="B"]').should("exist");
    cy.get('input[value="C"]').should("exist");
  });

  it("defaults to correct value in FormControlLabel group", () => {
    cy.mount(<TestRadioGroupWithFormControlLabel />);
    cy.get('input[value="B"]').should("be.checked");
  });

  it("changes selection in FormControlLabel group", () => {
    cy.mount(<TestRadioGroupWithFormControlLabel />);
    cy.get('input[value="A"]').click();
    cy.get('input[value="A"]').should("be.checked");
  });

  it("does not select disabled FormControlLabel radio", () => {
    cy.mount(<TestRadioGroupWithFormControlLabel />);
    cy.get('input[value="C"]').should("be.disabled");
    cy.get('input[value="C"]').click({ force: true });
    cy.get('input[value="C"]').should("not.be.checked");
  });

  it("triggers onChange inside FormControlLabel", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    cy.mount(
      <RadioGroup name="fl-group" onChange={onChangeSpy}>
        <FormControlLabel label="Option X" control={<Radio value="X" />} />
        <FormControlLabel label="Option Y" control={<Radio value="Y" />} />
      </RadioGroup>,
    );

    cy.get('input[value="Y"]').click();
    cy.get("@onChangeSpy").should("have.been.calledOnce");
    cy.get("@onChangeSpy").then((args: any) => {
      const callArgs = args.firstCall.args;
      expect(callArgs[1]).to.equal("Y"); // value
      expect(callArgs[2]).to.include.keys("id", "value", "name", "checked");
    });
  });

  it("triggers onValueChange inside FormControlLabel", () => {
    const onValueChangeSpy = cy.spy().as("onValueChangeSpy");

    cy.mount(
      <RadioGroup name="fl-group" onValueChange={onValueChangeSpy}>
        <FormControlLabel label="Option M" control={<Radio value="M" />} />
        <FormControlLabel label="Option N" control={<Radio value="N" />} />
      </RadioGroup>,
    );

    cy.get('input[value="N"]').click();
    cy.get("@onValueChangeSpy").should("have.been.calledWith", "N");
  });
});
