import { Poppins } from "next/font/google";

import {cn} from "@/lib/utils";
import { Label } from "@headlessui/react";

const font = Poppins ({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    lable: string;
}

export const Header = ({
    lable,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 justify-between items-center">
           <h2 className={cn("text-3xl font-semibold",font.className)}>
            Auth
            </h2>
            <p className="text-sm text-muted-foreground">
                {lable}
            </p>
        </div>
    );
}