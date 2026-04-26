import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import CartSidebar from "@/components/CartSidebar";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <WhatsAppFloat />
    <CartSidebar />
  </div>
);

export default Layout;
