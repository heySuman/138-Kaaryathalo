import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import Layout from '@/layouts/app-layout';
import { IFreelancer } from '@/types/freelancer';
import { PaginatedResponse } from '@/types/job-postings';
import { Head, Link, router } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function Index({
    freelancers,
    filters,
}: {
    freelancers: PaginatedResponse<IFreelancer>;
    filters: { name: string | null | undefined };
}) {
    console.log(freelancers);
    const { current_page, last_page } = freelancers;

    const goToPage = (page: number) => {
        if (page < 1 || page > last_page) return;
        router.get(`/client/talents?page=${page}`);
    };

    const [search, setSearch] = useState(filters.name || '');

    const submitSearch = () => {
        router.get(route('talent-search.index'), { name: search }, { preserveScroll: true });
    };

    return (
        <Layout>
            <Head title="Search Talents" />

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black">Find talents</h2>
                        </div>
                    </div>

                    <div className={'flex gap-2 items-center my-6'}>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name"
                        className={'max-w-1/3'}/>
                        <Button onClick={submitSearch}>Search</Button>
                    </div>

                    <div className="mb-5 flex items-center justify-between">
                        <div className={'grid grid-cols-3 gap-4'}>
                            {freelancers.data &&
                                freelancers.data.map((freelancer) => (
                                    <div className={'flex gap-3 rounded-md border p-3 shadow'} key={freelancer.id}>
                                        <div>
                                            <img
                                                src={freelancer.profile_picture as string}
                                                alt={freelancer.user.name}
                                                className="h-20 w-20 rounded-full border"
                                            />
                                        </div>
                                        <div>
                                            <Link href={route('talent-search.show', freelancer.id)} className="hover:underline" key={freelancer.id}>
                                                <h2 className={'text-md font-bold'}>{freelancer.user.name}</h2>
                                            </Link>

                                            <p className={'text-xl font-bold'}>{freelancer.headline}</p>

                                            <div className={'flex items-center gap-2'}>
                                                <Star fill={'#FFC700'} size={16} />
                                                <p>4.5/5</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button variant="outline" onClick={() => goToPage(current_page - 1)} disabled={current_page === 1}>
                                    Previous
                                </Button>
                            </PaginationItem>

                            {Array.from({ length: last_page }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink isActive={page === current_page} onClick={() => goToPage(page)}>
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <Button variant="outline" onClick={() => goToPage(current_page + 1)} disabled={current_page === last_page}>
                                    Next
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </Layout>
    );
}
