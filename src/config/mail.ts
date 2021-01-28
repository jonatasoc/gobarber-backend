interface MailConfigInterface {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'financeiro@ibpfe.com.br',
      name: 'Financeiro IBPFÉ',
    },
  },
} as MailConfigInterface;
