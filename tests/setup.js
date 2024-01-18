import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

/*
 * VITEST OFFICIAL DOCS: https://vitest.dev/guide/
 * Common Jest to Vite migration errors: https://blog.stackademic.com/migration-from-jest-to-vitest-is-it-worth-it-react-ts-4ce220f6bfcf
 * Vitest setup and short tutorial - https://victorbruce82.medium.com/vitest-with-react-testing-library-in-react-created-with-vite-3552f0a9a19a
 * https://flexiple.com/react/react-testing-library-cheat-sheet
 * IT - It allows you to specify a clear description of what the test case is checking or asserting
 * EXPECT - It allows you to specify what the expected value is
 * RENDER - It allows you to render the component(note: file must be .jsx extension otherwise we will receive error 'ERROR: Expected expression')
 * screen.debug(); - Allow us to see the rendered component in the command line
 * screen.getByText("Sample Test Title") - This is a query that allows us to search for a specific text in the rendered component
 * expect(screen.getByText("Sample Test Title")).toBeInTheDocument(); - This is an assertion that checks if the text is in the document
 * expect(1 + 1).toBe(2); - This is an assertion that checks if the value of the expression is equal to the expected value
 */

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
