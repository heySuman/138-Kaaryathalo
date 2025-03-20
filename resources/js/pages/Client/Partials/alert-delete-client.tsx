import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash } from 'lucide-react';

export default function AlertDeleteClient() {
    const {
        delete: destroy,
        processing,
        reset,
        clearErrors,
    } = useForm();

    const deleteCertificate: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('client.profile.delete'), {
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
                    <span className="sr-only">Delete Profile</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete your profile?</DialogTitle>
                <DialogDescription>
                    Once you delete profile, all jobs, projects and other resources created by you will be deleted. Do you want to proceed?
                </DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button variant="destructive" disabled={processing} asChild onClick={deleteCertificate}>
                        <button type="submit">Delete Profile</button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
