import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {IExperience} from "@/types/freelancer";
import {Trash} from "lucide-react";

export default function AlertDeleteExperience({ experience }: { experience: IExperience }) {
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

    const deleteExperience: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('freelancer.experience.delete', { experience: experience.id }), {
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
                <Button variant="ghost" className={'text-red-500'} size="sm">
                    <Trash className="h-4 w-4 border" />
                    <span className="sr-only">Delete Experience</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete experience?</DialogTitle>
                <DialogDescription></DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button variant="destructive" disabled={processing} asChild onClick={deleteExperience}>
                        <button type="submit">Delete Experience</button>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
