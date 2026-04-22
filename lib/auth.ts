import { jwtVerify, SignJWT } from 'jose';
import { DecodedToken, UserRole } from './types';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

export async function generateToken(userId: string, email: string, role: UserRole): Promise<string> {
  const token = await new SignJWT({
    sub: userId,
    email,
    role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(SECRET_KEY);

  return token;
}

export async function verifyToken(token: string): Promise<DecodedToken | null> {
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    const payload = verified.payload as any;
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      iat: payload.iat || 0,
      exp: payload.exp || 0,
    };
  } catch {
    return null;
  }
}

export function hashPassword(password: string): string {
  // Simple hash using native crypto - in production use bcrypt
  const encoder = new TextEncoder();
  const data = encoder.encode(password + JWT_SECRET);
  // For demo purposes, using a simple approach
  return Buffer.from(data).toString('base64');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
