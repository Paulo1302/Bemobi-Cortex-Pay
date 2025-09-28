# Bemobi-Cortex-Pay

Este é o repositório do projeto Cortex Pay, uma aplicação full-stack com um back-end em Python (FastAPI) e um front-end em JavaScript (React).

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

*   **Node.js e npm:** [https://nodejs.org/](https://nodejs.org/)
*   **Python e pip:** [https://www.python.org/](https://www.python.org/)

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento local.

### 1. Back-end (FastAPI)

O servidor do back-end é responsável por toda a lógica de negócio e comunicação com o banco de dados.

1.  **Navegue até a pasta do back-end:**
    ```bash
    cd back-end
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    # Criar o ambiente (substitua 'python' por 'python3' se necessário)
    python -m venv venv

    # Ativar no Linux/macOS
    source venv/bin/activate

    # Ativar no Windows
    .\venv\Scripts\activate
    ```

3.  **Instale as dependências:**
    O arquivo `requirements.txt` foi movido para a raiz do projeto.
    ```bash
    pip install -r ../requirements.txt
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz da pasta `back-end/`. Este arquivo deve conter as configurações sensíveis, como a URL do banco de dados. Consulte a equipe para obter as variáveis necessárias.

5.  **Inicie o servidor:**
    O servidor será iniciado em `http://localhost:8000`.
    ```bash
    uvicorn main:app --reload
    ```

### 2. Front-end (React)

A interface do usuário é construída com React e se comunica com o servidor do back-end.

1.  **Navegue até a pasta do front-end (em um novo terminal):**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```

3.  **Inicie a aplicação React:**
    A aplicação será aberta em seu navegador no endereço `http://localhost:3000`.
    ```bash
    npm start
    ```

## Acesso

*   **API Back-end:** `http://localhost:8000`
*   **Aplicação Front-end:** `http://localhost:3000`
