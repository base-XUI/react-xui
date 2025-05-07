import { Tab } from "./Tab";
import { Tabs } from "../Tabs";
import { TabList } from "../TabList/TabList";

describe("Tab Component", () => {
  it("renders standard tab correctly", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Standard Tab</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tab"]').should("exist").and("contain.text", "Standard Tab");
    cy.get('[role="tab"]').should("have.attr", "aria-selected", "true");
  });

  it("renders tab with icon", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0} icon={<span data-testid="icon">🏠</span>}>
            With Icon
          </Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[data-testid="icon"]').should("exist");
    cy.get('[role="tab"]').should("contain.text", "With Icon");
  });

  it("renders disabled tab", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1} disabled>
            Disabled Tab
          </Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tab"]')
      .eq(1)
      .should("have.attr", "aria-disabled", "true")
      .should("have.attr", "tabindex", "-1");
  });

  it("handles click events", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tab"]').eq(0).should("have.attr", "aria-selected", "true");
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "false");

    cy.get('[role="tab"]').eq(1).click();
    cy.get('[role="tab"]').eq(0).should("have.attr", "aria-selected", "false");
    cy.get('[role="tab"]').eq(1).should("have.attr", "aria-selected", "true");
  });

  it("applies appropriate styles based on state", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Active Tab</Tab>
          <Tab value={1}>Inactive Tab</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tab"][aria-selected="true"]')
      .should("exist")
      .and("contain.text", "Active Tab");

    cy.get('[role="tab"][aria-selected="false"]')
      .should("exist")
      .and("contain.text", "Inactive Tab");
  });
});
