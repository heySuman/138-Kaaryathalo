import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AlertCertificateForm from '@/pages/Freelancer/partials/popup-dialog/alert-certificate-dialog';
import AlertDeleteCertificate from '@/pages/Freelancer/partials/popup-dialog/alert-delete-certificate';
import { IFreelancer } from '@/types/freelancer';
import ExpandableImage from '@/pages/Freelancer/partials/click-to-expand';

export function CertificateCard({ freelancer }: { freelancer: IFreelancer }) {
    return (
        <Card className="mx-auto w-[90%] overflow-hidden border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Certifications</CardTitle>
                <div className="flex gap-2">
                    <AlertCertificateForm certificate={null} />
                </div>
            </CardHeader>
            <CardContent className="border-0">
                <Separator />
                <div className="mt-2 flex flex-col gap-4">
                    {freelancer.certificates && freelancer.certificates.length > 0
                        ? freelancer.certificates.map((c, i) => (
                              <div className="space-y-1" key={i}>
                                  {c.certificate_url && <ExpandableImage src={c.certificate_url as string} alt={'certificate'} />}
                                  <div className={'flex items-center gap-3'}>
                                      <h3 className="font-semibold">{c.title}</h3>
                                      <div className={'flex items-center gap-2'}>
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
