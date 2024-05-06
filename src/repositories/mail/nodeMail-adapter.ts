import { MailRepository } from "@/interface/mail-repository";
import { Transporter, createTransport } from "nodemailer";

export class MailAdapter implements MailRepository {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "projectbyyan@outlook.com",
        pass: "Generalcomms",
      },
    });
  }

  async send(email: string, token: number) {
    await this.transporter.sendMail({
      from: '"Projeto Todoo" <projectbyyan@outlook.com>',
      to: `${email}`,
      subject: "Espero que este e-mail o encontre bem.",
      html: `<p>Quero aproveitar esta oportunidade para expressar minha sincera gratidão por escolher usar o Todoo em sua rotina diária.  Para facilitar ainda mais sua experiência com o Todoo, estou encaminhando seu token de acesso exclusivo. </p>
  <H1>${token}</H1>`,
    });
  }
}
