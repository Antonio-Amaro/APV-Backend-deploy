import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    const info = await transporter.sendMail({
        from: '"APV - Administrador de Pacientes de Veterinaria" ja.antonioamaro@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Reestablece tu Password en APV", // Subject line
        text: "APV - Administrador de Pacientes de Veterinaria", // plain text body
        html: `<p> Hola ${nombre}, has solicitado <strong>Restablecer tu Password</strong></p>
        <p>Haz clic en el enlace a continuación para generar tu nuevo Password: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a> </p>
        
        <p>Si tú no hiciste esta solicitud, puedes ignorar este mensaje</p>`,
    });

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvidePassword;