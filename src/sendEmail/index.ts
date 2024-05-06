import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "projectbyyan@outlook.com",
    pass: "Generalcomms",
  },
});

export async function sendEmail(email: string, token: string) {
  await transporter.sendMail({
    from: '"Projeto Todoo" <projectbyyan@outlook.com>',
    to: `${email}`,
    subject: "Espero que este e-mail o encontre bem.",
    html: `<p>Quero aproveitar esta oportunidade para expressar minha sincera gratidão por escolher usar o Todo em sua rotina diária.  Para facilitar ainda mais sua experiência com o Todo, estou encaminhando seu token de acesso exclusivo. </p>
    <H1>${token}</H1>
    `,
  });
}
