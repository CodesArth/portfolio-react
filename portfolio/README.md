# Portfólio em React (Vite)

## Como rodar
    npm install
    npm run dev

## Onde editar
- `src/data.js`: seus textos, projetos e links
- `src/index.css`: cores (variáveis no topo) e fontes
- `src/App.jsx`: estrutura e seções do site
- `index.html`: título da aba e fontes do Google

## Publicar
O arquivo `netlify.toml` na raiz do repositório configura o Netlify para executar `npm ci --include=dev --include=optional` antes de `npm run build` na pasta `portfolio`, publicando `portfolio/dist`. Essa instalação limpa usa o `package-lock.json` para manter as versões das ferramentas e de seus binários compatíveis, incluindo as dependências de desenvolvimento e os pacotes nativos opcionais. O redirecionamento para `index.html` permite acessar caminhos diretamente sem receber um erro 404.

Para gerar os arquivos e publicar manualmente em outros serviços:

    npm run build
Envie a pasta `dist` para Vercel, Netlify ou GitHub Pages.
