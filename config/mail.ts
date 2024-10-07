import env from '#start/env';
import { defineConfig, transports } from '@adonisjs/mail';

const mailConfig = defineConfig({
  default: 'smtp',

  /**
   * O objeto "mailers" pode ser usado para configurar múltiplos transportes de e-mail,
   * cada um usando um transporte diferente ou o mesmo transporte com opções diferentes.
   */
  from: {
    address: '',
    name: '',
  },

  replyTo: {
    address: '',
    name: '',
  },

  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
      secure: true,

      /**
       * Descomente o bloco auth se o seu servidor SMTP necessitar de autenticação.
       */
      auth: {
        type: 'login',
        user: env.get('SMTP_USERNAME') || '',
        pass: env.get('SMTP_PASSWORD') || '',
      },
    }),
  },

 /* tls: {},

  ignoreTLS: false,
  requireTLS: false,

  pool: false,
  maxConnections: 5,
  maxMessages: 100,
*/
});

export default mailConfig;

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
