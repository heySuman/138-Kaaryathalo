import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AlertDeleteCertificate from '@/pages/Freelancer/partials/popup-dialog/alert-delete-certificate';
import AlertCertificateForm from '@/pages/Freelancer/partials/popup-dialog/alert-certificate-dialog';
import { IFreelancer } from '@/types/freelancer';

export function CertificateCard({ freelancer }: { freelancer: IFreelancer }) {
    return (
        <Card className="mx-auto my-4 w-[90%] overflow-hidden shadow-sm sm:rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">Certifications</CardTitle>
                <div className="flex gap-2">
                    <AlertCertificateForm certificate={null} />
                </div>
            </CardHeader>
            <CardContent className="">
                <Separator />
                <div className="mt-2 flex flex-col gap-4">
                    {freelancer.certificates && freelancer.certificates.length > 0
                        ? freelancer.certificates.map((c, i) => (
                              <div className="space-y-1" key={i}>
                                  <div className={'flex items-center'}>
                                      <h3 className="font-semibold">{c.title}</h3>
                                      <div>
                                          <AlertCertificateForm certificate={c} />
                                          <AlertDeleteCertificate certificate={c} />
                                      </div>
                                  </div>
                                  <p className="text-muted-foreground text-sm">{c.issuer}</p>
                                  <p className="text-muted-foreground text-xs">{c.issued_date}</p>
                              </div>
                          ))
                        : 'No Certificates added!'}
                </div>
            </CardContent>
        </Card>
    );
}
