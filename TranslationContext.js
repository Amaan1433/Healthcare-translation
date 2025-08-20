import React, { createContext, useContext, useReducer } from 'react';

// Action types
const TRANSLATION_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_TRANSLATION: 'SET_TRANSLATION',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  currentTranslation: null,
  history: [],
  loading: false,
  error: null
};

// Reducer
const translationReducer = (state, action) => {
  switch (action.type) {
    case TRANSLATION_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case TRANSLATION_ACTIONS.SET_TRANSLATION:
      return {
        ...state,
        currentTranslation: action.payload,
        loading: false,
        error: null
      };
    
    case TRANSLATION_ACTIONS.ADD_TO_HISTORY:
      return {
        ...state,
        history: [action.payload, ...state.history]
      };
    
    case TRANSLATION_ACTIONS.CLEAR_HISTORY:
      return {
        ...state,
        history: []
      };
    
    case TRANSLATION_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case TRANSLATION_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const TranslationContext = createContext();

// Provider component
export const TranslationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(translationReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: TRANSLATION_ACTIONS.SET_LOADING, payload: loading });
  };

  const setTranslation = (translation) => {
    dispatch({ type: TRANSLATION_ACTIONS.SET_TRANSLATION, payload: translation });
  };

  const addToHistory = (translation) => {
    dispatch({ type: TRANSLATION_ACTIONS.ADD_TO_HISTORY, payload: translation });
  };

  const clearHistory = () => {
    dispatch({ type: TRANSLATION_ACTIONS.CLEAR_HISTORY });
  };

  const setError = (error) => {
    dispatch({ type: TRANSLATION_ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: TRANSLATION_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // State
    currentTranslation: state.currentTranslation,
    history: state.history,
    loading: state.loading,
    error: state.error,
    
    // Actions
    setLoading,
    setTranslation,
    addToHistory,
    clearHistory,
    setError,
    clearError
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  
  return context;
};
