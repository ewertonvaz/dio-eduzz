"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SENDGRID_TOKEN = exports.RABBIT_DSN = exports.RABBIT_PORT = exports.RABBIT_PASSWORD = exports.RABBIT_USER = exports.RABBIT_HOST = exports.IS_DEVELOPMENT = void 0;
exports.IS_DEVELOPMENT = true;
exports.RABBIT_HOST = 'amqp://rabbitmq';
exports.RABBIT_USER = '';
exports.RABBIT_PASSWORD = '';
exports.RABBIT_PORT = 5672;
exports.RABBIT_DSN = exports.IS_DEVELOPMENT ? `${exports.RABBIT_HOST}` : ``;
exports.SENDGRID_TOKEN = 'Informar seu token Sendgrid';
