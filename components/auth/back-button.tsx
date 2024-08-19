"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
    label: string; // Corrected typo here
    href: string;
}

export const BackButton = ({ label, href }: BackButtonProps) => {
    return (
        <Button
            size="sm"
            className="text-black font-normal w-full"
            variant="link"
            asChild
        >
            <Link href={href}>
                {label} 
            </Link>
        </Button>
    );
};
