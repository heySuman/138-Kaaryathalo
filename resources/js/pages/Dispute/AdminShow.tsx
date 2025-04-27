import Layout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { Dispute } from '@/types/dispute';

export default function AdminShow({dispute}: { dispute: Dispute}) {
    return (
        <Layout>
            <Head title="AdminShow"/>

        </Layout>
    )
}
