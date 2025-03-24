import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import FilterJob from '@/pages/JobSearch/partials/FilterJob';
import JobCard from '@/pages/JobSearch/partials/JobCard';
import PaginationLinks from '@/pages/JobSearch/partials/Pagination';
import { FilterType } from '@/types/filter';
import { JobIndexPageProps, JobPosting } from '@/types/job-postings';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Index({ jobs, freelancer, category }: JobIndexPageProps) {
    const data = useForm<FilterType>({
        title: '',
        category_id: null,
        experience: 'fresher',
        maxBudget: 0,
        minBudget: 0,
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Filter only non-empty fields
        const filterData: Partial<FilterType> = {};

        if (data.data.title && data.data.title.trim() !== '') {
            filterData.title = data.data.title.trim();
        }

        if (data.data.category_id && data.data.category_id > 0) {
            filterData.category_id = data.data.category_id;
        }

        if (data.data.minBudget && data.data.minBudget > 0) {
            filterData.minBudget = data.data.minBudget;
        }

        if (data.data.maxBudget && data.data.maxBudget > 0) {
            filterData.maxBudget = data.data.maxBudget;
        }

        if (data.data.experience && data.data.experience !== 'fresher') {
            filterData.experience = data.data.experience;
        }

        router.get(route('jobs.search'), filterData, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            only: ['jobs'],
        });
    };

    return (
        <AppLayout>
            <Head title="Job Postings" />
            {!freelancer && <ProfileRequiredCard variant={'freelancer'} />}
            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Search Jobs</h2>
                        </div>
                    </div>

                    <Separator className="mb-4" />

                    <FilterJob data={data} setData={data.setData} handleSubmit={handleSubmit} category={category} />

                    {/*  Show the listings*/}
                    <div className={'my-10 flex flex-col gap-3'}>
                        {jobs.data.length > 0 ? (
                            jobs.data.map((job: JobPosting) => <JobCard job={job} key={job.id} />)
                        ) : (
                            <h2 className={'text-center text-gray-500 italic'}>No jobs found!</h2>
                        )}
                    </div>

                    {/*  Pagination */}
                    <PaginationLinks pagination={jobs} />
                </div>
            </div>
        </AppLayout>
    );
}
