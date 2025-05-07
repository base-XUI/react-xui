import { TabList } from "./TabList";
import { Tabs } from "../Tabs";
import { Tab } from "../Tab/Tab";

describe("TabList Component", () => {
  it("renders standard tab list correctly", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tablist"]').should("exist");
    cy.get('[role="tab"]').should("have.length", 2);
  });

  it("aligns tabs based on orientation", () => {
    cy.mount(
      <Tabs defaultValue={0} orientation="vertical">
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tablist"]').should("have.class", "flex-col");

    cy.mount(
      <Tabs defaultValue={0} orientation="horizontal">
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tablist"]').should("not.have.class", "flex-col");
  });

  it("renders with custom className", () => {
    cy.mount(
      <Tabs defaultValue={0}>
        <TabList className="custom-class">
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tablist"]').should("have.class", "custom-class");
  });

  it("applies fullWidth styling when tab variant is fullWidth", () => {
    cy.mount(
      <Tabs defaultValue={0} variant="fullWidth">
        <TabList>
          <Tab value={0}>Tab 1</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
      </Tabs>,
    );

    cy.get('[role="tab"]').should("have.class", "flex-1");
  });
});
