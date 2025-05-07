import { TabPanel } from "./TabPanel";
import { Tabs } from "../Tabs";
import { TabList } from "../TabList/TabList";
import { Tab } from "../Tab/Tab";

describe("TabPanel Component", () => {
  it("renders tab panel correctly", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
        <TabPanel value={0}>Panel Content 1</TabPanel>
        <TabPanel value={1}>Panel Content 2</TabPanel>
      </Tabs>,
    );

    cy.get('[role="tabpanel"]')
      .should("exist")
      .and("contain.text", "Panel Content 1");
  });

  it("shows the correct panel when tab is selected", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
        <TabPanel value={0}>Panel Content 1</TabPanel>
        <TabPanel value={1}>Panel Content 2</TabPanel>
      </Tabs>,
    );

    // Click second tab
    cy.get('[role="tab"]').eq(1).click();

    // Second panel should be visible
    cy.get('[role="tabpanel"]').should("contain.text", "Panel Content 2");
  });

  it("renders with custom className", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
        </TabList>
        <TabPanel value={0} className="custom-class">
          Panel Content
        </TabPanel>
      </Tabs>,
    );

    cy.get('[role="tabpanel"]').should("have.class", "custom-class");
  });

  it("properly hides inactive panels", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
        <TabPanel value={0}>Panel Content 1</TabPanel>
        <TabPanel value={1}>Panel Content 2</TabPanel>
      </Tabs>,
    );

    // First panel should be visible, second hidden
    cy.get('[role="tabpanel"]').first().should("be.visible");
    cy.get('[role="tabpanel"]').eq(1).should("not.be.visible");
  });
});
