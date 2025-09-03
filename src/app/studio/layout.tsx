import { SidebarProvider } from "@/components/ui/sidebar"
import HomeNavbar from "./components/studio-navbar/StudioNavbar";
import HomeSidebar from "./components/studio-sidebar/StudioSidebar";

interface LayoutProps {
    children: React.ReactNode
}

const StudioLayout = ({ children }: LayoutProps) => {
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

export default StudioLayout;