# Configuração do Site ChileSki

Este guia explica como configurar todas as integrações necessárias para o funcionamento completo do site.

## 📧 Configuração de Email (SMTP)

### Gmail (Recomendado)
1. Acesse sua conta Google
2. Vá em "Gerenciar sua Conta Google" > "Segurança"
3. Ative a "Verificação em duas etapas"
4. Gere uma "Senha de app" para o projeto
5. Configure as variáveis:
\`\`\`env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-gerada
SMTP_FROM_EMAIL=contato@chileski.com.br
CONTACT_EMAIL=contato@chileski.com.br
\`\`\`

### Outros Provedores
- **Outlook**: smtp-mail.outlook.com:587
- **Yahoo**: smtp.mail.yahoo.com:587
- **Zoho**: smtp.zoho.com:587

## 📁 Configuração do Google Drive (Entrega de Fotos)

### Passo 1: Criar Pastas no Google Drive
1. Acesse [drive.google.com](https://drive.google.com)
2. Crie uma estrutura de pastas para cada produto:
   \`\`\`
   📁 ChileSki - Fotos Profissionais/
   ├── 📁 Valle Nevado/
   │   ├── 📁 Digital HD/
   │   ├── 📁 Ultra HD 4K/
   │   └── 📁 Impressão Física/
   ├── 📁 Portillo/
   │   ├── 📁 Digital HD/
   │   ├── 📁 Ultra HD 4K/
   │   └── 📁 Impressão Física/
   ├── 📁 La Parva/
   │   ├── 📁 Digital HD/
   │   ├── 📁 Ultra HD 4K/
   │   └── 📁 Impressão Física/
   └── 📁 El Colorado/
       ├── 📁 Digital HD/
       ├── 📁 Ultra HD 4K/
       └── 📁 Impressão Física/
   \`\`\`

### Passo 2: Configurar Compartilhamento
1. Para cada pasta, clique com o botão direito > "Compartilhar"
2. Altere para "Qualquer pessoa com o link pode visualizar"
3. Copie o link de compartilhamento

### Passo 3: Atualizar Links no Código
No arquivo `lib/email.ts`, atualize o objeto `PRODUCT_DRIVE_LINKS` com seus links reais:

\`\`\`typescript
const PRODUCT_DRIVE_LINKS = {
  'valle-nevado-hd': 'https://drive.google.com/drive/folders/SEU_LINK_VALLE_NEVADO_HD',
  'valle-nevado-4k': 'https://drive.google.com/drive/folders/SEU_LINK_VALLE_NEVADO_4K',
  'valle-nevado-print': 'https://drive.google.com/drive/folders/SEU_LINK_VALLE_NEVADO_PRINT',
  // ... continue para todos os produtos
}
\`\`\`

### Dica: Como Obter o ID da Pasta
- Link completo: `https://drive.google.com/drive/folders/1ABC123XYZ789`
- Use apenas: `https://drive.google.com/drive/folders/1ABC123XYZ789`

## 💳 Configuração do Stripe

1. Acesse [dashboard.stripe.com](https://dashboard.stripe.com)
2. Crie uma conta ou faça login
3. Vá em "Desenvolvedores" > "Chaves de API"
4. Copie as chaves:
\`\`\`env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
\`\`\`

### Configuração de Webhooks (Opcional)
1. Vá em "Desenvolvedores" > "Webhooks"
2. Adicione endpoint: `https://seudominio.com/api/stripe/webhook`
3. Selecione eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`

## 💰 Configuração do PayPal

1. Acesse [developer.paypal.com](https://developer.paypal.com)
2. Faça login e vá em "My Apps & Credentials"
3. Crie uma nova aplicação
4. Copie as credenciais:
\`\`\`env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=seu-client-id
PAYPAL_CLIENT_ID=seu-client-id
PAYPAL_CLIENT_SECRET=seu-client-secret
\`\`\`

## 🌐 URL Base

Configure a URL base da aplicação:
\`\`\`env
# Para desenvolvimento
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Para produção
NEXT_PUBLIC_BASE_URL=https://seudominio.com
\`\`\`

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente no painel da Vercel
3. Deploy automático a cada push

### Outras Plataformas
- Netlify
- Railway
- DigitalOcean App Platform

## ✅ Checklist de Configuração

- [ ] Configurar SMTP para envio de emails
- [ ] Criar e organizar pastas no Google Drive
- [ ] Configurar compartilhamento das pastas do Drive
- [ ] Atualizar links do Google Drive no código
- [ ] Configurar chaves do Stripe
- [ ] Configurar credenciais do PayPal
- [ ] Definir URL base da aplicação
- [ ] Testar formulário de contato
- [ ] Testar pagamentos com Stripe
- [ ] Testar pagamentos com PayPal
- [ ] Verificar recebimento de emails de entrega
- [ ] Testar download das fotos via Google Drive

## 🔧 Troubleshooting

### Emails não estão sendo enviados
- Verifique se as credenciais SMTP estão corretas
- Confirme se a "Senha de app" foi gerada (Gmail)
- Verifique se não há bloqueio de firewall

### Links do Google Drive não funcionam
- Confirme se as pastas estão com compartilhamento público
- Verifique se os links estão corretos no arquivo `lib/email.ts`
- Teste os links manualmente no navegador

### Pagamentos não funcionam
- Confirme se as chaves do Stripe/PayPal estão corretas
- Verifique se está usando as chaves de teste em desenvolvimento
- Confirme se os webhooks estão configurados (produção)

### Erros de CORS
- Verifique se a URL base está configurada corretamente
- Confirme se os domínios estão autorizados no Stripe/PayPal

## 📞 Suporte

Para dúvidas sobre a configuração, entre em contato:
- Email: suporte@chileski.com.br
- WhatsApp: +55 (11) 99999-9999
