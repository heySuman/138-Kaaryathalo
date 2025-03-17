import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IProject } from '@/types/freelancer';
import { useForm } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function AlertDeleteProject({ project }: { project: IProject }) {
    const {
        delete: destroy,
        processing,
        reset,
        clearErrors,
    } = useForm<
        Required<{
            password: string;
        }>
    >({ password: '' });

    const deleteCertificate: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('freelancer.project.delete', { project: project }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className={'text-red-500'}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete Project</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete project?</DialogTitle>
                <DialogDescription>
                    Do you want to proceed?
                </DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button variant="destructive" disabled={processing} asChild onClick={deleteCertificate}>
                        <button type="submit">Delete Project</button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
