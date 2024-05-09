export interface TokenRepository {
  saveOTP(
    token: string,
    id: string
  ): Promise<{
    id: string;
    name: string | null;
    email: string;
    created_at: Date;
    token: string | null;
    tokenExpiresAt: Date | null;
  }>;
}

type User = {
  id: string;
  name: string | null;
  email: string;
  created_at: Date;
  token: string | null;
  tokenExpiresAt: Date | null;
};
