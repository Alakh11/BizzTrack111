
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-refrens-bg flex flex-col">
      <Sidebar />
      <div className="lg:ml-64 flex flex-col flex-grow">
        <Header />
        <main className="container mx-auto px-4 py-6 flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
