import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AlertDeleteProject from '@/pages/Freelancer/partials/popup-dialog/alert-delete-project';
import AlertProjectForm from '@/pages/Freelancer/partials/popup-dialog/alert-project-form';
import { IFreelancer } from '@/types/freelancer';
import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';

export function ProjectCard({ freelancer }: { freelancer: IFreelancer }) {
    return (
        <Card className="mx-auto my-2 w-[90%] overflow-hidden shadow-sm sm:rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-2xl">Projects</CardTitle>
                <div className="flex gap-2">
                    <AlertProjectForm project={null} />
                </div>
            </CardHeader>
            <CardContent className="">
                <Separator />
                <div className="mt-2 flex flex-col gap-4">
                    {freelancer.projects && freelancer.projects.length > 0
                        ? freelancer.projects.map((p, i) => (
                              <div className="space-y-1" key={i}>
                                  <div className={'flex items-center gap-2'}>
                                      <h3 className="text-xl font-semibold">{p.title}</h3>
                                      <div>
                                          <AlertProjectForm project={p} />
                                          <AlertDeleteProject project={p} />
                                      </div>
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
                        : 'No Projects added!'}
                </div>
            </CardContent>
        </Card>
    );
}
