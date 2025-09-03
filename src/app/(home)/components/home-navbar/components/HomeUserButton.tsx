"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import { ClapperboardIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

const HomeUserButton = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    const { signOut } = useClerk()

    if (!isLoaded) {
        return <div>...Loading</div>
    }

    if (!isSignedIn) {
        return (
            <Button asChild>
                <Link href={"/sign-in"}>Sign in</Link>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 p-0">
                <DropdownMenuItem className="p-4">
                    <Avatar>
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>{user.username}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 flex flex-col">
                        <p className="text-base font-medium">{user.username}</p>
                        <p className="text-base text-muted-foreground">
                            {user.emailAddresses[0].emailAddress}
                        </p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-4 h-10 text-sm" asChild>
                    <Link href="/studio"><ClapperboardIcon className="mr-1 min-w-6 size-6" /> Studio</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/' })} className="px-4 h-10 text-sm">
                    <LogOutIcon className="mr-1 min-w-6 size-6" /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default HomeUserButton;