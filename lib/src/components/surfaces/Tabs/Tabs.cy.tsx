import { Tabs } from "./Tabs";
import { Tab } from "./Tab/Tab";
import { TabList } from "./TabList/TabList";
import { TabPanel } from "./TabPanel/TabPanel";

describe("Tabs Components", () => {
  // Main Tabs component tests
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
      cy.get('[role="tabpanel"]')
        .should("exist")
        .and("contain.text", "ITEM ONE");
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

  // TabList component tests
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
  });

  // Tab component tests
  describe("Tab Component", () => {
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
      cy.get('[role="tab"]')
        .eq(1)
        .should("have.attr", "aria-selected", "false");

      cy.get('[role="tab"]').eq(1).click();
      cy.get('[role="tab"]')
        .eq(0)
        .should("have.attr", "aria-selected", "false");
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

  // TabPanel component tests
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
});
