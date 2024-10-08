import { Express } from "express";
import { sendMessageRouter } from "./ContactEmailSender";
import { IbuildRouter } from "./IbuildRouter";
import { SendMail } from "./WelcomeEmailSender";
import { IbuildRouterLoan } from "./ibuildRouterLoan";
import { AdminRouter } from "./adminUser";
import { AdminLogin } from "./AdminLogin";
import { NewsletterRouter } from "./Newsletter";



const ServerRouters = (server: Express): void => {
    server.use('/sendMessage', sendMessageRouter)
    server.use('/ibuildCustomer', IbuildRouter)
    server.use('/SendMail', SendMail)
    server.use('/ibuildLoan', IbuildRouterLoan)
    server.use('/admin/users', AdminRouter)
    server.use('/admin/login', AdminLogin)
    server.use('/newsletter', NewsletterRouter)
};

export default ServerRouters;
