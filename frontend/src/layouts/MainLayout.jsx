import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-50/40 text-zinc-900 selection:bg-zinc-900 selection:text-white antialiased">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;