import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function UserAvatar({ src, name }: { src?: string | null; name: string }) {
    return (
        <Avatar title={name} className="h-8 w-8 transition-all hover:scale-110">
            <AvatarImage src={src || ''} alt={`${name}'s profile picture`} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
            <span className="sr-only">{`${name}'s profile picture`}</span>
        </Avatar>
    );
}

export default UserAvatar;
