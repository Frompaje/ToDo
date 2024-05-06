export interface MailRepository {
  send(email: string, token: number): Promise<any>;
}
