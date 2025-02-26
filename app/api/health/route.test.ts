import { NextResponse } from "next/server";
import { GET } from "./route";

// Mock NextResponse.json
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((body) => ({
      body,
      status: 200,
    })),
  },
}));

describe("Health Check API", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET should return health status information", async () => {
    // Arrange
    const mockJsonMethod = jest.fn().mockReturnValue({});
    jest.spyOn(NextResponse, "json").mockImplementation(mockJsonMethod);

    // Act
    await GET();

    // Assert
    expect(NextResponse.json).toHaveBeenCalled();

    // Extract the first argument passed to the json method
    const healthData = mockJsonMethod.mock.calls[0][0];

    // Verify the health check response contains the expected fields
    expect(healthData).toHaveProperty("status", "ok");
    expect(healthData).toHaveProperty("timestamp");
    expect(healthData).toHaveProperty("uptime");
    expect(healthData).toHaveProperty("version");
    expect(healthData).toHaveProperty("environment");

    // Verify the status code is 200
    expect(mockJsonMethod.mock.calls[0][1]).toEqual({ status: 200 });
  });
});
