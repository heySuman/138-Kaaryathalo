import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import ClientProfileDialog from '@/pages/Client/Partials/alert-client-profile-dialog';
import AlertDeleteClient from '@/pages/Client/Partials/alert-delete-client';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { SharedData } from '@/types';
import { IClient } from '@/types/client';
import { Head, usePage } from '@inertiajs/react';

export default function Index() {
    const { client } = usePage<SharedData<{ client: IClient }>>().props;

    const getInitials = useInitials();
    return (
        <AppLayout>
            <Head title="Profile" />
            {!client && <ProfileRequiredCard variant={'client'} />}
            {client && (
                <Card className="mx-auto my-2 w-[90%] overflow-hidden shadow-sm sm:rounded-xl">
                    <div className="flex flex-col items-center px-6 sm:items-start">
                        {/* Profile Picture */}
                        <div className="rounded-full border-4 border-white bg-white">
                            <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full">
                                <Avatar className="h-full w-full object-cover">
                                    <AvatarImage src={client?.profile_picture as string} alt={client.user.name} />
                                    <AvatarFallback>{getInitials(client.user.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-2 space-y-2 border-red-500">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold">{client.user.name}</h1>
                                <ClientProfileDialog client={client} />
                                <AlertDeleteClient />
                            </div>
                            <p className="text-muted-foreground text-lg">{client?.company_name || '--'}</p>
                        </div>
                    </div>
                </Card>
            )}
        </AppLayout>
    );
}
