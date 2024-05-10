export function tokenRandom() {
  const token = Math.floor(Math.random() * 9000) + 100000;
  return token;
}
