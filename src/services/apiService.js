import axios from 'axios';

// Mock API base URL (replace with actual API when ready)
const API_BASE_URL = 'https://api.gbv-app.example.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock authentication endpoints
export const authApi = {
  login: async (email, password) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: '1',
              email,
              name: email.split('@')[0],
              phone: '+255700000000',
              createdAt: new Date(),
            },
            token: 'mock_token_' + Math.random(),
          },
        });
      }, 500);
    });
  },

  register: async (email, password, name) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: '1',
              email,
              name,
              phone: '+255700000000',
              createdAt: new Date(),
            },
            token: 'mock_token_' + Math.random(),
          },
        });
      }, 500);
    });
  },

  loginWithPhone: async (phone, password) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: '1',
              phone,
              name: 'User',
              email: 'user@example.com',
              createdAt: new Date(),
            },
            token: 'mock_token_' + Math.random(),
          },
        });
      }, 500);
    });
  },
};

// Mock incident endpoints
export const incidentApi = {
  submitIncident: async (incident) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: Math.random(),
            ...incident,
            status: 'submitted',
            submittedAt: new Date(),
          },
        });
      }, 1000);
    });
  },

  getIncidents: async (userId) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              userId,
              title: 'Test Incident',
              status: 'pending',
            },
          ],
        });
      }, 500);
    });
  },
};

// Mock support endpoints
export const supportApi = {
  getSupportServices: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              name: 'Support Service 1',
              phone: '+255717905138',
              type: 'NGO',
            },
          ],
        });
      }, 500);
    });
  },

  getChatResponse: async (message) => {
    // Mock AI response
    const responses = [
      'I understand. How can I help you further?',
      'That sounds difficult. Have you considered reaching out to a local organization?',
      'Thank you for sharing. Your safety is important to us.',
      'I hear you. Would you like information about your local support services?',
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            response: responses[Math.floor(Math.random() * responses.length)],
          },
        });
      }, 800);
    });
  },
};

// Mock story endpoints
export const storyApi = {
  getStories: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              title: 'My Journey',
              author: 'Anonymous',
              content: 'This is my story...',
            },
          ],
        });
      }, 500);
    });
  },

  submitStory: async (story) => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: Math.random(),
            ...story,
            createdAt: new Date(),
          },
        });
      }, 1000);
    });
  },
};

export default api;
