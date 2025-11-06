# Configuração do Google Tag Manager

Este documento descreve as tags, acionadores e variáveis que devem ser criados no Google Tag Manager, além das dimensões personalizadas no Google Analytics.

## Variáveis

### Variáveis do Data Layer

1. **whatsapp_location**
   - Tipo: Variável da camada de dados
   - Nome da variável: `whatsapp_location`
   - Versão da camada de dados: 2

## Acionadores (Triggers)

### 1. WhatsApp Click
- **Nome:** WhatsApp Click
- **Tipo:** Evento personalizado
- **Nome do evento:** `whatsapp_click`
- **Acionamento:** Este acionador é disparado quando ocorre um clique em botões do WhatsApp

### 2. Form Success
- **Nome:** Form Success
- **Tipo:** Evento personalizado
- **Nome do evento:** `form_success`
- **Acionamento:** Este acionador é disparado quando um formulário é enviado com sucesso

## Tags

### 1. GA4 - Event - WhatsApp Click
- **Tipo:** Google Analytics: GA4 Event
- **Nome do evento:** `whatsapp_click`
- **Parâmetros do evento:**
  - Nome do parâmetro: `location`
  - Valor: `{{whatsapp_location}}`
- **Acionador:** WhatsApp Click

### 2. GA4 - Event - Form Success
- **Tipo:** Google Analytics: GA4 Event
- **Nome do evento:** `form_success`
- **Acionador:** Form Success

## Dimensões Personalizadas (Google Analytics 4)

### Configuração em Admin > Definições de dados > Dimensões personalizadas

1. **WhatsApp Location**
   - Nome da dimensão: `whatsapp_location`
   - Escopo: Evento
   - Descrição: Localização do botão do WhatsApp clicado
   - Nome do parâmetro do evento: `location`
   - Valores possíveis:
     - `links_info` - Links na seção de informações
     - `btn_header` - Botão no cabeçalho
     - `widget` - Widget flutuante do WhatsApp
     - `cta` - Botão de call-to-action
     - `section_contact` - Seção de contato

## Instruções de Implementação

1. Acesse o Google Tag Manager
2. Crie as variáveis listadas acima
3. Crie os acionadores conforme especificado
4. Crie as tags e associe aos respectivos acionadores
5. Publique o container
6. No Google Analytics 4, configure as dimensões personalizadas em Admin > Definições de dados > Dimensões personalizadas
