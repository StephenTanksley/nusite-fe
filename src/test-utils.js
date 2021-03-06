import React from "react";
import { render } from "@testing-library/react";

import { ThemeContext } from "./context/contexts";

function MutationObserver(callback) {
   this.observe = jest.fn();
   this.disconnect = jest.fn();
   this.takeRecords = jest.fn();
}
global.MutationObserver = jest.fn(MutationObserver);

const mockSpies = {
   setDarkMode: jest.fn(),
};

const AllTheProviders = ({ children }) => (
   <ThemeContext.Provider
      value={{ darkMode: false, setDarkMode: mockSpies.setDarkMode }}
   >
      {children}
   </ThemeContext.Provider>
);

const customRender = (ui, options) => {
   return {
      ...render(ui, { wrapper: AllTheProviders, ...options }),
      mockSpies,
   };
};

const testLinkArray = (linkArray, expected_length, expected_refs) => {
   expect(linkArray.length).toBe(expected_length);
   linkArray.forEach(element => {
      expect(expected_refs).toContain(element.getAttribute("href"));
   });
};

export * from "@testing-library/react";
export { customRender as render, testLinkArray };
