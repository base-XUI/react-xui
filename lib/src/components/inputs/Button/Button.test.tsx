import { describe, it, expect } from "vitest";
import { render, screen } from "@tests/TestUtils";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Default Button</Button>);
    expect(
      screen.getByRole("button", { name: /default button/i }),
    ).toBeInTheDocument();
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="contained">Contained</Button>);
    expect(
      screen.getByRole("button", { name: /contained/i }),
    ).toBeInTheDocument();

    rerender(<Button variant="outlined">Outlined</Button>);
    expect(
      screen.getByRole("button", { name: /outlined/i }),
    ).toBeInTheDocument();

    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByRole("button", { name: /text/i })).toBeInTheDocument();
  });

  it("renders with different colors", () => {
    const { rerender } = render(<Button color="primary">Primary</Button>);
    expect(
      screen.getByRole("button", { name: /primary/i }),
    ).toBeInTheDocument();

    rerender(<Button color="success">Success</Button>);
    expect(
      screen.getByRole("button", { name: /success/i }),
    ).toBeInTheDocument();

    rerender(<Button color="error">Error</Button>);
    expect(screen.getByRole("button", { name: /error/i })).toBeInTheDocument();
  });

  // it("renders with loading state", () => {
  //   const { rerender } = render(<Button loading>Loading</Button>);
  //   const button = screen.getByRole("button");
  //   expect(button).toBeDisabled();
  //   expect(screen.getByText("⚪")).toBeInTheDocument();

  //   // Verify disabled state separately
  //   rerender(<Button disabled>Disabled</Button>);
  //   expect(screen.getByRole("button")).toBeDisabled();
  // });

  // it("handles disabled state properly", () => {
  //   const { rerender } = render(<Button disabled>Disabled Button</Button>);
  //   const button = screen.getByRole("button", { name: /disabled button/i });
  //   expect(button).toBeDisabled();
  //   expect(button).toHaveAttribute("aria-disabled", "true");

  //   // Test disabled state with custom component
  //   rerender(
  //     <Button component="span" disabled>
  //       Disabled Span Button
  //     </Button>,
  //   );
  //   const spanButton = screen.getByRole("button", {
  //     name: /disabled span button/i,
  //   });
  //   expect(spanButton).toHaveAttribute("aria-disabled", "true");
  // });

  // it("is disabled when loading", () => {
  //   render(<Button loading>Loading Button</Button>);
  //   const button = screen.getByRole("button");
  //   expect(button).toBeDisabled();
  //   expect(button).toHaveAttribute("aria-disabled", "true");
  // });

  it("renders with icons", () => {
    render(
      <Button startIcon="👈" endIcon="👉">
        With Icons
      </Button>,
    );
    expect(screen.getByText("👈")).toBeInTheDocument();
    expect(screen.getByText("👉")).toBeInTheDocument();
  });
});
