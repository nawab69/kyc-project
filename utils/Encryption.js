import crypto from "crypto";

export const encryptData = (data, password) => {
  const key = crypto.createHash("md5").update(password).digest("hex");
  const iv = Buffer.from(key, "hex");
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
