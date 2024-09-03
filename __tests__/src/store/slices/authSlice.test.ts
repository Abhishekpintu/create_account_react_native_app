import authReducer, { login, logout } from '../../../../src/store/slices/authSlice'; // Adjust the path as needed

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle login', () => {
    const user = { fullName: 'Test user', emailId: 'test.user@example.com' };
    const nextState = authReducer(initialState, login(user));

    // Check if the state is updated correctly
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual(user);
  });

  test('should handle logout', () => {
    const userState = {
      isAuthenticated: true,
      user: { fullName: 'Test user', emailId: 'test.user@example.com'  },
    };
    const nextState = authReducer(userState, logout());

    // Check if the state is reset to the initial state
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.user).toBeNull();
  });
});
