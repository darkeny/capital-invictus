import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import ERROR_MESSAGES from '../../constants/error-messages';
import SUCCESS_MESSAGES from '../../constants/success-messages';
import env from 'dotenv';

env.config();

const prisma = new PrismaClient();

const IBuildLoan = async (request: Request, response: Response) => {
    
    const {
        customerId,
        loanAmount,
        paymentTerm,
        paymentMethod,
        accountNumber,
        collateral,
        installments,
    } = request.body;

    // Verifique se customerId está presente
    if (!customerId) {
        return response.status(400).json({ error: "customerId é obrigatório." });
    }

    try {
        // Verificar se o cliente existe
        const customer = await prisma.customer.findUnique({
            where: { id: customerId },
        });

        if (!customer) {
            return response.status(404).json({ error: 'Cliente não encontrado.' });
        }

        // Verificar se o cliente já tem um empréstimo ativo
        const activeLoan = await prisma.loan.findUnique({
            where: { customerId: customer.id, isActive: "ACTIVE" },
        });

        if (activeLoan) {
            return response.status(400).json({ error: 'Este cliente já possui um empréstimo ativo.' });
        }

        const balanceDue = loanAmount * 1.30;
        
        // Criação do empréstimo
        const createLoanData: Prisma.LoanCreateInput = {
            loanAmount: parseFloat(loanAmount),
            paymentTerm,
            paymentMethod,
            accountNumber,
            collateral,
            installments,
            balanceDue: balanceDue,
            customer: {
                connect: { id: customer.id }, // Associando o empréstimo ao cliente
            },
        };

        const BuildLoan = await prisma.loan.create({
            data: createLoanData,
        });

        return response.status(201).json({
            message: SUCCESS_MESSAGES.successCreating,
            payload: BuildLoan,
        });
    } catch (error: any) {
        console.error('Error creating loan:', error);
        return response.status(500).json({ error: ERROR_MESSAGES.errorCreating });
    }
};

export { IBuildLoan };
