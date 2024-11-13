import { Express } from "express";
import { IbuildRouter } from "./IbuildRouter";
import { SendMail } from "./WelcomeEmailSender";
import { IbuildRouterLoan } from "./ibuildRouterLoan";
import { AdminRouter } from "./adminUser";
import { AdminLogin } from "./AdminLogin";
import { NewsletterRouter } from "./Newsletter";
import { UserLogin } from "./ClientsLogin";
import { UserAuthRouter } from "./UserRoutes";
import { SendMessage } from "./ContactEmailSender";



const ServerRouters = (server: Express): void => {
    server.use('/sendMessage', SendMessage)
    server.use('/ibuildCustomer', IbuildRouter) // endeponit dos usuarios
    server.use('/SendMail', SendMail)
    server.use('/ibuildLoan', IbuildRouterLoan) // endeponit dos emprestimos dos usuarios
    server.use('/admin/users', AdminRouter)
    server.use('/admin/login', AdminLogin) 
    server.use('/user/login', UserLogin) // endeponit de login que leva os usuarios para o painel deles
    server.use('/newsletter', NewsletterRouter);
    server.use('/me', UserAuthRouter);    
};

export default ServerRouters;
