import { ChangeEvent, useState } from "react";
import { Primitive, RadioGroup } from "@/components/RadioGroup";
import { Radio } from "@/components/API/Radio";

describe("RadioGroup Component - Direct Radio Tests", () => {
  const TestRadioGroup = ({ row = false }: { row?: boolean }) => {
    const [selectedValue, setSelectedValue] = useState<Primitive>();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
    };
    return (
      <RadioGroup
        name="test-group"
        value={selectedValue}
        row={row}
        onChange={(e) => handleChange(e)}
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
    cy.get("@onValueChangeSpy").should("have.been.calledWith", "b");
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
      expect(callArgs[1]).to.equal("y");
      expect(callArgs[2]).to.include.keys("id", "value", "name", "checked");
    });
  });
});
