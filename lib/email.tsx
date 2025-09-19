const nodemailer = await import("nodemailer")

// Mapeamento de produtos para links do Google Drive
const PRODUCT_DRIVE_LINKS = {
  "valle-nevado-hd": "https://drive.google.com/drive/folders/EXEMPLO_VALLE_NEVADO_HD",
  "valle-nevado-4k": "https://drive.google.com/drive/folders/EXEMPLO_VALLE_NEVADO_4K",
  "valle-nevado-print": "https://drive.google.com/drive/folders/EXEMPLO_VALLE_NEVADO_PRINT",
  "portillo-hd": "https://drive.google.com/drive/folders/EXEMPLO_PORTILLO_HD",
  "portillo-4k": "https://drive.google.com/drive/folders/EXEMPLO_PORTILLO_4K",
  "portillo-print": "https://drive.google.com/drive/folders/EXEMPLO_PORTILLO_PRINT",
  "la-parva-hd": "https://drive.google.com/drive/folders/EXEMPLO_LA_PARVA_HD",
  "la-parva-4k": "https://drive.google.com/drive/folders/EXEMPLO_LA_PARVA_4K",
  "la-parva-print": "https://drive.google.com/drive/folders/EXEMPLO_LA_PARVA_PRINT",
  "el-colorado-hd": "https://drive.google.com/drive/folders/EXEMPLO_EL_COLORADO_HD",
  "el-colorado-4k": "https://drive.google.com/drive/folders/EXEMPLO_EL_COLORADO_4K",
  "el-colorado-print": "https://drive.google.com/drive/folders/EXEMPLO_EL_COLORADO_PRINT",
}

// Configuração do transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Função para gerar o ID do produto baseado no título e formato
function generateProductId(title: string, format: string): string {
  const location = title
    .toLowerCase()
    .replace(/foto profissional - /, "")
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  const formatKey = format
    .toLowerCase()
    .replace("digital hd", "hd")
    .replace("ultra hd 4k", "4k")
    .replace("impressão física", "print")

  return `${location}-${formatKey}`
}

// Template HTML do email de entrega
function createDeliveryEmailTemplate(orderData: any): string {
  const itemsWithLinks = orderData.items.map((item: any) => {
    const productId = generateProductId(item.title, item.format)
    const driveLink = PRODUCT_DRIVE_LINKS[productId as keyof typeof PRODUCT_DRIVE_LINKS]

    return {
      ...item,
      driveLink: driveLink || "https://drive.google.com/drive/folders/LINK_NAO_CONFIGURADO",
    }
  })

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Suas Fotos Estão Prontas!</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 10px; font-weight: 700; }
        .header p { font-size: 16px; opacity: 0.9; }
        .content { padding: 40px 30px; }
        .greeting { font-size: 18px; margin-bottom: 25px; color: #1f2937; }
        .order-info { background: #f1f5f9; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #3b82f6; }
        .order-info h3 { color: #1e40af; margin-bottom: 15px; font-size: 18px; }
        .order-details { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .order-details strong { color: #1f2937; }
        .photos-section { margin-bottom: 30px; }
        .photos-section h3 { color: #1e40af; margin-bottom: 20px; font-size: 20px; text-align: center; }
        .photo-item { background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 25px; margin-bottom: 20px; transition: all 0.3s ease; }
        .photo-item:hover { border-color: #3b82f6; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15); }
        .photo-title { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
        .photo-format { color: #6b7280; margin-bottom: 15px; font-size: 14px; }
        .download-btn { display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.3s ease; }
        .download-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
        .instructions { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 12px; padding: 20px; margin-bottom: 30px; }
        .instructions h4 { color: #92400e; margin-bottom: 10px; font-size: 16px; }
        .instructions ul { color: #92400e; padding-left: 20px; }
        .instructions li { margin-bottom: 5px; }
        .footer { background: #1f2937; color: white; padding: 30px; text-align: center; }
        .footer h4 { margin-bottom: 15px; color: #3b82f6; }
        .contact-info { margin-bottom: 20px; }
        .contact-info p { margin-bottom: 5px; opacity: 0.9; }
        .social-links { margin-top: 20px; }
        .social-links a { color: #3b82f6; text-decoration: none; margin: 0 10px; }
        @media (max-width: 600px) {
          .header, .content, .footer { padding: 20px; }
          .photo-item { padding: 20px; }
          .order-details { flex-direction: column; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎿 Suas Fotos Estão Prontas!</h1>
          <p>Reviva os melhores momentos da sua aventura no Chile</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Olá <strong>${orderData.customerName}</strong>! 👋
          </div>
          
          <p style="margin-bottom: 25px; color: #4b5563; font-size: 16px;">
            Ficamos muito felizes em saber que você escolheu nossas fotos profissionais para eternizar sua experiência única nas montanhas chilenas! 
          </p>
          
          <div class="order-info">
            <h3>📋 Detalhes do Pedido</h3>
            <div class="order-details">
              <span>Número do Pedido:</span>
              <strong>#${orderData.orderId}</strong>
            </div>
            <div class="order-details">
              <span>Data da Compra:</span>
              <strong>${new Date().toLocaleDateString("pt-BR")}</strong>
            </div>
            <div class="order-details">
              <span>Total Pago:</span>
              <strong>R$ ${orderData.total.toFixed(2)}</strong>
            </div>
          </div>
          
          <div class="photos-section">
            <h3>📸 Suas Fotos Profissionais</h3>
            
            ${itemsWithLinks
              .map(
                (item) => `
              <div class="photo-item">
                <div class="photo-title">${item.title}</div>
                <div class="photo-format">Formato: ${item.format} • Quantidade: ${item.quantity}</div>
                <a href="${item.driveLink}" class="download-btn" target="_blank">
                  📥 Baixar Fotos Agora
                </a>
              </div>
            `,
              )
              .join("")}
          </div>
          
          <div class="instructions">
            <h4>📝 Instruções para Download:</h4>
            <ul>
              <li>Clique no botão "Baixar Fotos Agora" para acessar sua pasta no Google Drive</li>
              <li>Faça login com sua conta Google se necessário</li>
              <li>Você pode baixar as fotos individualmente ou toda a pasta de uma vez</li>
              <li>As fotos ficam disponíveis por 30 dias após a compra</li>
              <li>Recomendamos fazer backup das suas fotos após o download</li>
            </ul>
          </div>
          
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">
            Esperamos que você tenha momentos incríveis revivendo sua aventura através dessas fotos! 
            Se tiver alguma dúvida ou problema com o download, não hesite em nos contatar.
          </p>
          
          <p style="color: #1e40af; font-weight: 600; font-size: 16px;">
            Obrigado por escolher nossa empresa para sua aventura no Chile! ⛷️❄️
          </p>
        </div>
        
        <div class="footer">
          <h4>Entre em Contato</h4>
          <div class="contact-info">
            <p>📧 contato@skichile.com.br</p>
            <p>📱 WhatsApp: (11) 99999-9999</p>
            <p>🌐 www.skichile.com.br</p>
          </div>
          <div class="social-links">
            <a href="#">Instagram</a> |
            <a href="#">Facebook</a> |
            <a href="#">YouTube</a>
          </div>
          <p style="margin-top: 20px; opacity: 0.7; font-size: 14px;">
            © 2024 Ski Chile Brasil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Função para enviar email de entrega
export async function sendDeliveryEmail(orderData: any) {
  try {
    const htmlContent = createDeliveryEmailTemplate(orderData)

    const mailOptions = {
      from: `"Ski Chile Brasil" <${process.env.SMTP_FROM_EMAIL}>`,
      to: orderData.customerEmail,
      subject: `🎿 Suas Fotos Estão Prontas! - Pedido #${orderData.orderId}`,
      html: htmlContent,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log("Email de entrega enviado:", result.messageId)

    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Erro ao enviar email de entrega:", error)
    return { success: false, error: error.message }
  }
}

// Função para enviar email de contato (mantida para compatibilidade)
export async function sendContactEmail(formData: any) {
  try {
    const mailOptions = {
      from: `"Ski Chile Brasil" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Novo Contato - ${formData.nome}`,
      html: `
        <h2>Novo contato recebido</h2>
        <p><strong>Nome:</strong> ${formData.nome}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Telefone:</strong> ${formData.telefone}</p>
        <p><strong>Destino:</strong> ${formData.destino}</p>
        <p><strong>Data da Viagem:</strong> ${formData.dataViagem}</p>
        <p><strong>Número de Pessoas:</strong> ${formData.numeroPessoas}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${formData.mensagem}</p>
      `,
    }

    const result = await transporter.sendMail(mailOptions)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("Erro ao enviar email de contato:", error)
    return { success: false, error: error.message }
  }
}

// Função legada para compatibilidade
export async function sendPurchaseNotification(orderData: any) {
  return await sendDeliveryEmail(orderData)
}
