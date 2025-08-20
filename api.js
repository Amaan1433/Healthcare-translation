import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(
            `${api.defaults.baseURL}/api/auth/refresh`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${refreshToken}`,
              },
            }
          );
          
          const { access_token } = response.data;
          
          // Update stored token
          localStorage.setItem('token', access_token);
          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          
          // Retry original request
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    
    // Don't show toast for 401 errors (handled above)
    if (error.response?.status !== 401) {
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

// Translation API
export const translationAPI = {
  // Translate text
  translate: (data) => api.post('/api/translation/translate', data),
  
  // Get session translations
  getSession: (sessionId) => api.get(`/api/translation/session/${sessionId}`),
  
  // Delete session
  deleteSession: (sessionId) => api.delete(`/api/translation/session/${sessionId}`),
  
  // Get supported languages
  getLanguages: () => api.get('/api/translation/languages'),
  
  // Get medical contexts
  getMedicalContexts: () => api.get('/api/translation/medical-contexts'),
  
  // Health check
  health: () => api.get('/api/translation/health'),
};

// Speech API
export const speechAPI = {
  // Speech to text
  speechToText: (audioFile, language = 'en-US') => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('language', language);
    
    return api.post('/api/speech/speech-to-text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Text to speech
  textToSpeech: (data) => api.post('/api/speech/text-to-speech', data),
  
  // Get speech languages
  getSpeechLanguages: () => api.get('/api/speech/languages/speech'),
  
  // Get TTS languages
  getTTSLanguages: () => api.get('/api/speech/languages/tts'),
  
  // Health check
  health: () => api.get('/api/speech/health'),
};

// Auth API
export const authAPI = {
  // Register
  register: (data) => api.post('/api/auth/register', data),
  
  // Login
  login: (data) => api.post('/api/auth/login', data),
  
  // Get profile
  getProfile: () => api.get('/api/auth/profile'),
  
  // Update profile
  updateProfile: (data) => api.put('/api/auth/profile', data),
  
  // Change password
  changePassword: (data) => api.post('/api/auth/change-password', data),
  
  // Refresh token
  refreshToken: () => api.post('/api/auth/refresh'),
  
  // Health check
  health: () => api.get('/api/auth/health'),
};

// Utility functions
export const apiUtils = {
  // Handle API errors
  handleError: (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    toast.error(message);
    return message;
  },
  
  // Handle API success
  handleSuccess: (message = 'Operation successful') => {
    toast.success(message);
  },
  
  // Check if response is successful
  isSuccess: (response) => {
    return response && response.status >= 200 && response.status < 300;
  },
  
  // Get error message from response
  getErrorMessage: (error) => {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },
  
  // Create form data from object
  createFormData: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  },
  
  // Download file from blob
  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
  
  // Convert base64 to blob
  base64ToBlob: (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  },
  
  // Play audio from base64
  playAudio: (base64Audio) => {
    return new Promise((resolve, reject) => {
      try {
        const audioBlob = apiUtils.base64ToBlob(base64Audio, 'audio/mp3');
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        
        audio.onerror = (error) => {
          URL.revokeObjectURL(audioUrl);
          reject(error);
        };
        
        audio.play();
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default api;
