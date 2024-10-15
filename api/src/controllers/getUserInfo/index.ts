// src/controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // Importar o cliente Prisma

const prisma = new PrismaClient(); // Instanciar o cliente Prisma

const getUserInfo = async (req: Request, res: Response) => {
    try {
        const user = req.user; // Contém o payload JWT
        const userId = user.userId; // Obter o ID do usuário do token

        if (!user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        // Buscar os dados do cliente usando o ID do usuário
        const customer = await prisma.customer.findUnique({
            where: { id: userId },
            include: { loan: true }, // Incluir dados do empréstimo na busca
        });

        if (!customer) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        // Retornar os dados do usuário, incluindo os novos campos
        return res.status(200).json({
            user: {
                userId: customer.id,
                email: customer.email,
                fullName: customer.fullName, // Adicionando fullName
                incomeSource: customer.incomeSource, // Adicionando incomeSource
                loan: customer.loan ? {
                    loanAmount: customer.loan.loanAmount, // Adicionando loanAmount
                    balanceDue: customer.loan.balanceDue, // Saldo devido
                    isActive: customer.loan.isActive, // Adicionando isActive
                    createdAt: customer.loan.createdAt, // Adicionando createdAt
                    totalDays: 30
                } : null, // Se não houver empréstimo, retornamos null
                iat: user.iat,
                exp: user.exp,
            },
        });
    } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
};

export { getUserInfo };
