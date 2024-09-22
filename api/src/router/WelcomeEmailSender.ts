import { Router } from "express";
import RegisterController from "../controllers/welcome/mailConfig";
const router = Router();

router.post('/', async (req, res) => {
    const { email } = req.body;

    console.log('Received Data:', { email });

    const registerController = new RegisterController();

    try {
        await registerController.registerUser(email);

        res.status(200).send({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Failed to send email.' });
    }
});

export { router as SendMail };
