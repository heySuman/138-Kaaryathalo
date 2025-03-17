import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AlertExperienceForm from '@/pages/Freelancer/partials/popup-dialog/alert-create-experience';
import AlertDeleteExperience from '@/pages/Freelancer/partials/popup-dialog/alert-delete-experience';
import { IFreelancer } from '@/types/freelancer';

export function ExperienceCard({ freelancer }: { freelancer: IFreelancer }) {
    return (
        <Card className="mx-auto my-2 w-[90%] overflow-hidden shadow-sm sm:rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Experience</CardTitle>
                <div className="flex gap-2">
                    <AlertExperienceForm experience={null} />
                </div>
            </CardHeader>
            <CardContent className="mt-2">
                <Separator />
                <div className="flex gap-4 flex-col mt-2">
                    {freelancer.experiences && freelancer.experiences.length > 0
                        ? freelancer.experiences.map((e, i) => (
                              <div className="space-y-1" key={i}>
                                  <div className={'flex items-center'}>
                                      <h3 className="text-xl font-semibold">{e.job_title}</h3>
                                      <div>
                                          <AlertExperienceForm experience={e} />
                                          <AlertDeleteExperience experience={e} />
                                      </div>
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
                        : 'No Experience Added'}
                </div>
            </CardContent>
        </Card>
    );
}
