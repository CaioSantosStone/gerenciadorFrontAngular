import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Aulas',
    icon: 'nb-compose',
    children: [
      {
        title: 'Visualizar aulas',
        link: '/pages/class/list',
      }, {
        title: 'Cadastrar aula',
        link: '/pages/class/register',
      },
    ]
  },
  {
    title: 'Bate Papo',
    icon: 'nb-email',
    children: [
      {
        title: 'Mensagens',
        link: '/pages/chat/messages',
      }
    ]
  },
  {
    title: 'Conteúdo',
    icon: 'nb-compose',
    children: [
      {
        title: 'Visualizar conteúdos',
        link: '/pages/content/manager',
      }, {
        title: 'Cadastrar conteúdos',
        link: '/pages/content/register',
      },
    ]
  },
  {
    title: 'Usuários',
    icon: 'nb-compose',
    children: [
      {
        title: 'Consulta de usuários',
        link: '/pages/user/list',
      }, {
        title: 'Cadastrar usuário',
        link: '/pages/user/register',
      }
    ]
  },
  {
    title: 'Avaliações fisicas',
    icon: 'nb-compose',
    children: [
      {
        title: 'Visualizar avaliações',
        link: '/pages/evaluation/evaluation-list',
      },
      {
        title: 'Cadastrar avaliação',
        link: '/pages/evaluation/register',
      },
    ]
  },
];
