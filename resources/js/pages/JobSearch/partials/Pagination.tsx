import { JobPosting, PaginatedResponse } from '@/types/job-postings';
import { Link } from '@inertiajs/react';

export default function PaginationLinks({ pagination }: { pagination: PaginatedResponse<JobPosting> }) {
    return (
        <div className="my-2 flex-wrap sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm leading-5 text-gray-700">
                Showing <span className="font-medium">{pagination.from}</span>/<span className="font-medium">{pagination.to} </span>(
                <span className="font-medium">{pagination.total}</span> total)
            </p>
            <div>
                <span className="relative z-0 inline-flex rounded-md shadow-sm">
                    <span>
                        {pagination.links.map((link, index) => {
                            const key = link.label + index;
                            if (link.active) {
                                return (
                                    <span key={key}>
                                        <span
                                            className="relative -ml-px inline-flex cursor-default items-center border border-gray-300 px-4 py-2 text-sm leading-5 font-medium"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></span>
                                    </span>
                                );
                            }

                            if (link.url === null) {
                                return (
                                    <span key={key}>
                                        <span
                                            className="relative -ml-px inline-flex items-center border border-gray-300 px-4 py-2 text-sm leading-5 font-medium"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></span>
                                    </span>
                                );
                            }

                            return (
                                <span key={key}>
                                    <Link
                                        href={link.url}
                                        preserveState={true}
                                        className="relative -ml-px inline-flex items-center border border-gray-300 px-4 py-2 text-sm leading-5 font-medium  hover:bg-gray-300"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></Link>
                                </span>
                            );
                        })}
                    </span>
                </span>
            </div>
        </div>
    );
}
