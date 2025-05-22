import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ICertificate } from '@/types/freelancer';
import { useForm } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function AlertCertificateForm({ certificate }: { certificate: ICertificate | null }) {
    const { data, setData, post, processing, errors, reset } = useForm<Partial<ICertificate>>({
        title: certificate?.title || '',
        certificate_url: certificate?.certificate_url || null,
        issued_date: certificate?.issued_date || '',
        issuer: certificate?.issuer || '',
        _method: certificate ? 'PATCH' : 'POST',
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('certificate_url', file);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (certificate) {
            post(route('freelancer.certificate.update', certificate.id), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setIsOpen(false);
                    toast.success('Certificate updated successfully');
                },
                onError: () => {
                    toast.error('Unable to update the certificate, please try again');
                },
            });
        } else {
            post(route('freelancer.certificate.store'), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setIsOpen(false);
                    toast.success('Certificate added successfully');
                },
                onError: (e) => {
                    console.log(e);
                    toast.error('Could not add the certificate, please try again');
                },
            });
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 border" onClick={() => setIsOpen(true)}>
                    {certificate ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span className="sr-only">{certificate ? 'Edit Certificate' : 'Add Certificate'}</span>
                </Button>
            </AlertDialogTrigger>
            {isOpen && (
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{certificate ? 'Edit Certificate' : 'Add New Certificate'}</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-4">
                            <div>
                                <Label>
                                    Certificate Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    placeholder="Certificate Title"
                                    value={data.title}
                                    required
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <Label>
                                    Issuer <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    placeholder="Certificate Issuer"
                                    value={data.issuer}
                                    required
                                    onChange={(e) => setData('issuer', e.target.value)}
                                />
                                {errors.issuer && <p className="text-red-500">{errors.issuer}</p>}
                            </div>

                            <div>
                                <Label>
                                    Issued Date <span className="text-red-500">*</span>
                                </Label>
                                <Input type="date" value={data.issued_date} required onChange={(e) => setData('issued_date', e.target.value)} />
                                {errors.issued_date && <p className="text-red-500">{errors.issued_date}</p>}
                            </div>

                            <div>
                                <Label>Certificate Image</Label>
                                <Input type="file" accept="image/*" onChange={handleFileChange} />
                                {errors.certificate_url && <p className="text-red-500">{errors.certificate_url}</p>}
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                                <Button type={'submit'} disabled={processing}>
                                    {processing ? 'Saving...' : certificate ? 'Update' : 'Add'}
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogHeader>
                </AlertDialogContent>
            )}
        </AlertDialog>
    );
}
