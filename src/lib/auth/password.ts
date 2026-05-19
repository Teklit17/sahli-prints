import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const iterations = 310000;
const keyLength = 32;
const digest = "sha256";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString(
    "hex",
  );

  return {
    passwordHash: hash,
    passwordSalt: salt,
    passwordAlgorithm: `pbkdf2:${digest}:${iterations}`,
  };
}

export function verifyPassword({
  password,
  passwordHash,
  passwordSalt,
}: {
  password: string;
  passwordHash: string;
  passwordSalt: string;
}) {
  const candidate = pbkdf2Sync(
    password,
    passwordSalt,
    iterations,
    keyLength,
    digest,
  );
  const stored = Buffer.from(passwordHash, "hex");

  return stored.length === candidate.length && timingSafeEqual(stored, candidate);
}
