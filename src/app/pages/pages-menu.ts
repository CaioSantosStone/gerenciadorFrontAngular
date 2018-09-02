import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Consulta Alunos',
    icon: 'nb-compose',
    children: [
      {
        title: 'Consulta Alunos',
        link: '/pages/get-alunos/option-get-alunos',
      }
    ]
  }
];
