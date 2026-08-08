import { server } from "@/mocks/server";
import { wishlistHandlers } from "@/test/wishlist-handlers";
import "@testing-library/jest-dom/vitest";
import { toHaveNoViolations } from "vitest-axe/matchers";

expect.extend({ toHaveNoViolations });

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => server.use(...wishlistHandlers()));

afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});

afterAll(() => server.close());
