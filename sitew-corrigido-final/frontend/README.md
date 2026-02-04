# 🏪 Mercadinho do Seu José - Sistema Completo Pro

Sistema de e-commerce profissional com Google OAuth, cartão virtual interativo, e gerenciamento completo.

## 🆕 Últimas Implementações

### ✅ Login com Google OAuth
- **Um clique** para entrar com conta Google
- **Criação automática** de perfil no banco
- **Seguro e rápido** via Supabase Auth

### ✅ Cartão Virtual Interativo 3D
- **Visualização realtime** dos dados digitados
- **Flip animation** ao clicar (mostra frente e verso)
- **Auto-formatação** de número, data e CVV
- **Validação completa** de campos
- **Design premium** com gradiente verde

### ✅ Nome do Usuário no Header
- **Avatar circular** com inicial do nome
- **Dropdown menu** com opções
- **"Oi, [Nome]"** personalizado
- **Badge Admin** para proprietários

### ✅ Login do Seu José Corrigido
- **Funciona 100%** em modo local e com Supabase
- **Auto-criação** do usuário demo
- Credenciais: jose@mercadinho.com / 123456

## 🚀 Instalação

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Supabase

#### A. Executar SQL
Vá em: Supabase Dashboard → SQL Editor → New Query

Cole e execute o arquivo `database-setup.sql`

#### B. Configurar Google OAuth (Opcional)
1. Vá em: Supabase Dashboard → Authentication → Providers
2. Ative o provider "Google"
3. Configure:
   - **Client ID**: Obtenha no Google Cloud Console
   - **Client Secret**: Obtenha no Google Cloud Console
   - **Redirect URL**: `https://[seu-projeto].supabase.co/auth/v1/callback`

##### Como obter Google Client ID/Secret:
1. Acesse: https://console.cloud.google.com
2. Crie um novo projeto ou selecione existente
3. Vá em: APIs & Services → Credentials
4. Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs: Cole a URL do Supabase
7. Copie Client ID e Client Secret

### 3. Configurar Gemini (Opcional)
```
GEMINI_API_KEY=sua_chave_aqui
```

### 4. Iniciar
```bash
npm run dev
```

## 🎯 Funcionalidades Completas

### 🔐 Autenticação
- ✅ **Login tradicional** (email/senha)
- ✅ **Login com Google** (OAuth 2.0)
- ✅ **Registro completo** com validações
- ✅ **Sessão persistente**
- ✅ **Login demo** (Seu José)

### 👤 Perfil do Usuário
- ✅ **Nome no header** com avatar
- ✅ **Menu dropdown** personalizado
- ✅ **Badge admin** para proprietários
- ✅ **Acesso rápido ao dashboard**

### 💳 Pagamento
- ✅ **PIX** (QR Code simulado)
- ✅ **Cartão Virtual 3D**
  - Frente: Número, Nome, Validade
  - Verso: CVV
  - Flip animation ao clicar
  - Formatação automática
  - Validação em tempo real
  - Detecta bandeira (Visa, Master, Amex)

### 🛒 Carrinho de Compras
- ✅ **4 etapas**: Lista → Endereço → Pagamento → Cartão
- ✅ **Validação de CEP** (ViaCEP API)
- ✅ **Preenchimento automático** de endereço
- ✅ **Cartão virtual** para pagamento com cartão
- ✅ **Confirmação visual** de pedido

### 📊 Dashboard (Admin)
- ✅ **Visualização de vendas**
- ✅ **Filtros por status**
- ✅ **Estatísticas**
- ✅ **Gerenciamento de pedidos**

### ✅ Validações
- ✅ **CEP** via ViaCEP API
- ✅ **CPF** com dígitos verificadores
- ✅ **Email** com regex
- ✅ **Telefone** com DDD
- ✅ **Cartão de crédito** com Luhn algorithm

## 🎨 Cartão Virtual - Como Funciona

### Frente do Cartão
```
┌─────────────────────────────────┐
│  💳               VISA          │
│                                  │
│  1234 5678 9012 3456           │
│                                  │
│  JOAO SILVA         12/26      │
└─────────────────────────────────┘
```

### Verso do Cartão (ao clicar)
```
┌─────────────────────────────────┐
│  ████████████████████████       │
│                                  │
│  ┌──────────┐                   │
│  │   123   │  CVV               │
│  └──────────┘                   │
└─────────────────────────────────┘
```

### Recursos do Cartão
- **Auto-formatação**: 0000 0000 0000 0000
- **Expiry**: MM/AA (auto-formata)
- **CVV**: Flip automático ao focar
- **Bandeira**: Detecta Visa, Master, Amex
- **Gradiente**: Verde do Seu José
- **Animação**: Suave e profissional

## 🔐 Contas de Teste

### Admin (Seu José)
```
Email: jose@mercadinho.com
Senha: 123456
Acesso: Dashboard, Vendas, Config
```

### Cliente
- **Opção 1**: Criar nova conta
- **Opção 2**: Login com Google
- **Opção 3**: Usar CPF válido (gerar em: 4devs.com.br)

## 📂 Novos Arquivos

```
components/
├── VirtualCard.tsx      # Cartão virtual 3D interativo
├── Login.tsx            # Atualizado com Google OAuth
├── Register.tsx         # Cadastro com validações
├── Sales.tsx            # Visualização de vendas
└── Header.tsx           # Nome do usuário no topo

services/
├── database/
│   └── authService.ts   # OAuth + Login tradicional
└── cepService.ts        # Validação de CEP
```

## 🎯 Fluxo de Compra Completo

1. **Navegar produtos** → Adicionar ao carrinho
2. **Endereço** → Digitar CEP (busca automática)
3. **Pagamento** → Escolher PIX ou Cartão
4. **Se Cartão**:
   - Ver cartão virtual 3D
   - Digitar número (formata automaticamente)
   - Digitar nome (aparece no cartão)
   - Digitar validade (formata MM/AA)
   - Clicar no cartão para ver verso
   - Digitar CVV (mostra no verso)
   - Confirmar pagamento
5. **Confirmação** → Modal de sucesso

## 🌐 APIs Integradas

### Google OAuth 2.0
- **Provider**: Supabase Auth
- **Scope**: email, profile
- **Flow**: Authorization Code
- **Segurança**: PKCE enabled

### ViaCEP
- **Endpoint**: https://viacep.com.br/ws/{cep}/json/
- **Gratuita**: Sem limite
- **Response**: JSON com endereço completo

### Supabase
- **Auth**: Google, Email/Password
- **Database**: PostgreSQL
- **Realtime**: WebSocket updates
- **Storage**: User avatars (futuro)

## 🔒 Segurança

### OAuth
- ✅ **PKCE** habilitado
- ✅ **State parameter** para CSRF
- ✅ **Token refresh** automático
- ✅ **Redirect URI** validado

### Cartão Virtual
- ✅ **Dados nunca salvos** em plain text
- ✅ **Simulação local** (teste)
- ✅ **CVV visível** apenas no flip
- ✅ **Validação Luhn** (produção)

### Dados do Usuário
- ✅ **Row Level Security** (RLS)
- ✅ **Senhas criptografadas** (bcrypt)
- ✅ **Tokens JWT** seguros
- ✅ **HTTPS only** em produção

## 📱 Responsividade

- ✅ **Mobile-first** design
- ✅ **Cartão 3D** funciona em mobile
- ✅ **Touch gestures** para flip
- ✅ **Teclado numérico** em campos de número
- ✅ **Viewport otimizado**

## 🐛 Correções Nesta Versão

1. ✅ Login do Seu José funcionando 100%
2. ✅ Nome do usuário aparece no header
3. ✅ Google OAuth implementado
4. ✅ Cartão virtual 3D criado
5. ✅ Flip animation no cartão
6. ✅ Auto-formatação de campos
7. ✅ Validação completa de cartão
8. ✅ Botão "voltar" no fluxo de pagamento

## 🎨 Design do Cartão

### Cores
- **Gradiente**: #1a4731 → #2d6a4f (verde Seu José)
- **Chip**: Dourado (#FCD34D)
- **Texto**: Branco (#FFFFFF)
- **CVV Box**: Branco com texto preto

### Tipografia
- **Número**: Mono, 2xl, tracking-widest
- **Nome**: Bold, uppercase, sm
- **Data**: Mono, sm
- **CVV**: Mono, lg

### Animações
- **Flip**: 600ms ease-out
- **Hover**: Scale 1.02
- **Focus**: Border glow

## 🚀 Deploy

### Vercel
```bash
vercel --prod
```

### Configurar Variáveis
```
GEMINI_API_KEY=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

### Google OAuth Redirect
Adicione em Google Console:
```
https://seu-dominio.vercel.app
```

## 📝 Checklist de Setup Completo

- [ ] npm install
- [ ] Executar database-setup.sql
- [ ] Configurar Google OAuth no Supabase
- [ ] Obter Google Client ID/Secret
- [ ] Adicionar Redirect URI
- [ ] Testar login tradicional
- [ ] Testar login com Google
- [ ] Fazer pedido teste com PIX
- [ ] Fazer pedido teste com Cartão
- [ ] Verificar pedidos no Dashboard
- [ ] Testar em mobile

## 🎉 Recursos Premium

- ✅ **Login Social** (Google)
- ✅ **Cartão Virtual** 3D
- ✅ **Auto-formatação** inteligente
- ✅ **Validação em tempo real**
- ✅ **Design profissional**
- ✅ **Animações suaves**
- ✅ **100% Responsivo**
- ✅ **Sem bibliotecas extras**

---

## 🆘 Suporte

### Login do Seu José não funciona?
1. Abra DevTools (F12)
2. Vá em Console
3. Digite: `localStorage.clear()`
4. Recarregue a página
5. Tente novamente

### Google Login não redireciona?
1. Verifique Client ID no Supabase
2. Confirme Redirect URI no Google Console
3. Limpe cache do navegador

### Cartão não vira?
1. Clique diretamente no cartão
2. Em mobile, toque no cartão
3. Verifique se JavaScript está habilitado

---

Desenvolvido com ❤️ para o Seu José
Agora com Google OAuth e Cartão Virtual 3D!
