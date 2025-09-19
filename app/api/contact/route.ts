import { type NextRequest, NextResponse } from "next/server"
const nodemailer = require('nodemailer');

type ContactFormData = {
  nome: string
  email: string
  telefone: string
  tipoViagem?: string
  dataViagem?: string
  participantes?: string
  mensagem?: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendContactEmail(data: ContactFormData) {
  try {
    await transporter.sendMail({
      from: `"Brasil Snow Tour" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: "Novo contato via site",
      html: `
        <h2>Novo contato via site</h2>
        <p><b>Nome:</b> ${data.nome}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Telefone:</b> ${data.telefone}</p>
        <p><b>Tipo de Viagem:</b> ${data.tipoViagem || "-"}</p>
        <p><b>Data da Viagem:</b> ${data.dataViagem || "-"}</p>
        <p><b>Participantes:</b> ${data.participantes || "-"}</p>
        <p><b>Mensagem:</b><br/>${data.mensagem || "-"}</p>
      `,
    })
    return { success: true }
  } catch (error: any) {
    console.error("Erro ao enviar email:", error)
    return { success: false, message: "Erro ao enviar email." }
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validação básica
    if (!data.nome || !data.email || !data.telefone) {
      return NextResponse.json({ success: false, message: "Nome, email e telefone são obrigatórios." }, { status: 400 })
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ success: false, message: "Email inválido." }, { status: 400 })
    }

    // Enviar email
    const result = await sendContactEmail(data)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Solicitação enviada com sucesso! Entraremos em contato em até 2 horas.",
      })
    } else {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro na API de contato:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor. Tente novamente." }, { status: 500 })
  }
}