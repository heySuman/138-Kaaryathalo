import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { SharedData } from '@/types';
import { IFreelancer } from '@/types/freelancer';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Index() {
    const { freelancer } = usePage<SharedData<{ freelancer: IFreelancer }>>().props;
    const getInitials = useInitials();
    return (
        <AppLayout>
            <Head title={freelancer.user.name} />
            <div>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-4">
                    <div className="mb-2 flex items-center justify-between">
                        <Button variant={'link'} onClick={() => window.history.back()} className={'p-0'}>
                            {' '}
                            <ArrowLeft /> Back
                        </Button>
                    </div>
                </div>
            </div>
            {freelancer && (
                <section>
                    <div className="mx-auto my-5 w-[90%] overflow-hidden">
                        <div className="flex flex-wrap items-center gap-2 px-6 sm:items-start">
                            {/* Profile Picture */}
                            <div className="rounded-full border-4 border-white bg-white">
                                <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full border">
                                    <Avatar className="h-full w-full object-cover shadow-lg">
                                        <AvatarImage src={freelancer?.profile_picture as string} alt={freelancer.user.name} />
                                        <AvatarFallback>{getInitials(freelancer.user.name)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">{freelancer.user.name}</h1>
                                </div>
                                <p className="text-md mb-2">{freelancer.headline}</p>
                                <p className="text-muted-foreground max-w-4xl">{freelancer.about}</p>
                            </div>
                        </div>
                    </div>

                    {/* --------------------- Certificate-------------------*/}
                    <Card className="mx-auto w-[90%] overflow-hidden border-0 shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl">Certifications</CardTitle>
                        </CardHeader>
                        <CardContent className="border-0">
                            <Separator />
                            <div className="mt-2 flex flex-col gap-4">
                                {freelancer.certificates && freelancer.certificates.length > 0
                                    ? freelancer.certificates.map((c, i) => (
                                          <div className="space-y-1" key={i}>
                                              <div className={'flex items-center gap-3'}>
                                                  <h3 className="font-semibold">{c.title}</h3>
                                              </div>
                                              <p className="text-muted-foreground text-sm">{c.issuer}</p>
                                              <p className="text-muted-foreground text-xs">{c.issued_date}</p>
                                          </div>
                                      ))
                                    : `${freelancer.user.name} have not added any certificates.`}
                            </div>
                        </CardContent>
                    </Card>
                    {/*------------------------------- Experience -------------------------------*/}
                    <Card className="mx-auto mt-2 w-[90%] overflow-hidden border-0 shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl">Experiences</CardTitle>
                        </CardHeader>
                        <CardContent className="mt-2">
                            <Separator />
                            <div className="mt-2 flex flex-col gap-4">
                                {freelancer.experiences && freelancer.experiences.length > 0
                                    ? freelancer.experiences.map((e, i) => (
                                          <div className="space-y-1" key={i}>
                                              <div className={'flex items-center'}>
                                                  <h3 className="text-xl font-semibold">{e.job_title}</h3>
                                              </div>
                                              <p className="text-md text-muted-foreground">{e.company_name}</p>
                                              <p className="text-md text-muted-foreground">
                                                  {e.start_date} - {e.end_date}
                                              </p>
                                              <div className="pt-2">
                                                  <p className="text-md">{e.description}</p>
                                              </div>
                                          </div>
                                      ))
                                    : `${freelancer.user.name} have not added any experience information.`}
                            </div>
                        </CardContent>
                    </Card>
                    {/*------------------------------ Projects ----------------------------------------*/}
                    <Card className="mx-auto mt-2 w-[90%] overflow-hidden border-0 shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-2xl">Projects</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <Separator />
                            <div className="mt-2 flex flex-col gap-4">
                                {freelancer.projects && freelancer.projects.length > 0
                                    ? freelancer.projects.map((p, i) => (
                                          <div className="space-y-1" key={i}>
                                              <div className={'flex items-center gap-2'}>
                                                  <h3 className="text-xl font-semibold">{p.title}</h3>
                                              </div>
                                              <Badge variant={'secondary'} className="text-md text-muted-foreground">
                                                  {p.status}
                                              </Badge>
                                              <div className="pt-1">
                                                  <p className="text-sm">{p.description}</p>
                                              </div>
                                              <div className="pt-2">
                                                  {p.project_url && (
                                                      <Link href={p.project_url} className="flex items-center text-sm font-medium text-[#0a66c2]">
                                                          <ExternalLink className="mr-1 h-3 w-3" />
                                                          View project
                                                      </Link>
                                                  )}
                                              </div>
                                          </div>
                                      ))
                                    : `${freelancer.user.name} have not added any projects.`}
                            </div>
                        </CardContent>
                    </Card>
                </section>
            )}
        </AppLayout>
    );
}
