import { EmailTokenManageInterface } from "@/interface/EmailTokenManage-interface";

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

export class SendTokenUseCase implements EmailTokenManageInterface {
  async send(email: string, token: number) {
    await transporter.sendMail({
      from: '"Projeto Todoo" <projectbyyan@outlook.com>',
      to: `${email}`,
      subject: "Espero que este e-mail o encontre bem.",
      html: `<p>Quero aproveitar esta oportunidade para expressar minha sincera gratidão por escolher usar o Todo em sua rotina diária.  Para facilitar ainda mais sua experiência com o Todo, estou encaminhando seu token de acesso exclusivo. </p>
      <H1>${token}</H1>
      `,
    });
  }
  createToken() {
    const token = Math.floor(Math.random() * 9000) + 100000;
    setTimeout(() => {
      const tokenRandom = Math.floor(Math.random() * 9000) + 100000;
      return tokenRandom;
    }, 5000);

    return token;
  }
}
