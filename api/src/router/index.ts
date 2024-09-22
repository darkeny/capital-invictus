import { Express } from "express";
import { sendMessageRouter } from "./ContactEmailSender";
import { IbuildRouter } from "./IbuildRouter";
import { SendMail } from "./WelcomeEmailSender";



const ServerRouters = (server: Express): void => {
    server.use('/sendMessage', sendMessageRouter)
    server.use('/ibuildCustomer', IbuildRouter)
    server.use('/SendMail', SendMail)
};

export default ServerRouters;
