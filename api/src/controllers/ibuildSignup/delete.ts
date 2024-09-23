import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import ERROR_MESSAGES from "../../constants/error-messages";

const prisma = new PrismaClient();

const deleteCustomer = async (request: Request, response: Response) => {
    const id  = request.params.id;

    try {
        const companyExists = await prisma.customer.findUnique({
            where: { id: id },
        });

        if (!companyExists) {
            return response.status(404).json({ error: ERROR_MESSAGES.notFound });
        }

        await prisma.$transaction([
            prisma.grantor.deleteMany({ where: { customerId: id } }),
            prisma.customer.delete({ where: { id: id } }),
        ]);

        return response.status(200).json({ message: 'Empresa eliminada com sucesso' });
    } catch (error) {
        return response.status(400).json({ error: ERROR_MESSAGES.failedDeletion });
    }
};

export { deleteCustomer };
