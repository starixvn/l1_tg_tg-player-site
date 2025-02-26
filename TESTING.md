# Testing Guide for Player Site

This document provides an overview of the testing approach for the Player Site application.

## Overview

The testing strategy follows these principles:

1. **Unit Testing**: Testing individual components, hooks, and utilities in isolation
2. **AAA Pattern**: Arrange, Act, Assert pattern for all tests
3. **Clean Code**: Readable, maintainable test code
4. **One Test, One Business Rule**: Each test focuses on a single behavior or rule

## Running Tests

To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Test Structure

Tests are organized alongside the code they test:

- Component tests: `app/ui/components/[component-name]/[component-name].test.tsx`
- Hook tests: `app/lib/hooks/[hook-name].test.tsx`
- Context tests: `app/lib/contexts/[context-name].test.tsx`
- API route tests: `app/api/[route-name]/route.test.ts`
- Page tests: `app/[page-name].test.tsx`

## Testing Components

Component tests focus on:

1. Rendering with correct content
2. User interactions (clicks, form inputs)
3. Proper styling and CSS classes
4. Integration with hooks and contexts

Example:

```typescript
// DepositButton test
test('should navigate to deposit page when clicked', () => {
  // Arrange
  render(<DepositButton />);
  
  // Act
  fireEvent.click(screen.getByRole('button'));
  
  // Assert
  expect(mockPush).toHaveBeenCalledWith('/pages/deposit');
});
```

## Testing Hooks and Contexts

Hook and context tests focus on:

1. Initial state
2. State changes
3. Error handling
4. Integration with other hooks/contexts

Example:

```typescript
// useResources test
test('should return English resources by default', () => {
  // Arrange & Act
  const { result } = renderHook(() => useResources());
  
  // Assert
  expect(result.current).toEqual(resources.en);
});
```

## Testing API Routes

API route tests focus on:

1. Successful responses
2. Error handling
3. Input validation
4. Integration with external services

Example:

```typescript
// Users API test
test('should return users data when API call is successful', async () => {
  // Arrange
  const mockUsers = [/* ... */];
  const mockApiResponse = { status: 'success', data: mockUsers };
  (serverApi.get as jest.Mock).mockResolvedValue(mockApiResponse);
  
  // Act
  await GET();
  
  // Assert
  expect(serverApi.get).toHaveBeenCalledWith('/api/users', expect.any(Object));
  expect(mockJsonMethod).toHaveBeenCalledWith({ users: mockUsers });
});
```

## Mocking

The tests use Jest's mocking capabilities to isolate the code being tested:

1. **Component Mocks**: Mock child components to focus on the component under test
2. **Hook Mocks**: Mock hooks to control their behavior in tests
3. **API Mocks**: Mock API calls to test different scenarios
4. **Router Mocks**: Mock Next.js router for navigation testing

Example:

```typescript
// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Set up mock implementation
(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
```

## Best Practices

1. **Use AAA Pattern**: Arrange, Act, Assert for clear test structure
2. **One Assertion Per Test**: Focus each test on a single behavior
3. **Descriptive Test Names**: Use clear, descriptive names that explain the behavior being tested
4. **Clean Up After Tests**: Reset mocks and clean up after each test
5. **Test Edge Cases**: Include tests for error conditions and edge cases
6. **Avoid Test Interdependence**: Each test should be independent of others

## Test Coverage

Aim for high test coverage, especially for:

1. Business logic
2. User interactions
3. Error handling
4. API integrations

## Continuous Integration

Tests are run automatically in the CI pipeline to ensure code quality. 