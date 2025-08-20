import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Set token in API headers
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Get user profile
          const response = await api.get('/api/auth/profile');
          dispatch({ type: AUTH_ACTIONS.SET_USER, payload: response.data.user });
        } catch (error) {
          console.error('Auth check failed:', error);
          // Token is invalid, remove it
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await api.post('/api/auth/login', credentials);
      const { user, access_token, refresh_token } = response.data;

      // Store tokens
      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      
      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
      dispatch({ type: AUTH_ACTIONS.SET_TOKEN, payload: access_token });

      toast.success('Login successful!');
      navigate('/translate');
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await api.post('/api/auth/register', userData);
      const { user, access_token, refresh_token } = response.data;

      // Store tokens
      localStorage.setItem('token', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      
      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: user });
      dispatch({ type: AUTH_ACTIONS.SET_TOKEN, payload: access_token });

      toast.success('Registration successful!');
      navigate('/translate');
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    // Remove tokens
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Remove token from API headers
    delete api.defaults.headers.common['Authorization'];
    
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await api.put('/api/auth/profile', profileData);
      const updatedUser = response.data.user;

      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: updatedUser });
      toast.success('Profile updated successfully!');
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Profile update failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      await api.post('/api/auth/change-password', passwordData);
      toast.success('Password changed successfully!');
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Password change failed';
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/api/auth/refresh', {}, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      const { access_token } = response.data;
      
      // Update stored token
      localStorage.setItem('token', access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      
      dispatch({ type: AUTH_ACTIONS.SET_TOKEN, payload: access_token });
      
      return access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshToken,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
