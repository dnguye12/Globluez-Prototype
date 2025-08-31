import { SidebarProvider } from "@/components/ui/sidebar"
import HomeNavbar from "./components/home-navbar/HomeNavbar";
import HomeSidebar from "./components/home-sidebar/HomeSidebar";

interface LayoutProps {
    children: React.ReactNode
}

const HomeLayout = ({ children }: LayoutProps) => {
    return (
        <SidebarProvider>
            <HomeSidebar />
            <div className="w-full relative">
                <HomeNavbar />
                <main>{children}</main>
            </div>
        </SidebarProvider>
    );
}

export default HomeLayout;