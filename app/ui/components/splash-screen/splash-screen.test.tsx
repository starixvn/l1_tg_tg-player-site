import React from "react";
import { render } from "@testing-library/react";
import SplashScreen from "./splash-screen";

describe("SplashScreen", () => {
    // Mock the timing functions
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("should render without crashing", () => {
        // Arrange
        const { container } = render(<SplashScreen />);

        // Assert
        expect(container.firstChild).toHaveClass("splashScreen");
    });
});
