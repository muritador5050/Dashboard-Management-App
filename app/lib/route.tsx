import React from 'react';
import { NavigationItem } from './utils';
import {
  Airplay,
  ShoppingBag,
  Rss,
  Dot,
  UserRoundPen,
  Mail,
  CalendarFold,
  SquareKanban,
  MessageCircleCode,
  BadgePercent,
  TableOfContents,
} from 'lucide-react';
export const routes: NavigationItem[] = [
  {
    kind: 'header',
    title: 'HOME',
  },
  {
    title: 'Dashboard',
    segment: '/',
    icon: <Airplay />,
  },

  {
    kind: 'header',
    title: 'APPS',
  },
  {
    title: 'ecommerce',
    icon: <ShoppingBag />,
    children: [
      {
        title: 'Shop',
        segment: 'shop',
        icon: <Dot />,
      },
      {
        title: 'Details',
        segment: 'details',
        icon: <Dot />,
      },
      {
        title: 'List',
        segment: 'list',
        icon: <Dot />,
      },
      {
        title: 'Checkout',
        segment: 'checkout',
        icon: <Dot />,
      },
      {
        title: 'AddProduct',
        segment: 'addProduct',
        icon: <Dot />,
      },
      {
        title: 'EditProduct',
        segment: 'editProduct',
        icon: <Dot />,
      },
    ],
  },
  {
    title: 'blog',
    icon: <Rss />,
    children: [
      {
        title: 'Post',
        segment: 'post',
        icon: <Dot />,
      },
      {
        title: 'Details',
        segment: 'details',
        icon: <Dot />,
      },
    ],
  },

  {
    title: 'profile',
    segment: 'profile',
    icon: <UserRoundPen />,
  },

  {
    title: 'email',
    segment: 'email',
    icon: <Mail />,
  },
  {
    title: 'calender',
    segment: 'calendar',
    icon: <CalendarFold />,
  },
  {
    title: 'kanban',
    segment: 'kanban',
    icon: <SquareKanban />,
  },
  {
    title: 'chat',
    segment: 'chat',
    icon: <MessageCircleCode />,
  },

  {
    kind: 'header',
    title: 'PAGES',
  },
  {
    title: 'pricing',
    segment: 'pricing',
    icon: <BadgePercent />,
  },
  {
    title: 'FAQ',
    segment: 'faq',
    icon: <TableOfContents />,
  },
];
