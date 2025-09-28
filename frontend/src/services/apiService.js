// --- CAMADA DE SERVIÇO DE API ---
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Função centralizada para tratar as respostas e os erros da API
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'A resposta da rede não foi OK');
  }
  return res.json();
};

const apiService = {
  // Funções CRUD para Utilizadores
  getUsers: () => fetch(`${API_BASE_URL}/users`).then(handleResponse),
  createUser: (userData) => fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse),
  updateUser: (userId, userData) => fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  }).then(handleResponse),
  deleteUser: (userId) => fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  }).then(handleResponse),

  // Funções de Simulação
  getUser: (userId) => fetch(`${API_BASE_URL}/users/${userId}`).then(handleResponse),
  getEventLog: () => fetch(`${API_BASE_URL}/events/log`).then(handleResponse),
  
  analyzeRisk: (userId) => fetch(`${API_BASE_URL}/actions/analyze-risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }).then(handleResponse),

  analyzeSecurity: (userId) => fetch(`${API_BASE_URL}/actions/analyze-security`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }).then(handleResponse),

  // 🔑 Função de Login com persistência de token
  login: async (credentials) => {
    const data = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(handleResponse);

    // Se a API devolver token, salvar no localStorage
    if (data.token || data.access_token) {
      localStorage.setItem('authToken', data.token || data.access_token);
    }

    return data;
  },

  // 🔒 Função auxiliar para obter o token salvo
  getToken: () => localStorage.getItem('authToken'),

  // 🚪 Função de logout
  logout: () => {
    localStorage.removeItem('authToken');
  },
};

export default apiService;