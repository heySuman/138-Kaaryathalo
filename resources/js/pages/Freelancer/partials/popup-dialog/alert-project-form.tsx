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
import { IProject } from '@/types/freelancer';
import { useForm } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { FormEvent, useState } from 'react';

export enum Status {
    INPROGRESS = 'in progress',
    COMPLETED = 'completed',
}

export default function AlertProjectForm({ project }: { project: IProject | null }) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, patch, processing, errors, reset } = useForm<Partial<IProject>>({
        title: project?.title || '',
        description: project?.description || '',
        project_url: project?.project_url || '',
        start_date: project?.start_date || '',
        end_date: project?.end_date || '',
        status: project?.status || Status.INPROGRESS,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (project) {
            patch(route('freelancer.project.update', { project: project }), {
                onSuccess: () => setIsOpen(false),
            });
        } else {
            post(route('freelancer.project.store'), {
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
                    {project ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span className="sr-only">Add Project</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{project ? 'Edit Project' : 'Add Project'}</AlertDialogTitle>
                    <AlertDialogDescription>
                        <form onSubmit={submit} className="flex flex-col gap-3">
                            <div>
                                <label className="font-medium">
                                    Project Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    placeholder="Enter project title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && <p className="text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="font-medium">
                                    Project Description <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    placeholder="Enter project description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                />
                                {errors.description && <p className="text-red-500">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="font-medium">
                                    Project URL <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    placeholder="Enter project URL"
                                    value={data.project_url}
                                    onChange={(e) => setData('project_url', e.target.value)}
                                    required
                                />
                                {errors.project_url && <p className="text-red-500">{errors.project_url}</p>}
                            </div>

                            <div>
                                <label className="font-medium">Start Date</label>
                                <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                                {errors.start_date && <p className="text-red-500">{errors.start_date}</p>}
                            </div>

                            <div>
                                <label className="font-medium">End Date</label>
                                <Input type="date" value={data.end_date || ''} onChange={(e) => setData('end_date', e.target.value)} />
                                {errors.end_date && <p className="text-red-500">{errors.end_date}</p>}
                            </div>

                            <div>
                                <label className="font-medium">
                                    Project Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="mt-2 w-full rounded-md border p-2"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as Status)}
                                    required
                                >
                                    <option value="in progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {errors.status && <p className="text-red-500">{errors.status}</p>}
                            </div>
                        </form>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={submit} disabled={processing}>
                        {processing ? (project ? 'Updating...' : 'Adding...') : project ? 'Update' : 'Add'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
