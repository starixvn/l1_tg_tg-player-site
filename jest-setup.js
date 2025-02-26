require("@testing-library/jest-dom");

// Mock fetch for all tests
global.fetch = jest.fn();

// Mock AbortController
global.AbortController = jest.fn().mockImplementation(() => ({
  signal: "mock-signal",
  abort: jest.fn(),
}));

// Mock setTimeout
jest.useFakeTimers();
