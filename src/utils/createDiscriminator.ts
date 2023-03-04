import crypto from "crypto";
export default (email: string): number => {
  let hash = 0;
  let str = email + Math.floor(Math.random() * 30);
  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const discriminator = Math.abs(hash) % 10000;

  return discriminator;
};
