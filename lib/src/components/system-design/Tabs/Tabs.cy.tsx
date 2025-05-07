import { Tabs } from "./Tabs";
import { Tab } from "./Tab/Tab";
import { TabList } from "./TabList/TabList";
import { TabPanel } from "./TabPanel/TabPanel";

describe("Tabs Component", () => {
  it("renders basic tabs correctly", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>ITEM ONE</Tab>
          <Tab value={1}>ITEM TWO</Tab>
        </TabList>
        <TabPanel value={0}>ITEM ONE</TabPanel>
        <TabPanel value={1}>ITEM TWO</TabPanel>
      </Tabs>,
    );

    cy.get('[role="tablist"]').should("exist");
    cy.get('[role="tab"]').should("have.length", 2);
    cy.get('[role="tabpanel"]').should("exist").and("contain.text", "ITEM ONE");
  });

  it("changes tab content when clicked", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>ITEM ONE</Tab>
          <Tab value={1}>ITEM TWO</Tab>
        </TabList>
        <TabPanel value={0}>Content One</TabPanel>
        <TabPanel value={1}>Content Two</TabPanel>
      </Tabs>,
    );

    cy.get('[role="tab"]').eq(1).click();
    cy.get('[role="tabpanel"]').should("contain.text", "Content Two");
  });

  it("renders with different orientations", () => {
    cy.mount(
      <Tabs defaultValue={0} orientation="vertical">
        <TabList>
          <Tab value={0}>ITEM ONE</Tab>
          <Tab value={1}>ITEM TWO</Tab>
        </TabList>
        <TabPanel value={0}>Content One</TabPanel>
        <TabPanel value={1}>Content Two</TabPanel>
      </Tabs>,
    );

    cy.get('[role="tablist"]').should("have.class", "flex-col");
  });

  it("renders with different variants", () => {
    cy.mount(
      <Tabs defaultValue={0} variant="fullWidth">
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
        <TabPanel value={0}>Content 1</TabPanel>
        <TabPanel value={1}>Content 2</TabPanel>
      </Tabs>,
    );

    cy.get('[role="tab"]').should("have.class", "flex-1");
  });
});
