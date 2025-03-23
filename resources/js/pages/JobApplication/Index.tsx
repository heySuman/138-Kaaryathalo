import AppLayout from "@/layouts/app-layout";
import {Head, usePage} from "@inertiajs/react";
import {PaginatedResponse} from "@/types/job-postings";
import {JobApplication} from "@/types/job-application";

export default function Index({applications}:{applications: PaginatedResponse<JobApplication>}){
    return (
        <AppLayout>
            <Head title={'Job Applications'}/>
        </AppLayout>
    )
}
