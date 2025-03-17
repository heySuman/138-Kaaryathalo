import {
    AlertDialog,
    AlertDialogAction,
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
import { IExperience } from '@/types/freelancer';
import { useForm } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function AlertExperienceForm({ experience }: { experience: IExperience | null }) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, patch, processing, errors, reset } = useForm<Partial<IExperience>>({
        job_title: experience?.job_title || '',
        company_name: experience?.company_name || '',
        description: experience?.description || '',
        start_date: experience?.start_date || '',
        end_date: experience?.end_date || '',
    });

    // Handle form submission
    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (experience) {
            patch(route('freelancer.experience.update', { experience: experience.id }), {
                onSuccess: () => {
                    reset();
                    setIsOpen(false);
                },
            });
        } else {
            post(route('freelancer.experience.store'), {
                onSuccess: () => {
                    reset();
                    setIsOpen(false);
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8">
                    {experience ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span className="sr-only">Add Experience</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{experience ? 'Edit Experience' : 'Add Experience'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <Label>
                                    Job Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    placeholder="Job Title"
                                    value={data.job_title}
                                    required
                                    className="text-black"
                                    onChange={(e) => setData('job_title', e.target.value)}
                                />
                                {errors.job_title && <p className="text-red-500">{errors.job_title}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Company Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    placeholder="Company Name"
                                    value={data.company_name}
                                    required
                                    className="text-black"
                                    onChange={(e) => setData('company_name', e.target.value)}
                                />
                                {errors.company_name && <p className="text-red-500">{errors.company_name}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Job Description <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    placeholder="Job Description"
                                    value={data.description}
                                    required
                                    className="text-black"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-red-500">{errors.description}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>
                                    Start Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="date"
                                    value={data.start_date}
                                    required
                                    className="text-black"
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <p className="text-red-500">{errors.start_date}</p>}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>End Date</Label>
                                <Input type="date" value={data.end_date || ''} onChange={(e) => setData('end_date', e.target.value)} />
                                {errors.end_date && <p className="text-red-500">{errors.end_date}</p>}
                            </div>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={submit} disabled={processing}>
                        {processing ? (experience ? 'Updating...' : 'Adding...') : experience ? 'Update' : 'Add'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
