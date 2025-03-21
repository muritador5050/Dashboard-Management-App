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
  Notebook,
  Phone,
  FileCode,
  NotebookTabs,
  BadgePercent,
  TableOfContents,
  ShieldEllipsis,
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
        title: 'Details',
        segment: 'details',
        icon: <Dot />,
      },
      {
        title: 'Post',
        segment: 'post',
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
    title: 'notes',
    segment: 'notes',
    icon: <Notebook />,
  },
  {
    title: 'contact Table',
    segment: 'contactTable',
    icon: <Phone />,
  },
  {
    title: 'contact List',
    segment: 'contactList',
    icon: <FileCode />,
  },
  {
    title: 'invoices',
    segment: 'invoices',
    icon: <NotebookTabs />,
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
  {
    title: 'widgets',
    icon: <ShieldEllipsis />,
    children: [
      {
        title: 'Appswidgets',
        segment: 'appsWidgets',
        icon: <Dot />,
      },
      {
        title: 'Banners',
        segment: 'banners',
        icon: <Dot />,
      },
      {
        title: 'Cards',
        segment: 'cards',
        icon: <Dot />,
      },
      {
        title: 'DataWidgets',
        segment: 'dataWidgets',
        icon: <Dot />,
      },
      {
        title: 'Feedwidgets',
        segment: 'feedWidgets',
        icon: <Dot />,
      },
    ],
  },
];
