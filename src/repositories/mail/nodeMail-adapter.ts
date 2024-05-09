import { MailRepository } from "@/interface/mail-repository";
import { Transporter, createTransport } from "nodemailer";
import "dotenv/config";

export class MailAdapter implements MailRepository {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: "imap.secureserver.net",
      port: 993,
      secure: true,
      auth: {
        user: "contact@helper-recruiter.com",
        pass: "Bsgbb7M/Nn!b3VD",
      },
    });
  }

  async send(email: string, token: number) {
    try {
      await this.transporter.sendMail({
        from: '"Projeto Todoo" <projectbyyan@outlook.com>',
        to: `${email}`,
        subject: "Espero que este e-mail o encontre bem.",
        html: `<p>Quero aproveitar esta oportunidade para expressar minha sincera gratidão por escolher usar o Todoo em sua rotina diária.  Para facilitar ainda mais sua experiência com o Todoo, estou encaminhando seu token de acesso exclusivo. </p>
      <H1>${token}</H1>
      <p>Não responda esse Email.`,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
