'use client';
import PageTitle from '@/components/pageTitle';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTitle />
      <main>{children}</main>
    </>
  );
}
