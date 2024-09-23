import { Express } from "express";
import { sendMessageRouter } from "./ContactEmailSender";
import { IbuildRouter } from "./IbuildRouter";
import { SendMail } from "./WelcomeEmailSender";
import { IbuildRouterLoan } from "./ibuildRouterLoan";



const ServerRouters = (server: Express): void => {
    server.use('/sendMessage', sendMessageRouter)
    server.use('/ibuildCustomer', IbuildRouter)
    server.use('/SendMail', SendMail)
    server.use('/ibuildLoan', IbuildRouterLoan)
};

export default ServerRouters;
