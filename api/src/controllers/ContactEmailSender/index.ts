// src/controllers/SendMessageController.ts
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import Mailer from '../../service/mail/mailer';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const emailList = process.env.EMAIL_LIST?.split(',') || [];

const sendMessageController = async (req: Request, res: Response) => {
  const { subject, message, email } = req.body;

  if (!subject || !message || !email) {
    return res.status(400).json({ error: 'Subject, message, and email are required' });
  }

  try {
    await sendMessage(subject, message, email);
    return res.status(200).json({ message: 'Client Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: 'Failed to send client message' });
  }
};

const sendMessage = async (subject: string, message: string, senderEmail: string) => {
  try {
    const mailer = new Mailer();
    const text = `Mensagem de: ${senderEmail}\n\n${message}`;
    const html = `<p>Mensagem de: ${senderEmail}</p><p>${message}</p>`;

    for (const email of emailList) {
      const subjectMail = `Caixa do Cliente: ${subject}`;
      await mailer.send(email, subjectMail, text, html);
    }
  } catch (error) {
    console.error('Error sending client message:', error);
    throw new Error('Failed to send client message');
  }
};

export { sendMessageController, sendMessage };
