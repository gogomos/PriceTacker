"use client";
import {Card , CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Header } from './header';
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocials?: boolean;
};

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocials = true,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md bg-white">
            <CardHeader>
                <Header lable={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocials && (
                <CardFooter>
                    <Social/>
                </CardFooter>
                )
            }
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}
                />
            </CardFooter>
        </Card>
    );
}