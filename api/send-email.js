import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('=== INÍCIO DO REQUEST ===');
  console.log('Body recebido:', req.body);

  const { nome, email, telefone, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    console.log('Erro de validação:', { nome, email, mensagem });
    return res.status(400).json({ error: 'Nome, e-mail e mensagem são obrigatórios' });
  }

  try {
    console.log('Tentando enviar e-mail...');

    // Template para e-mail da empresa
    const companyEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #F0F5FF; padding: 32px 24px; text-align: center;">
            <img src="https://mkfiadores.com.br/src/images/mk-fiadores-logo.png" alt="MK Fiadores" style="height: 40px; width: auto;">
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <h2 style="color: #061C3D; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">Nova mensagem recebida do site</h2>
            <p style="color: #42526B; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">Você recebeu uma nova mensagem através do formulário de contato:</p>

            <!-- Info Box -->
            <div style="background-color: #F5F6F7; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <div style="margin-bottom: 16px;">
                <p style="color: #838E9E; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 4px 0;">Nome</p>
                <p style="color: #061C3D; font-size: 16px; margin: 0;">${nome}</p>
              </div>

              <div style="margin-bottom: 16px;">
                <p style="color: #838E9E; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 4px 0;">E-mail</p>
                <p style="color: #061C3D; font-size: 16px; margin: 0;"><a href="mailto:${email}" style="color: #0B63E5; text-decoration: none;">${email}</a></p>
              </div>

              <div style="margin-bottom: 16px;">
                <p style="color: #838E9E; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 4px 0;">Telefone</p>
                <p style="color: #061C3D; font-size: 16px; margin: 0;">${telefone || 'Não informado'}</p>
              </div>

              <div>
                <p style="color: #838E9E; font-size: 12px; font-weight: 600; text-transform: uppercase; margin: 0 0 4px 0;">Mensagem</p>
                <p style="color: #061C3D; font-size: 16px; margin: 0; white-space: pre-wrap;">${mensagem}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #F5F6F7; padding: 24px; text-align: center;">
            <p style="color: #838E9E; font-size: 14px; margin: 0;">MK Fiadores - Fiadores para locações de imóveis</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Template para e-mail de confirmação do cliente
    const clientEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background-color: #F0F5FF; padding: 32px 24px; text-align: center;">
            <img src="https://mkfiadores.com.br/src/images/mk-fiadores-logo.png" alt="MK Fiadores" style="height: 40px; width: auto;">
          </div>

          <!-- Content -->
          <div style="padding: 32px 24px;">
            <h2 style="color: #061C3D; font-size: 24px; font-weight: 600; margin: 0 0 16px 0;">Obrigado pelo contato, ${nome.split(' ')[0]}! 👋</h2>
            <p style="color: #42526B; font-size: 16px; line-height: 1.5; margin: 0 0 16px 0;">Recebemos sua mensagem e nossa equipe entrará em contato em breve.</p>
            <p style="color: #42526B; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">Se preferir, você pode entrar em contato conosco diretamente pelo WhatsApp:</p>

            <!-- WhatsApp Buttons -->
            <div style="margin-bottom: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px;">
                    <a href="https://wa.me/5511944427758?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20atendente" style="display: block; background-color: #0F9918; color: #ffffff; text-decoration: none; padding: 16px 24px; border-radius: 8px; text-align: center; font-size: 16px; font-weight: 600;">
                      📱 WhatsApp: (11) 94442-7758
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px;">
                    <a href="https://wa.me/5511916751560?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20atendente" style="display: block; background-color: #0F9918; color: #ffffff; text-decoration: none; padding: 16px 24px; border-radius: 8px; text-align: center; font-size: 16px; font-weight: 600;">
                      📱 WhatsApp: (11) 91675-1560
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Contact Info -->
            <div style="background-color: #F0F5FF; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #061C3D; font-size: 18px; font-weight: 600; margin: 0 0 16px 0;">Outras formas de contato:</h3>
              <p style="color: #42526B; font-size: 14px; margin: 0 0 8px 0;">📞 Telefones:</p>
              <p style="color: #0B63E5; font-size: 14px; margin: 0 0 12px 0;">+55 (11) 94442-7758 | +55 (11) 91675-1560</p>
              <p style="color: #42526B; font-size: 14px; margin: 0 0 8px 0;">✉️ E-mail:</p>
              <p style="color: #0B63E5; font-size: 14px; margin: 0;">contato@mkfiadores.com.br</p>
            </div>

            <p style="color: #838E9E; font-size: 14px; line-height: 1.5; margin: 0;">Estamos prontos para ajudá-lo a encontrar o fiador ideal para sua locação!</p>
          </div>

          <!-- Footer -->
          <div style="background-color: #061C3D; padding: 24px; text-align: center;">
            <img src="https://mkfiadores.com.br/src/images/mk-fiadores-logo-branco.png" alt="MK Fiadores" style="height: 32px; width: auto; margin-bottom: 12px;">
            <p style="color: #838E9E; font-size: 14px; margin: 0;">MK Fiadores - Fiadores para locações de imóveis</p>
            <p style="color: #838E9E; font-size: 12px; margin: 8px 0 0 0;">© 2025 MK Fiadores. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar e-mail para a empresa
    const companyEmail = await resend.emails.send({
      from: 'MK Fiadores <contato@mkfiadores.com.br>',
      to: ['contato@mkfiadores.com.br'],
      subject: 'Nova mensagem do site - MK Fiadores',
      html: companyEmailTemplate,
      replyTo: email,
    });

    console.log('E-mail da empresa enviado:', companyEmail);

    // Enviar e-mail de confirmação para o cliente
    const clientEmail = await resend.emails.send({
      from: 'MK Fiadores <no-reply@mkfiadores.com.br>',
      to: [email],
      subject: 'Obrigado pelo contato - MK Fiadores',
      html: clientEmailTemplate,
    });

    console.log('E-mail de confirmação enviado:', clientEmail);

    return res.status(200).json({ success: true, companyEmailId: companyEmail.id, clientEmailId: clientEmail.id });
  } catch (error) {
    console.error('=== ERRO DETALHADO ===');
    console.error('Mensagem:', error.message);
    console.error('Stack:', error.stack);
    console.error('Error completo:', JSON.stringify(error, null, 2));

    return res.status(500).json({
      error: 'Erro ao enviar e-mail',
      details: error.message,
      type: error.name
    });
  }
}
