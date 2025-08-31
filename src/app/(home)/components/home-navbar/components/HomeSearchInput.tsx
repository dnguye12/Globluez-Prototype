import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const HomeSearchInput = () => {
    return (
        <div className="flex-1 relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2 bg-input">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <Input type="text" placeholder="Search" className="shadow-none border-0 focus-visible:ring-0" />
        </div>
    );
}

export default HomeSearchInput;