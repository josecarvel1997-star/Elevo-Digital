# Elevo Digital

Site institucional estático, sem dependências de build. Abra `index.html` ou publique esta pasta em uma hospedagem estática.

## Configuração

- `config.js`: mantenha o WhatsApp oficial; informe `siteUrl` com o domínio oficial HTTPS, sem caminho de página. O site só emite canonical, `og:url` e dados estruturados Organization quando essa URL estiver configurada.
- Revise `privacidade.html` e `termos.html` para refletirem os dados e práticas reais da empresa antes da publicação.
- A personagem para anúncios está em `assets/elevo-personagem.svg`; o favicon está em `assets/favicon.svg`.

## SEO e ferramentas

O conteúdo trabalha termos de busca de forma natural: criação de sites profissionais, landing pages, lojas virtuais, sistemas web sob medida, automação de processos, manutenção de sites e vídeos comerciais com IA. O projeto usa títulos e descrições próprios, Open Graph, headings semânticos, navegação interna e metadados sociais. Não usa `meta keywords`, que não é usado pelo Google Search.

Após configurar o domínio e publicar:

1. Cadastre e verifique a propriedade no Google Search Console.
2. Gere e envie um sitemap XML com as URLs públicas reais; adicione sua URL ao `robots.txt` na hospedagem.
3. Confira mobile, indexação e Core Web Vitals no Search Console/PageSpeed Insights.
4. Valide os dados estruturados no Rich Results Test. A marcação Organization não inventa endereço, avaliações ou outros dados ausentes.

Sitemap, URL canônica e verificação do Search Console dependem do domínio oficial, ainda não informado. Analytics não está instalado; não há identificador ou consentimento configurado.

## Oferta e contato

Serviços, preços e escopos ficam na seção de preços de `index.html`. Os botões de orçamento usam o número centralizado em `config.js`. O site não tem backend, formulário de envio, checkout ou cobrança automática.
