import nodemailer from 'nodemailer';

const emailRegistro = async (datos) => {
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
        subject: "Verifica tu cuenta en APV", // Subject line
        text: "APV - Administrador de Pacientes de Veterinaria", // plain text body
        html: `<p> Hola ${nombre}, </p>
        <p>Tu cuenta ya está lista, solo debes verificarla siguiendo el enlace a continuación: <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Verificar mi cuenta</a> </p>
        
        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>`,
    });

    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro;