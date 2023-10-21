"use client"
import { useEffect, useState } from 'react';
import { User, Link, Skeleton } from "@nextui-org/react";
import { clientSupabase as supabase } from '../utils/supabase';
import { UserIcon } from '@heroicons/react/20/solid';

export const UserInfo = () => {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (!error && user) {
                setUserData(user);
            }
        };
        getUser();
    }, []);

    if (!userData) {
        return <div className="max-w-[240px] w-full flex items-center gap-3 opacity-60">
            <div>
                <Skeleton className="flex rounded-full w-10 h-10" />
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-full rounded-lg" />
            </div>
        </div>;
    }

    const { app_metadata, user_metadata, email } = userData;

    return (
        <div className='hidden md:inline-block'>
            {app_metadata.provider === 'google' ? (
                <User
                    name={user_metadata.full_name || 'Unknown'}
                    description={(
                        <Link href={`mailto:${email}`} className='text-xs' isExternal>
                            {email}
                        </Link>
                    )}
                    avatarProps={{
                        src: user_metadata.avatar_url
                    }}
                />
            ) : (
                <User
                    name={email.split('@')[0]}
                    description={(
                        <Link href={`mailto:${email}`} className='text-xs' isExternal>
                            {email}
                        </Link>
                    )}
                    avatarProps={{
                        classNames: {
                            base: "bg-slate-300",
                        },
                        fallback:
                            <UserIcon className="w-6 h-6 text-slate-100" fill="currentColor" size={20} />
                        ,
                    }}
                />
            )}
        </div>
    );
};
