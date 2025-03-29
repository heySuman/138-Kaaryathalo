import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import JobPostingForm from '@/pages/JobPosting/partials/JobPostingForm';
import { ICategory } from '@/types/freelancer';
import { Head } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import {Toaster} from "sonner";

export default function Create({ categories }: { categories: ICategory[] }) {
    console.log(categories);
    return (
        <AppLayout>
            <Head title={'Create Job Posting'} />

            <div className="z-10 pt-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Button variant={'link'} className={'p-0 text-slate-600'} onClick={() => window.history.back()}>
                            <ArrowLeft /> Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Create Job Posting</h2>
                            <p className={'text-slate-600'}>Please fill up the following form to find the best talent</p>
                        </div>
                    </div>

                    <Separator />

                    <div className="py-10">{<JobPostingForm categories={categories} />}</div>
                </div>
            </div>
        </AppLayout>
    );
}
