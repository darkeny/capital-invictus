import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import ERROR_MESSAGES from "../../constants/error-messages";

const prisma = new PrismaClient();

const deleteCustomer = async (request: Request, response: Response) => {
    const id = request.params.id;

    try {
        const customer = await prisma.customer.findUnique({
            where: { id: id },
        });

        if (!customer) {
            return response.status(404).json({ error: ERROR_MESSAGES.notFound });
        }

        await prisma.$transaction([
            prisma.grantor.deleteMany({ where: { customerId: id } }),
            prisma.loan.deleteMany({ where: { customerId: id } }),
            prisma.customer.delete({ where: { id: id } }),
        ]);

        return response.status(200).json({ message: 'Cliente eliminado com sucesso' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        return response.status(400).json({ error: ERROR_MESSAGES.failedDeletion });
    }
};

export { deleteCustomer };
