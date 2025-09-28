// --- CAMADA DE SERVIÇO DE API ---
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Função centralizada para tratar as respostas e os erros da API
const handleResponse = res => {
    if (!res.ok) {
        // Se a resposta não for bem-sucedida (ex: erro 404, 500), lança um erro
        throw new Error('A resposta da rede não foi OK');
    }
    return res.json();
};

const apiService = {
  // Funções CRUD para Utilizadores (mantidas como no seu ficheiro)
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

  // Funções de Simulação (CORRIGIDAS)
  getUser: (userId) => fetch(`${API_BASE_URL}/users/${userId}`).then(handleResponse),
  getEventLog: () => fetch(`${API_BASE_URL}/events/log`).then(handleResponse),
  
  // CORREÇÃO: Adicionado o .then(handleResponse) para garantir o tratamento de erros
  analyzeRisk: (userId) => fetch(`${API_BASE_URL}/actions/analyze-risk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }).then(handleResponse),

  // CORREÇÃO: Adicionado o .then(handleResponse) para garantir o tratamento de erros
  analyzeSecurity: (userId) => fetch(`${API_BASE_URL}/actions/analyze-security`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  }).then(handleResponse),
};

export default apiService;