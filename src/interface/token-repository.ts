export interface TokenRepository {
  saveOTP(token: string, id: string): Promise<any>;
}
