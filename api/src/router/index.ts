import { Express } from "express";
import { sendMessageRouter } from "./ContactEmailSender";
import { IbuildRouter } from "./IbuildRouter";



const ServerRouters = (server: Express): void => {
    server.use('/sendMessage', sendMessageRouter)
    server.use('/ibuildCustomer', IbuildRouter)
};

export default ServerRouters;
