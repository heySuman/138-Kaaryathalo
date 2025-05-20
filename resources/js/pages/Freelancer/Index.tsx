import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { CertificateCard } from '@/pages/Freelancer/partials/certificate-card';
import { ExperienceCard } from '@/pages/Freelancer/partials/experience-card';
import ProfileRequiredCard from '@/pages/Freelancer/partials/popup-dialog/alert-create-profile';
import { ProfileCard } from '@/pages/Freelancer/partials/profile-card';
import { ProjectCard } from '@/pages/Freelancer/partials/project-card';
import { RenderStars } from '@/pages/JobPosting/partials/FreelancerCard';
import { IFreelancer } from '@/types/freelancer';
import { Review } from '@/types/job-postings';
import { Head } from '@inertiajs/react';
import { AlertCircleIcon } from 'lucide-react';

export default function Index({ freelancer, reviews }: { freelancer: IFreelancer; reviews: Review[] }) {
    return (
        <AppLayout>
            <Head title="Profile" />
            {!freelancer && <ProfileRequiredCard variant={'freelancer'} />}
            {freelancer && (freelancer.certificates.length === 0 || freelancer.projects.length === 0 || freelancer.experiences.length === 0) ? (
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
                    <Card className="mx-auto w-[90%] overflow-hidden border-0 shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl">Rating & Reviews</CardTitle>
                        </CardHeader>
                        <CardContent className="border-0">
                            <Separator />
                            <div className="mt-2 flex flex-col gap-4">
                                {reviews && reviews.length > 0
                                    ? reviews.map((review, i) => (
                                          <div className="space-y-1" key={i}>
                                              <div className={'flex items-center gap-3'}>
                                                  <h3 className="text-md font-semibold">{review.review}</h3>

                                                  <RenderStars rating={review.rating} />
                                              </div>
                                              <p className="text-muted-foreground text-md">{review.reviewer?.name}</p>
                                          </div>
                                      ))
                                    : `${freelancer.user.name} have not added any reviews.`}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            )}
        </AppLayout>
    );
}
