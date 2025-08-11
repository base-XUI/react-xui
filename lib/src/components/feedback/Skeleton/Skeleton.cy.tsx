import { Skeleton } from "./Skeleton";
import { Typography } from "@/components/system-design/Typography";

describe("Skeleton Component", () => {
  // Test default rendering
  it("renders with default props", () => {
    cy.mount(<Skeleton />);
    cy.get("span").should("have.class", "animate-pulse");
  });

  // Test variants
  it("renders text variant correctly", () => {
    cy.mount(<Skeleton variant="text" />);
    cy.get("span").should("have.class", "h-4");
    cy.get("span").should("have.class", "w-full");
  });

  it("renders circular variant correctly", () => {
    cy.mount(<Skeleton variant="circular" width={40} height={40} />);
    cy.get("span").should("have.class", "rounded-full");
    cy.get("span").should("have.css", "width", "40px");
    cy.get("span").should("have.css", "height", "40px");
  });

  it("renders rectangular variant correctly", () => {
    cy.mount(<Skeleton variant="rectangular" width={100} height={50} />);
    cy.get("span").should("have.class", "rounded-none");
    cy.get("span").should("have.css", "width", "100px");
    cy.get("span").should("have.css", "height", "50px");
  });

  it("renders rounded variant correctly", () => {
    cy.mount(<Skeleton variant="rounded" width={100} height={50} />);
    cy.get("span").should("have.class", "rounded-md");
    cy.get("span").should("have.css", "width", "100px");
    cy.get("span").should("have.css", "height", "50px");
  });

  // Test animations
  it("renders with pulse animation by default", () => {
    cy.mount(<Skeleton />);
    cy.get("span").should("have.class", "animate-pulse");
  });

  it("renders with wave animation when specified", () => {
    cy.mount(<Skeleton animation="wave" />);
    cy.get("span").should("have.class", "before:animate-[wave_2s_infinite]");
  });

  it("renders without animation when disabled", () => {
    cy.mount(<Skeleton animation={false} />);
    cy.get("span").should("not.have.class", "animate-pulse");
    cy.get("span").should("not.have.class", "before:animate-[wave_2s_infinite]");
  });

  // Test dimensions
  it("applies custom width and height", () => {
    cy.mount(<Skeleton width={200} height={100} />);
    cy.get("span").should("have.css", "width", "200px");
    cy.get("span").should("have.css", "height", "100px");
  });

  it("infers dimensions from children", () => {
    cy.mount(
      <Skeleton>
        <div style={{ width: "150px", height: "75px" }} className="invisible" />
      </Skeleton>
    );
    cy.get("div.invisible").should("exist");
  });

  // Test custom component
  it("renders with custom component", () => {
    cy.mount(<Skeleton component="div" />);
    cy.get("div").should("exist");
  });

  // Test with Typography
  it("works with Typography component", () => {
    cy.mount(
      <Typography variant="h1">
        <Skeleton />
      </Typography>
    );
    cy.get("h1").should("exist");
    cy.get("h1 span").should("exist");
  });

  // Test custom class name
  it("applies custom className", () => {
    cy.mount(<Skeleton className="custom-class" />);
    cy.get("span").should("have.class", "custom-class");
  });
});