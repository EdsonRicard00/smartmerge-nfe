# SmartMerge NF-e 🚀

> Uma aplicação full-stack de alto padrão projetada para otimizar e automatizar fluxos fiscais e de logística, unificando notas fiscais eletrônicas (NF-e) em formato XML com seus respectivos anexos em PDF de forma inteligente, rápida e segura.

---

## 💎 Diferenciais do Projeto

*   **User Experience (UX) Premium**: Interface rica construída sob o conceito de *Glassmorphism* (efeito de vidro translúcido), oferecendo um ambiente visual moderno, minimalista e altamente intuitivo para o colaborador.
*   **Performance Exponencial**: Arquitetura assíncrona capaz de processar múltiplos buffers de documentos e realizar o parse de estruturas XML complexas em milissegundos.
*   **Decisões Arquiteturais Modernas**: Implementação utilizando as versões mais recentes das tecnologias de mercado, garantindo um código limpo, componentizado e de fácil manutenção.

---

## 🛠️ Tecnologias e Ecossistema

### Frontend (Interface do Usuário)
*   **React** & **Vite**: Configuração de build ultra-rápida e componentização reativa redefinida.
*   **Tailwind CSS (v4)** & **PostCSS**: Estilização de última geração utilizando arquitetura baseada em diretivas de folha de estilo diretas (`@import "tailwindcss"`).
*   **Lucide React**: Biblioteca de vetores e ícones minimalistas de alta fidelidade visual.

### Backend (Motor de Processamento)
*   **Node.js** & **Express**: API REST de alta performance para recepção de arquivos via multipart form data (`upload.array`).
*   **pdf-lib**: Manipulação binária profunda de documentos para cópia estruturada de páginas e merge sem perda de metadados.
*   **xml2js**: Parser de alto desempenho para tratamento, leitura e extração das chaves de acesso estruturadas da NF-e (`infNfe`).

---

## ⚙️ Arquitetura de Pastas

```text
smartmerge-nfe/
├── backend/            # API REST e Motor de Unificação (Node.js/Express)
│   ├── server.js
│   └── package.json
└── frontend/           # Interface Visual Glassmorphism (React/Tailwind v4)
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css   # Arquitetura de Estilos Tailwind v4
    ├── postcss.config.js
    └── package.json
