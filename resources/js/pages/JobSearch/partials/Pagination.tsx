import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { JobPosting, PaginatedResponse } from '@/types/job-postings';
import { router } from '@inertiajs/react';

export default function PaginationLinks({ pagination }: { pagination: PaginatedResponse<JobPosting> }) {
    const { current_page, last_page } = pagination;

    const goToPage = (page: number) => {
        if (page < 1 || page > last_page) return;
        router.get(`/jobs-search?page=${page}`);
    };
    return (
        <Pagination className={'my-3'}>
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
    );
}
