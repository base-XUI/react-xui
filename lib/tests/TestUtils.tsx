import React from "react";

import { BrowserRouter } from "react-router-dom";

import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { ComponentType, PropsWithChildren, ReactElement } from "react";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

function customRender(
  ui: ReactElement,
  { route = "/", ...renderOptions }: CustomRenderOptions = {},
) {
  window.history.pushState({}, "Test page", route);

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return {
    ...render(ui, { wrapper: Wrapper as ComponentType, ...renderOptions }),
    user: userEvent.setup(),
  };
}

export {
  render as rtlRender,
  screen,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
export { customRender as render };
export { userEvent };
