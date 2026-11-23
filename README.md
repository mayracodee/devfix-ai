# DevFix AI

**Cole seu erro. Entenda o problema. Encontre uma solução.**

O DevFix AI é uma aplicação web que utiliza inteligência artificial para auxiliar desenvolvedores na identificação, compreensão e correção de problemas em códigos.

A ferramenta permite enviar um trecho de código, informar uma mensagem de erro e escolher o nível de explicação desejado. A IA retorna uma análise estruturada, com a identificação do problema, explicação e sugestão de correção.

## Funcionalidades

- Seleção da linguagem de programação.
- Envio de código para análise.
- Campo opcional para mensagem de erro.
- Dois níveis de explicação: iniciante e técnico.
- Identificação de problemas de sintaxe e lógica.
- Explicação do problema identificado.
- Sugestão de solução.
- Exibição do código original e corrigido.
- Feedback visual durante o processamento.
- Tratamento de erros na comunicação com a API.

## Tecnologias utilizadas

**Frontend**
- React
- TypeScript
- Vite
- HTML5
- CSS3

**Backend e integração**
- Node.js
- Vercel Functions
- API da Groq
- Modelo de IA: GPT-OSS 120B

**Publicação**
- Vercel

## Como executar o projeto

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Crie um arquivo `.env.local` na raiz do projeto.
4. Configure sua variável de ambiente:

```env
GROQ_API_KEY=a_chave_aqui
```

5. Inicie o ambiente local com `vercel dev`.

**Importante:** nunca compartilhe ou publique sua chave de API. O arquivo `.env.local` não deve ser enviado ao GitHub.

## Estrutura do projeto

```text
devfix-ai/
├── api/
│   └── analyze.ts
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── CodeForm/
│   │   └── AnalysisResult/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/
├── index.html
└── package.json
```

## Qualidade de software

O projeto também passou por testes funcionais, incluindo:

- Validação de campos obrigatórios.
- Validação de dados enviados à API.
- Testes de integração com a Groq.
- Análise de código com diferentes níveis de explicação.
- Verificação do estado de carregamento.
- Testes de tratamento de falhas.
- Teste de recuperação após indisponibilidade da API.

## Objetivo do projeto

Desenvolver uma aplicação que demonstre conhecimentos em desenvolvimento Front-End, integração com APIs, TypeScript, funcionalidades de backend e práticas de qualidade de software.

**Desenvolvido como projeto de portfólio.**