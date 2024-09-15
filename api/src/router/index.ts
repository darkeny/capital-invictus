import { Express } from "express";
import { sendMessageRouter } from "./ContactEmailSender";



const ServerRouters = (server: Express): void => {
    server.use('/sendMessage', sendMessageRouter)
};

export default ServerRouters;
