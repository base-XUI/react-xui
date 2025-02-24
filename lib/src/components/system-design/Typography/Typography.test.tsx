import { describe, it, expect } from "vitest";
import { render, screen } from "@tests/TestUtils";
import { Typography } from "./Typography";
import { TYPOGRAPHY_VARIANTS } from "./variants";
import "@testing-library/jest-dom";

describe("Typography Component", () => {
  it("renders correctly with default props", () => {
    render(<Typography>Default Text</Typography>);
    expect(screen.getByText("Default Text")).toBeInTheDocument();
  });

  it("renders different variants", () => {
    const variants = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "body1",
      "body2",
      "body3",
      "subtitle1",
      "subtitle2",
      "caption",
    ] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <Typography variant={variant}>{variant} text</Typography>,
      );
      const expectedClasses = TYPOGRAPHY_VARIANTS[variant].split(" ");
      expectedClasses.forEach((className) => {
        expect(container.firstChild).toHaveClass(className);
      });
    });
  });

  it("applies different colors", () => {
    const colors = ["primary", "secondary", "destructive", "muted"] as const;

    colors.forEach((color) => {
      const { container } = render(
        <Typography color={color}>{color} text</Typography>,
      );
      expect(container.firstChild).toHaveClass(`text-${color}`);
    });
  });

  it("applies text alignment", () => {
    const alignments = ["start", "center", "end"] as const;

    alignments.forEach((align) => {
      const { container } = render(
        <Typography align={align}>{align} aligned text</Typography>,
      );
      expect(container.firstChild).toHaveClass(`text-${align}`);
    });
  });

  it("handles noWrap prop", () => {
    const { container } = render(<Typography noWrap>No wrap text</Typography>);
    expect(container.firstChild).toHaveClass("whitespace-nowrap");
  });

  it("handles gutterBottom prop", () => {
    const { container } = render(
      <Typography gutterBottom>Text with bottom margin</Typography>,
    );
    expect(container.firstChild).toHaveClass("mb-2");
  });

  it("handles paragraph prop", () => {
    const { container } = render(
      <Typography paragraph>Paragraph text</Typography>,
    );
    expect(container.firstChild).toHaveClass("mb-4");
  });

  it("renders with custom component", () => {
    render(<Typography component="span">Custom span</Typography>);
    expect(screen.getByText("Custom span").tagName.toLowerCase()).toBe("span");
  });

  it("applies custom font family", () => {
    const { container } = render(
      <Typography fontFamily="secondary">Custom font</Typography>,
    );
    expect(container.firstChild).toHaveClass("font-secondary");
  });

  it("handles inherit prop", () => {
    const { container: inheritContainer } = render(
      <Typography inherit>Inherit styles</Typography>,
    );
    const { container: normalContainer } = render(
      <Typography>Normal styles</Typography>,
    );

    const bodyClasses = TYPOGRAPHY_VARIANTS.body1.split(" ");
    expect(inheritContainer.firstChild).not.toHaveClass(bodyClasses[0]);
    bodyClasses.forEach((className) => {
      expect(normalContainer.firstChild).toHaveClass(className);
    });
  });
});
