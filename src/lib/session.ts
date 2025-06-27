import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export type UserPayload = {
    id: number;
    name: string;
    email: string;
};

export async function createSession(payload: UserPayload) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);

  cookies().set('session', session, { expires, httpOnly: true });
}

export async function verifySession(): Promise<UserPayload | null> {
  const cookie = cookies().get('session')?.value;
  if (!cookie) {
    return null;
  }
  try {
    const { payload } = await jwtVerify(cookie, key, {
      algorithms: ['HS256'],
    });
    return payload as UserPayload;
  } catch (error) {
    console.error('Failed to verify session:', error);
    return null;
  }
}

export async function clearSession() {
  cookies().delete('session');
  redirect('/');
}

export async function getSession() {
    return await verifySession();
}
