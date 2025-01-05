import "@testing-library/jest-dom";

import { server } from "./mocks/server";

jest.mock("@/core/infrastructure/constants", () => ({
  BASE_URL: "",
}));

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

// mock for Chakra UI styled-system use of structuredClone API
// https://stackoverflow.com/questions/73607410/referenceerror-structuredclone-is-not-defined-using-jest-with-nodejs-typesc
global.structuredClone = (val) => {
  if (!val) {
    return "";
  }

  return JSON.parse(JSON.stringify(val));
};

// mock methods which are not implemented in JSDOM
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// mock required for @zag-js popper component
// https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
