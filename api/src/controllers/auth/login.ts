import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ERROR_MESSAGES from '../../constants/error-messages';
import SUCCESS_MESSAGES from '../../constants/success-messages';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const loginAdminUser = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({ error: ERROR_MESSAGES.requiredFields });
    }

    try {
        const adminUser = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (!adminUser) {
            return response.status(401).json({ error: ERROR_MESSAGES.invalidCredentials });
        }

        const isPasswordValid = await bcrypt.compare(password, adminUser.password);

        if (!isPasswordValid) {
            return response.status(401).json({ error: ERROR_MESSAGES.invalidCredentials });
        }

        const token = jwt.sign({ userId: adminUser.id }, JWT_SECRET, { expiresIn: '1h' });

        return response.status(200).json({
            message: SUCCESS_MESSAGES.successLogin,
            token,
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: ERROR_MESSAGES.errorLogin });
    }
};

export { loginAdminUser };
