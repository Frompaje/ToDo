export interface EmailTokenManageInterface {
  send(email: string, token: number): Promise<any>;
  createToken(): number;
}
