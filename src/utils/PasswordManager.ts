import bcrypt from "bcrypt";
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
export async function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
