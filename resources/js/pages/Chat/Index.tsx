import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';

type Props = {
    users: User[];
};

export default function Index({ users }: Props) {
    console.log(users);
    return (
        <AppLayout>
            <Head title="Chat" />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="mb-2 text-3xl font-black">Chat</h2>
                            <p className={'text-gray-500'}>Talk to your peers.</p>
                        </div>
                    </div>

                    <Separator />
                    <div>
                        {users.map((user) => (
                            <div className={'my-2 border-b p-5'} key={user.id}>
                                <Link href={route('chat.show', user.id)}>
                                    <h1 className={'font-black'}>{user.name}</h1>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
