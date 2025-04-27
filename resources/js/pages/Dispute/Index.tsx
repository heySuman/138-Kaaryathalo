import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Dispute } from '@/types/dispute';

export default function Index({disputes}: { disputes: Dispute[]}) {
    console.log(disputes);
    return (
        <AppLayout>
            <Head title="Disputes" />
        </AppLayout>
    );
}
