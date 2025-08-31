import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HomeSearchInput from "./components/HomeSearchInput";
import HomeThemeToggle from "./components/HomeThemeToggle";
import { Button } from "@/components/ui/button";

const HomeNavbar = () => {
    return ( 
        <nav className="sticky top-0 left-0 right-0 h-16 bg-background flex items-center px-2 pr-5 z-50">
            <div className="flex items-center gap-4 w-full">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-9"/>
                <HomeSearchInput />
                <Separator orientation="vertical" className="h-9"/>
                <HomeThemeToggle />
                <Separator orientation="vertical" className="h-9"/>
                <Button disabled>Login</Button>
            </div>
        </nav>
     );
}
 
export default HomeNavbar;