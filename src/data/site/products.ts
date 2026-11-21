import { ACCOUNTING_APP_URL } from '@/data/site/accounting';

export const companionProducts = [
  {
    key: 'hris',
    name: 'LokaKasir HRIS',
    shortName: 'HRIS',
    use: 'Tim & gaji',
    url: 'https://hris.lokakasir.id/',
  },
  {
    key: 'billing',
    name: 'LokaKasir Billing',
    shortName: 'Billing',
    use: 'Rental PS & PC',
    url: 'https://billing.lokakasir.id/',
  },
  {
    key: 'accounting',
    name: 'Loka Kasir Accounting',
    shortName: 'Accounting',
    use: 'Pembukuan',
    url: ACCOUNTING_APP_URL,
  },
] as const;
