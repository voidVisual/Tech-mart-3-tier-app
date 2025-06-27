
'use server';

import { query } from '@/lib/db';
import { hashPassword, comparePasswords } from '@/lib/password';
import type { User } from '@/lib/data';

export async function signup(name: string, email: string, password: string): Promise<void> {
    const existingUser = await query<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        throw new Error('User with this email already exists.');
    }

    const passwordHash = await hashPassword(password);
    await query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash]);
}


export async function login(email: string, password: string): Promise<User | null> {
    const users = await query<any[]>('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
        return null;
    }
    
    const user = users[0];
    const passwordsMatch = await comparePasswords(password, user.password_hash);

    if (passwordsMatch) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    return null;
}
