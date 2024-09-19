import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import ERROR_MESSAGES from '../../constants/error-messages';
import SUCCESS_MESSAGES from '../../constants/success-messages';
import axios from 'axios';
import env from 'dotenv';

env.config();

const prisma = new PrismaClient();
const API_URL = String(process.env.API_BASE_URL);

const IBuild = async (request: Request, response: Response) => {
    const {
        fullName,
        birthDate,  // Alterei de dateOfBirth para birthDate para refletir os dados recebidos
        email,
        contact,
        gender,
        address,
        incomeSource,
        monthlyIncome,
        bankInfo,
        bankNumber,
        identityNumber,
        grantorName,
        grantorID,
        grantorContact,
    } = request.body;

    try {
        // Verificar se o campo birthDate está presente e no formato adequado
        if (!birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
            return response.status(400).json({ error: 'Data de nascimento inválida. Use o formato YYYY-MM-DD.' });
        }

        // Convertendo a string da data diretamente para um objeto Date
        const parsedDateOfBirth = new Date(birthDate);

        // Verificando se a data é válida
        if (isNaN(parsedDateOfBirth.getTime())) {
            return response.status(400).json({ error: 'Data de nascimento inválida.' });
        }

        // Criação do cliente e, opcionalmente, do outorgante (grantor)
        const createCustomerData: Prisma.CustomerCreateInput = {
            fullName,
            identityNumber,
            dateOfBirth: parsedDateOfBirth,  // Usando a data convertida para objeto Date
            email,
            contact,
            gender,
            address,
            incomeSource,
            monthlyIncome: parseFloat(monthlyIncome), // Garantindo que seja um número
            bankInfo,
            bankNumber,
            // Se houver dados de outorgante, ele será criado junto com o cliente
            grantor: grantorName ? {
                create: {
                    grantorName: grantorName,
                    grantorID: grantorID,
                    grantorContact: grantorContact,               }
            } : undefined
        };

        const BuildCustomer = await prisma.customer.create({
            data: createCustomerData,
            include: {
                grantor: true,
            },
        });

        // Enviar um email de boas-vindas (caso necessário)
        // await axios.post(`${API_URL}/SendMail`, { email });

        return response.status(201).json({
            message: SUCCESS_MESSAGES.successCreating,
            payload: BuildCustomer,
        });
    } catch (error: any) {
        console.error('Error creating customer:', error);

        // Verificar se o erro é de chave duplicada (P2002)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Verificar se o campo 'email' violou a unicidade
            if (error.code === 'P2002' && error.meta && (error.meta.target as string[]).includes('email')) {
                return response.status(400).json({ error: ERROR_MESSAGES.duplicateEmail });
            }

            // Verificar se o campo 'identityNumber' violou a unicidade
            if (error.code === 'P2002' && error.meta && (error.meta.target as string[]).includes('identityNumber')) {
                return response.status(400).json({ error: ERROR_MESSAGES.duplicateIdentityNumber });
            }
        }

        return response.status(500).json({ error: ERROR_MESSAGES.errorCreating });
    }
};

export { IBuild };
