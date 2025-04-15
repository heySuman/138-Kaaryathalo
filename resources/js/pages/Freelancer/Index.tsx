import AppLayout from '@/layouts/app-layout';
import { CertificateCard } from '@/pages/Freelancer/partials/certificate-card';
import { ExperienceCard } from '@/pages/Freelancer/partials/experience-card';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { ProfileCard } from '@/pages/Freelancer/partials/profile-card';
import { ProjectCard } from '@/pages/Freelancer/partials/project-card';
import { SharedData } from '@/types';
import { IFreelancer } from '@/types/freelancer';
import { Head, usePage } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

export default function Index() {
    const { freelancer } = usePage<SharedData<{ freelancer: IFreelancer }>>().props;
    console.log(freelancer);
    return (
        <AppLayout>
            <Head title="Profile" />
            {!freelancer && <ProfileRequiredCard variant={'freelancer'} />}
            {freelancer.certificates.length === 0 || freelancer.projects.length === 0 || freelancer.experiences.length === 0 ? (
                <div className={'text-muted flex items-center gap-4 bg-black p-4 dark:bg-white'}>
                    <AlertCircleIcon className={'text-red-500'} />
                    <p>You need to complete the profile before you apply to the jobs.</p>
                </div>
            ) : (
                ''
            )}
            {freelancer && (
                <section>
                    <ProfileCard freelancer={freelancer} />
                    <CertificateCard freelancer={freelancer} />
                    <ExperienceCard freelancer={freelancer} />
                    <ProjectCard freelancer={freelancer} />
                </section>
            )}
        </AppLayout>
    );
}
