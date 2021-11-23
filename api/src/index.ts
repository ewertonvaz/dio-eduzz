import { createConnection } from "typeorm";
import { Channel, connect, Connection, ConsumeMessage } from "amqplib";
import { RABBIT_DSN, SENDGRID_TOKEN } from "./settings";
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(SENDGRID_TOKEN);
var connection: Connection = undefined;
var channel: Channel = undefined;

(async() => {
    await createConnection();
    import('./app')

    connection = await connect(RABBIT_DSN);
    channel = await connection.createChannel();

    channel.assertQueue('user.password.reset');
    channel.assertQueue('user.password.confirmation');
    channel.prefetch(1);
    channel.consume('user.password.reset', resetMsg, { noAck: false });
    channel.consume('user.password.confirmation', confirmMsg, { noAck: false });
})();

const resetMsg = async msg => {
    if (!msg) return;
    const json = msg.content.toString() || '';
    const { name, email, link } = JSON.parse(json); 
    const body = {
        to: `${name} <${email}>`,
        from: 'ewerton.vaz@gmail.com',
        subject: 'Recuperacao de senha',
        html: `<p>Olá... acesse o link abaixo para resetar a sua senha</p>
               <p><a href='${link}'>${link}</a></p>`,
    }
    try {
        await sendgrid.send(body);
        channel.ack(msg);
    } catch (err: any) {
        console.log(err.response.body);
        channel.nack(msg);
    }
};

const confirmMsg = async msg => {
    if (!msg) return;
    const json = msg.content.toString() || '';
    const { name, email, link } = JSON.parse(json); 
    const body = {
        to: `${name} <${email}>`,
        from: 'ewerton.vaz@gmail.com',
        subject: 'Confirmacao de senha',
        html: `<p>Olá... Seja bem vindo(a) ao sistema</p>
               <p>Mas... por favor acesse o link abaixo para confirmar a sua senha</p>
               <p><a href='${link}'>${link}</a></p>`,
    }
    try {
        await sendgrid.send(body);
        channel.ack(msg);
    } catch (err: any) {
        console.log(err.response.body);
        channel.nack(msg);
    }
};