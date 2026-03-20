import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar />
      <Header title={title} />
      <main className="ml-64 pt-16 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
