import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Calendar, EllipsisIcon, Home, Inbox, Search, Settings } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
    },
    {
        title: "Calendar",
        url: "#",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

const HomeSidebar = () => {
    return (
        <Sidebar collapsible="icon" className="w-52">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuButton size={"lg"} asChild className="group-data-[collapsible=icon]:!h-12">
                        <Link href="/">
                            <Image
                                src={"/logo.svg"}
                                width={32}
                                height={32}
                                alt={"Globluez"}
                            />
                            <h1 className="font-black text-2xl uppercase">Globluez</h1>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent className="py-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className="px-4 group-data-[collapsible=icon]:px-2">
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuButton size={"lg"} className="group-data-[collapsible=icon]:!h-12">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={""} alt={"placeholder name"} />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">placeholder name</span>
                            <span className="truncate text-xs">placeholder@mail.com</span>
                        </div>
                        <EllipsisIcon className="ml-auto size-4"/>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}

export default HomeSidebar;