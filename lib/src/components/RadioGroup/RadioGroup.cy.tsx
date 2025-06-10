import { ChangeEvent, useState } from "react";
import { Primitive, RadioGroup } from "@/components/RadioGroup";
import { Radio } from "../API/Radio";

describe("RadioGroup Component - Direct Radio Tests", () => {
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
        <Radio value="1" id="radio-1" data-testid="radio-1" />
        <Radio value="2" id="radio-2" data-testid="radio-2" />
        <Radio value="3" id="radio-3" data-testid="radio-3" disabled />
      </RadioGroup>
    );
  };

  it("renders without errors", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('input[value="1"]').should("exist");
    cy.get('input[value="2"]').should("exist");
    cy.get('input[value="3"]').should("exist");
  });

  it("has correct default selected value", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('input[value="1"]').should("be.checked");
  });

  it("can change selected radio button", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('input[value="2"]').click();
    cy.get('input[value="2"]').should("be.checked");
    cy.get('input[value="1"]').should("not.be.checked");
  });

  it("ignores disabled radios when updating group state", () => {
    cy.mount(<TestRadioGroup />);
    cy.get('input[value="3"]').should("be.disabled");

    cy.get('input[value="3"]').click({ force: true });
    cy.get('input[value="3"]').should("not.be.checked");
  });

  it("applies row layout class", () => {
    cy.mount(<TestRadioGroup row />);
    cy.get(".flex-row").should("exist");
  });

  it("triggers onValueChange when clicked", () => {
    const onValueChangeSpy = cy.spy().as("onValueChangeSpy");

    cy.mount(
      <RadioGroup name="group" onValueChange={onValueChangeSpy}>
        <Radio value="A" />
        <Radio value="B" />
      </RadioGroup>,
    );

    cy.get('input[value="B"]').click();
    cy.get("@onValueChangeSpy").should("have.been.calledWith", "B");
  });

  it("triggers onChange event with metadata", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    cy.mount(
      <RadioGroup name="group" onChange={onChangeSpy}>
        <Radio value="X" />
        <Radio value="Y" />
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

  it("respects different colors and sizes via props", () => {
    cy.mount(
      <RadioGroup name="styled-group">
        <Radio
          color="secondary"
          size="small"
          value="sml"
          data-testid="sml-radio"
        />
        <Radio
          color="success"
          size="large"
          value="lrg"
          data-testid="lrg-radio"
        />
      </RadioGroup>,
    );

    cy.get('[data-testid="sml-radio"]')
      .parent()
      .should("have.class", "text-secondary-foreground");
    cy.get('[data-testid="lrg-radio"]')
      .parent()
      .should("have.class", "text-success-foreground");
  });

  it("renders icons correctly", () => {
    cy.mount(
      <RadioGroup name="icon-group">
        <Radio
          checkedIcon={<span data-testid="custom-checked-icon">✔</span>}
          value="1"
          data-testid="radio-icon"
        />
      </RadioGroup>,
    );

    cy.get('[data-testid="radio-icon"]').click();
    cy.get('[data-testid="custom-checked-icon"]').should("exist");
  });

  it("does not update state when clicking on disabled radio", () => {
    cy.mount(
      <RadioGroup name="disabled-group" defaultValue="A">
        <Radio value="A" />
        <Radio value="B" disabled />
      </RadioGroup>,
    );

    cy.get('input[value="A"]').should("be.checked");
    cy.get('input[value="B"]').should("be.disabled");

    cy.get('input[value="B"]').click({ force: true });
    cy.get('input[value="A"]').should("be.checked");
  });

  it("works in controlled mode", () => {
    const TestControlledGroup = () => {
      const [value, setValue] = useState("X");
      return (
        <RadioGroup
          name="controlled"
          value={value}
          onValueChange={(val) => setValue(val as string)}
        >
          <Radio value="X" data-testid="radio-x" />
          <Radio value="Y" data-testid="radio-y" />
        </RadioGroup>
      );
    };

    cy.mount(<TestControlledGroup />);
    cy.get('[data-testid="radio-x"]').should("be.checked");

    cy.get('[data-testid="radio-y"]').click();
    cy.get('[data-testid="radio-y"]').should("be.checked");
  });

  it("handles multiple groups independently", () => {
    cy.mount(
      <div>
        <RadioGroup name="group1" defaultValue="A">
          <Radio value="A" data-testid="group1-a" />
          <Radio value="B" data-testid="group1-b" />
        </RadioGroup>

        <RadioGroup name="group2" defaultValue="C">
          <Radio value="C" data-testid="group2-c" />
          <Radio value="D" data-testid="group2-d" />
        </RadioGroup>
      </div>,
    );

    cy.get('[data-testid="group1-a"]').should("be.checked");
    cy.get('[data-testid="group2-c"]').should("be.checked");

    cy.get('[data-testid="group1-b"]').click();
    cy.get('[data-testid="group1-b"]').should("be.checked");
    cy.get('[data-testid="group2-c"]').should("be.checked"); // لم يتغير
  });

  it("respects external value changes", () => {
    cy.mount(
      <RadioGroup name="dynamic-group" value="X">
        <Radio value="X" data-testid="radio-x" />
        <Radio value="Y" data-testid="radio-y" />
      </RadioGroup>,
    );

    cy.get('input[value="X"]').should("be.checked");
    cy.get('input[value="Y"]').should("not.be.checked");
  });

  it("does not check other radios after selecting one", () => {
    cy.mount(
      <RadioGroup name="exclusive-group" defaultValue="X">
        <Radio value="X" data-testid="radio-x" />
        <Radio value="Y" data-testid="radio-y" />
      </RadioGroup>,
    );

    cy.get('[data-testid="radio-x"]').should("be.checked");
    cy.get('[data-testid="radio-y"]').click();
    cy.get('[data-testid="radio-y"]').should("be.checked");
    cy.get('[data-testid="radio-x"]').should("not.be.checked");
  });

  it("resets to default if value is removed", () => {
    const TestDefaultReset = () => {
      const [value, setValue] = useState<Primitive>("X");
      return (
        <>
          <button onClick={() => setValue("" as Primitive)}>Clear Value</button>
          <RadioGroup name="reset-group" value={value} onValueChange={setValue}>
            <Radio value="X" data-testid="radio-x" />
            <Radio value="Y" data-testid="radio-y" />
          </RadioGroup>
        </>
      );
    };

    cy.mount(<TestDefaultReset />);
    cy.get('[data-testid="radio-x"]').should("be.checked");

    cy.get("button").click();
    cy.get('[data-testid="radio-x"]').should("not.be.checked");
  });

  it("supports nested elements like div, span", () => {
    cy.mount(
      <RadioGroup name="nested-group" defaultValue="X">
        <div className="flex items-center gap-2">
          <Radio value="X" data-testid="nested-x" />
          <span>X</span>
        </div>
        <div className="flex items-center gap-2">
          <Radio value="Y" data-testid="nested-y" />
          <span>Y</span>
        </div>
      </RadioGroup>,
    );

    cy.get('[data-testid="nested-x"]').should("be.checked");

    cy.get('[data-testid="nested-y"]').click();
    cy.get('[data-testid="nested-y"]').should("be.checked");
    cy.get('[data-testid="nested-x"]').should("not.be.checked");
  });
});
