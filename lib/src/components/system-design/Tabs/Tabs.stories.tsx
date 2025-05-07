import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Tab } from "./Tab/Tab";
import { TabList } from "./TabList/TabList";
import { TabPanel } from "./TabPanel/TabPanel";

const meta: Meta<typeof Tabs> = {
  title: "System Design/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A complete tabs system with TabList, Tab, and TabPanel components.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Tab variant style",
      options: ["standard", "scrollable", "fullWidth"],
      control: { type: "select" },
      table: { defaultValue: { summary: "standard" } },
    },
    orientation: {
      description: "Tab orientation",
      options: ["horizontal", "vertical"],
      control: { type: "select" },
      table: { defaultValue: { summary: "horizontal" } },
    },
    indicatorColor: {
      description: "Color of the selection indicator",
      options: ["primary", "secondary"],
      control: { type: "select" },
      table: { defaultValue: { summary: "primary" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab value={0}>Tab 1</Tab>
        <Tab value={1}>Tab 2</Tab>
        <Tab value={2}>Tab 3</Tab>
      </TabList>
      <TabPanel value={0}>Content 1</TabPanel>
      <TabPanel value={1}>Content 2</TabPanel>
      <TabPanel value={2}>Content 3</TabPanel>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue={0} orientation="vertical">
      <TabList>
        <Tab value={0}>Tab 1</Tab>
        <Tab value={1}>Tab 2</Tab>
        <Tab value={2}>Tab 3</Tab>
      </TabList>
      <TabPanel value={0}>Content 1</TabPanel>
      <TabPanel value={1}>Content 2</TabPanel>
      <TabPanel value={2}>Content 3</TabPanel>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue={0} variant="fullWidth">
      <TabList>
        <Tab value={0}>Full Width Tab 1</Tab>
        <Tab value={1}>Full Width Tab 2</Tab>
      </TabList>
      <TabPanel value={0}>Content 1</TabPanel>
      <TabPanel value={1}>Content 2</TabPanel>
    </Tabs>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <div className="w-[300px]">
      <Tabs defaultValue={0} variant="scrollable">
        <TabList>
          {[...Array(6)].map((_, i) => (
            <Tab key={i} value={i}>
              Tab {i + 1}
            </Tab>
          ))}
        </TabList>
        {[...Array(6)].map((_, i) => (
          <TabPanel key={i} value={i}>
            Content {i + 1}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  ),
};

export const TabVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue={0}>
        <TabList>
          <Tab value={0}>Standard Tab</Tab>
          <Tab value={1} icon={<span>🏠</span>}>
            With Icon
          </Tab>
          <Tab value={2} disabled>
            Disabled
          </Tab>
        </TabList>
        <TabPanel value={0}>Standard Tab Content</TabPanel>
        <TabPanel value={1}>Icon Tab Content</TabPanel>
        <TabPanel value={2}>Disabled Tab Content</TabPanel>
      </Tabs>
    </div>
  ),
};

export const TabListVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs defaultValue={0}>
        <TabList variant="standard">
          <Tab value={0}>Standard List</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
        <TabPanel value={0}>Standard List Content</TabPanel>
        <TabPanel value={1}>Content 2</TabPanel>
      </Tabs>

      <Tabs defaultValue={0}>
        <TabList variant="contained" className="rounded-lg bg-gray-100 p-2">
          <Tab value={0}>Contained List</Tab>
          <Tab value={1}>Tab 2</Tab>
        </TabList>
        <TabPanel value={0}>Contained List Content</TabPanel>
        <TabPanel value={1}>Content 2</TabPanel>
      </Tabs>
    </div>
  ),
};

export const TabPanelVariants: Story = {
  render: () => (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab value={0}>Default Panel</Tab>
        <Tab value={1}>Boxed Panel</Tab>
        <Tab value={2}>Custom Panel</Tab>
      </TabList>
      <TabPanel value={0}>Default Panel Content</TabPanel>
      <TabPanel value={1} className="mt-2 rounded-lg border p-4">
        Boxed Panel Content
      </TabPanel>
      <TabPanel value={2} className="mt-2 bg-gray-50 p-6 shadow-inner">
        Custom Styled Panel
      </TabPanel>
    </Tabs>
  ),
};

export const InteractiveExample: Story = {
  render: () => (
    <Tabs defaultValue={0}>
      <TabList>
        <Tab value={0} icon={<span>🏠</span>}>
          Home
        </Tab>
        <Tab value={1} icon={<span>👤</span>}>
          Profile
        </Tab>
        <Tab value={2} icon={<span>⚙️</span>}>
          Settings
        </Tab>
      </TabList>
      <TabPanel value={0}>
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-bold">Welcome Home</h3>
          <p>This is an interactive example with rich content.</p>
        </div>
      </TabPanel>
      <TabPanel value={1}>
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-bold">User Profile</h3>
          <p>Profile content with custom styling.</p>
        </div>
      </TabPanel>
      <TabPanel value={2}>
        <div className="space-y-2 p-4">
          <h3 className="text-lg font-bold">Settings</h3>
          <p>Settings panel with comprehensive example.</p>
        </div>
      </TabPanel>
    </Tabs>
  ),
};
