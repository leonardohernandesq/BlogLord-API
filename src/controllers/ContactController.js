const { Resend } = require("resend");

const ContactController = {
  send: async (req, res) => {
    const resend = new Resend(process.env.RESEND);

    try {
      const { name, phone, email, message } = req.body;

      if (!phone) {
        return res
          .status(400)
          .json({ success: false, message: "Insira um telefone" });
      }

      if (!email || !email.includes("@")) {
        return res
          .status(400)
          .json({ success: false, message: "Insira um email válido" });
      }

      if (!message) {
        return res
          .status(400)
          .json({ success: false, message: "Mensagem é obrigatória" });
      }

      const result = await resend.emails.send({
        from: `Lord System <onboarding@resend.dev>`,
        to: "leonardo_hernandes@outlook.com.br",
        cc: "henriquepacotee@gmail.com",
        reply_to: email,
        subject: "Orçamento do site da Lord System",
        html: `
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message}</p>
        `,
      });

      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      return res
        .status(500)
        .json({ success: false, message: "Erro ao enviar e-mail." });
    }
  },
};

module.exports = ContactController;
