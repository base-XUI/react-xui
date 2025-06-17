import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";
import { CardContent } from "./CardContent";
import { CardHeader } from "./CardHeader";
import { CardActions } from "./CardActions";
import { CardMedia } from "./CardMedia";
import { Typography } from "../Typography";
import { Button } from "@/components/inputs/Button";
import { CardActionArea } from "./CardActionArea";
import { cn } from "@/utils/cn";

const meta: Meta<typeof Card> = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible, reusable card component with polymorphic support and composable sub-components.",
      },
    },
    controls: {
      expanded: true,
    },
  },

  argTypes: {
    component: {
      control: { type: "select" },
      options: ["div", "article", "section", "aside"],
      description: "The HTML element or React component to render",
    },
    variant: {
      control: "radio",
      options: ["outlined", "filled"],
      description:
        'Visual style variant of the card - "outlined" shows a border with transparent background, "filled" shows a solid background',
    },
    square: {
      control: "boolean",
      description:
        "When true, removes rounded corners for a sharp, square appearance",
    },
    className: {
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader title="Bacis Card" />
      <CardContent>
        <p>This card demonstrates all available sections working together.</p>
        <p className="mt-2 text-sm text-gray-600">
          Header with title and action, content area, and footer with buttons.
        </p>
      </CardContent>
      <CardActions>
        <Button>Save</Button>
        <Button variant="outlined">Cancel</Button>
      </CardActions>
    </Card>
  ),
};

export const OutlinedCard: Story = {
  render: () => (
    <Card variant="outlined" className="w-96">
      <CardHeader title="Card Title" />
      <CardContent>
        <p>This is an example of outlined card.</p>
      </CardContent>

      <CardActions>
        <Button>Edit</Button>
        <Button variant="outlined">Cancel</Button>
      </CardActions>
    </Card>
  ),
};

export const ComplexInteraction: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        avatar={
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-600 text-xl text-white">
            R
          </div>
        }
        action={<Button variant="text">View</Button>}
      />
      <CardMedia
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
        alt="Mountain landscape"
        aspectRatio="16/9"
      />
      <CardContent>
        <Typography variant="body3" className="text-muted-foreground leading-5">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>

      <CardActions>
        <Button>Save</Button>
        <Button variant="outlined">Cancel</Button>
      </CardActions>
    </Card>
  ),
};

export const Media: Story = {
  render: () => (
    <Card className="w-96">
      <CardMedia
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
        alt="Mountain landscape"
        aspectRatio="16/9"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body3" className="text-muted-foreground leading-5">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>

      <CardActions className="flex gap-2">
        <Button variant="text">Share</Button>
        <Button variant="text">Learn More</Button>
      </CardActions>
    </Card>
  ),
};

const handleCardClick = () => {
  console.log("Hello World");
};
export const PrimaryAction: Story = {
  render: () => (
    <Card className="w-96">
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop"
          alt="Beautiful landscape"
          aspectRatio="16/9"
        />
        <CardHeader
          title="Beautiful Landscape"
          subheader="Nature Photography"
        />
        <CardContent>
          <p>Click anywhere to log "Hello World" in console.</p>
        </CardContent>
      </CardActionArea>
    </Card>
  ),
};

const cards = [
  {
    id: 1,
    title: "Plants",
    description: "Plants are essential for all life.",
  },
  {
    id: 2,
    title: "Animals",
    description: "Animals are a part of nature.",
  },
  {
    id: 3,
    title: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
];

function ActiveCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 20,
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            className={cn("h-full", {
              "bg-muted": selectedCard === index,
            })}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
export const ActiveStateStyle: Story = {
  parameters: {
    docs: {
      source: {
        code: `
const cards = [
  {
    id: 1,
    title: "Plants",
    description: "Plants are essential for all life.",
  },
  {
    id: 2,
    title: "Animals",
    description: "Animals are a part of nature.",
  },
  {
    id: 3,
    title: "Humans",
    description: "Humans depend on plants and animals for survival.",
  },
];

function ActiveCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 20,
      }}
    >
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            className={cn("h-full", {
              "bg-muted": selectedCard === index,
            })}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2">{card.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}`,
      },
    },
  },
  render: () => <ActiveCard />,
};
