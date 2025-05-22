import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { router, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProfilePictureDialog({
                                                 isOpen,
                                                 setIsOpen,
                                                 currentPicture,
                                                 userName,
                                             }: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    currentPicture: string;
    userName: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        profile_picture: null as File | null,
        _method: 'PATCH',
    });

    const [previewUrl, setPreviewUrl] = useState<string>(currentPicture);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (!file) return;

        setData('profile_picture', file);

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!data.profile_picture) {
            toast.error('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', data.profile_picture);
        formData.append('_method', 'PATCH');

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        post(route('freelancer.profile.update-profile-picture'), {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Profile picture updated!');
                setIsOpen(false);
                router.reload();
                reset();
            },
            onError: () => {
                toast.error(errors.profile_picture);
            },
        });
    };

    useEffect(() => {
        if (!isOpen) {
            setPreviewUrl(currentPicture);
            reset();
        }
    }, [isOpen, currentPicture, reset]);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Update Profile Picture</AlertDialogTitle>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" encType="multipart/form-data">
                    <div className="flex items-center gap-4">
                        <img
                            src={previewUrl}
                            alt={userName}
                            className="h-20 w-20 rounded-full object-cover border"
                        />
                        <div className="flex-1">
                            <Label htmlFor="profile_picture">Select New Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                id="profile_picture"
                                onChange={handleFileChange}
                            />
                            {errors.profile_picture && (
                                <p className="text-red-500 text-sm mt-1">{errors.profile_picture}</p>
                            )}
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel type="button" onClick={() => setIsOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
