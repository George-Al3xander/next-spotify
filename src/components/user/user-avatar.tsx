import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function UserAvatar({
    src,
    name,
    imageClassName,
}: {
    src?: string | null;
    name: string;
    imageClassName?: React.ComponentProps<"div">["className"];
}) {
    return (
        <Avatar
            title={name}
            className={cn(
                "h-8 w-8 transition-all hover:scale-110",
                imageClassName,
            )}
        >
            <AvatarImage src={src || ""} alt={`${name}'s profile picture`} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
            <span className="sr-only">{`${name}'s profile picture`}</span>
        </Avatar>
    );
}

export default UserAvatar;
