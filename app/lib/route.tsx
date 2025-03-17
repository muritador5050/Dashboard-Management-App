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
    segment: 'dashboard',
    title: 'Dashboard',
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
        segment: 'addProduct',
        title: 'AddProduct',
        icon: <Dot />,
      },
      {
        segment: 'checkout',
        title: 'Checkout',
        icon: <Dot />,
      },
      {
        segment: 'details',
        title: 'Details',
        icon: <Dot />,
      },
      {
        segment: 'editProduct',
        title: 'EditProduct',
        icon: <Dot />,
      },
      {
        segment: 'list',
        title: 'List',
        icon: <Dot />,
      },
      {
        segment: 'shop',
        title: 'Shop',
        icon: <Dot />,
      },
    ],
  },
  {
    title: 'blog',
    icon: <Rss />,
    children: [
      {
        segment: 'details',
        title: 'Details',
        icon: <Dot />,
      },
      {
        segment: 'post',
        title: 'Post',
        icon: <Dot />,
      },
    ],
  },

  {
    title: 'profile',
    segment: 'dashboard/profile',
    icon: <UserRoundPen />,
  },

  {
    title: 'email',
    segment: 'dashboard/email',
    icon: <Mail />,
  },
  {
    title: 'calender',
    segment: 'dashboard/calendar',
    icon: <CalendarFold />,
  },
  {
    title: 'kanban',
    segment: 'dashboard/kanban',
    icon: <SquareKanban />,
  },
  {
    title: 'chat',
    segment: 'dashboard/chat',
    icon: <MessageCircleCode />,
  },
  {
    title: 'notes',
    segment: 'dashboard/notes',
    icon: <Notebook />,
  },
  {
    title: 'contact Table',
    segment: 'dashboard/contactTable',
    icon: <Phone />,
  },
  {
    title: 'contact List',
    segment: 'dashboard/contactList',
    icon: <FileCode />,
  },
  {
    title: 'invoices',
    segment: 'dashboard/invoices',
    icon: <NotebookTabs />,
  },
  {
    kind: 'header',
    title: 'PAGES',
  },
  {
    title: 'pricing',
    segment: 'dashboard/pricing',
    icon: <BadgePercent />,
  },
  {
    title: 'FAQ',
    segment: 'dashboard/faq',
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
