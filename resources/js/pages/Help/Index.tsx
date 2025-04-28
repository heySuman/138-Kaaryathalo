import { Button } from '@/components/ui/button';
import Layout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({}) {
    return (
        <Layout>
            <Head title="Index" />
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black">Help</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div className={'rounded border p-4'}>
                            <h2 className="mb-2 text-xl font-black">Report Abuse</h2>
                            <p className={'max-w-2xl'}>
                                If you think, as a freelancer you are not getting the promised payment in time, please report it to us. Or, as a
                                client, you are not getting the quality work or the project in time, please report it to us.
                            </p>

                            <div className={'mt-5 flex gap-2'}>
                                <Link href={route('disputes.index')}>
                                    <Button variant={'outline'}>View Your Reports</Button>
                                </Link>
                                <Link href={route('disputes.create')}>
                                    <Button>Submit a Report</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
