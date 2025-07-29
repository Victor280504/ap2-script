# 📜 AP2 - Linguagem de Programação Script

Este repositório contém a atividade da **segunda avaliação (AP2)** da disciplina de **Linguagem de Programação Script**. A aplicação foi desenvolvida utilizando **React com Tailwind CSS** no frontend e **Express.js** no backend.

---

## 📁 Estrutura do Repositório
```
ap2-script/

├── package.json # Configuração do projeto e dependências
├── src/ # Código-fonte do frontend (React + Tailwind)
│ ├── api.ts # Funções para consumo da API
│ ├── App.tsx # Componente principal da aplicação
│ └── index.css # Estilos com Tailwind CSS
├── server/ # Pasta para lógica adicional do backend (rotas)
│ └──  server.ts # Entrada do servidor Express
│ └── data/ 
│   └── persistence.json # Persistencia de valores
```
---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/ap2-script.git
cd ap2-script
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Inicie o servidor Express e o frontend React
```bash
npm start
```
Por padrão, o servidor Express será iniciado na porta 3001 e o React na 3000, com o frontend se comunicando com o backend via API.

## 🔌 Endpoint da API
#### O backend expõe o seguinte endpoint:

`POST /api/data`
Recebe os dados enviados pelo frontend e os processa no servidor.

## 🛠️ Tecnologias Utilizadas
Frontend React

TypeScript

Tailwind CSS

Backend
Node.js

Express.js