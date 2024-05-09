export type User = {
  id: string;
  name: string | null;
  email: string;
  created_at: Date;
  token: string | null;
  tokenExpiresAt: Date | null;
};
