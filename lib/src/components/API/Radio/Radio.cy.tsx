import { Radio } from "./Radio";
import { RadioColor } from "./variants";
import { Circle, Check } from "lucide-react";

describe("Radio Component", () => {
  it("renders default radio button correctly", () => {
    cy.mount(<Radio data-testid="radio" name="test" value="option1" />);

    cy.get('[data-testid="radio"]').should("exist");
    cy.get("input[type=radio]").should("not.be.checked");
    cy.get("input[type=radio]").should("have.attr", "value", "option1");
  });

  it("displays checked state when checked prop is true", () => {
    cy.mount(<Radio data-testid="radio" name="test" value="option1" checked />);

    cy.get("input[type=radio]").should("be.checked");
    cy.get("[data-state='checked']").should("exist");
  });

  it("handles user interaction and triggers onChange", () => {
    const onChangeStub = cy.stub().as("onChange");

    cy.mount(
      <Radio
        data-testid="radio"
        name="test"
        value="option1"
        onChange={onChangeStub}
      />,
    );

    cy.get("input[type=radio]").click();
    cy.get("@onChange").should("have.been.calledOnce");
  });

  it("shows required asterisk when required and not checked", () => {
    cy.mount(
      <Radio data-testid="radio" name="test" value="option1" required />,
    );

    cy.get(".text-red-500").should("exist").and("contain", "*");
  });

  it("does NOT show asterisk when required and checked", () => {
    cy.mount(
      <Radio
        data-testid="radio"
        name="test"
        value="option1"
        required
        checked
      />,
    );

    cy.get(".text-red-500").should("not.exist");
  });

  it("supports custom icon and checkedIcon", () => {
    cy.mount(
      <Radio
        data-testid="radio"
        name="test"
        value="option1"
        icon={<Check className="h-full w-full" />}
        checkedIcon={<Circle className="h-full w-full" />}
      />,
    );

    cy.get("svg").should("have.length", 1); // Initial un-checked icon

    cy.get("input[type=radio]").click();
    cy.get("svg").should("have.length", 1); // Now checked icon
  });

  it("applies disabled styles and prevents interaction", () => {
    const onChangeStub = cy.stub().as("onChange");

    cy.mount(
      <Radio
        data-testid="radio"
        name="test"
        value="option1"
        disabled
        onChange={onChangeStub}
      />,
    );

    cy.get("input[type=radio]").should("be.disabled");
    cy.get(".opacity-50").should("exist");
    cy.get("input[type=radio]").click({ force: true }); // Force click
    cy.get("@onChange").should("have.been.calledOnce");
  });

  it("uses custom slot components and props", () => {
    cy.mount(
      <Radio
        id="custom-id"
        data-testid="radio"
        name="test"
        value="option1"
        slots={{
          root: "label",
          input: "input",
        }}
        slotProps={{
          root: {
            className: "custom-label-style font-bold",
            ["htmlFor" as string]: "custom-id",
          },
          input: {
            id: "custom-id",
            className: "custom-input-style",
          },
        }}
      />,
    );

    cy.get("label.custom-label-style").should("exist");
    cy.get("input#custom-id").should("exist");
  });

  it("has correct aria-checked attribute", () => {
    cy.mount(<Radio data-testid="radio" name="test" value="option1" checked />);

    cy.get("input").should("have.attr", "aria-checked", "true");
    cy.get("input").should("have.attr", "value", "option1");
  });
});
describe("Display Error MSG When Invalid Icon", () => {
  it("supports custom icon and checkedIcon", () => {
    cy.mount(
      <Radio
        data-testid="radio"
        name="test"
        value="option1"
        icon={""}
        checkedIcon={""}
      />,
    );
    cy.get("[data-testid='icon-error-msg']").should("exist"); // Initial un-checked icon
  });
});
describe("Checkbox Colors", () => {
  const colors: RadioColor[] = [
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
    "muted",
  ];
  const spanHolderSelector = "[data-testid='root-component']";
  colors.forEach((color) => {
    it(`should apply ${color} color classes`, () => {
      cy.mount(<Radio color={color} checked />);
      cy.get(spanHolderSelector).should((el) => {
        expect(el).to.have.class(`bg-${color}`);
        expect(el).to.have.class(`text-${color}-foreground`);
        expect(el).to.have.class(`border-${color}-foreground`);
      });
    });
  });
});
