import InputError from '@/components/input-error';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { IFreelancer } from '@/types/freelancer';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function FreelancerProfileDialog({ freelancer }: { freelancer: IFreelancer | null }) {
    const getInitials = useInitials();
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, patch, processing, errors, reset } = useForm<
        Partial<Omit<IFreelancer, 'user' | 'experiences' | 'projects' | 'certificates' | 'skills'>>
    >({
        headline: freelancer?.headline || '',
        about: freelancer?.about || '',
        profile_picture: null,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        // Create FormData object to properly handle file uploads
        const formData = new FormData();
        formData.append('headline', data.headline || '');
        formData.append('about', data.about || '');

        // Only append if there's a file
        if (data.profile_picture instanceof File) {
            formData.append('profile_picture', data.profile_picture);
        }

        const options = {
            data: formData,
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        };

        if (freelancer) {
            patch(route('freelancer.profile.update'), options);
        } else {
            post(route('freelancer.profile.create'), options);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('profile_picture', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={freelancer ? 'ghost' : 'default'}>{freelancer ? <Pencil /> : <p>Create Profile</p>}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>Create Your Freelancer Profile</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                    <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-4">
                        {!freelancer && (
                            <div className="grid gap-2">
                                <Label htmlFor="avatar">Avatar</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={previewUrl as string} alt={auth.user.name} />
                                        <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <Input type="file" id="avatar" className="" onChange={handleFileChange} />

                                <InputError className="mt-2" message={errors.profile_picture} />
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <Label>
                                What do you do? <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                placeholder="Frontend Developer"
                                value={data.headline}
                                required
                                className={'text-black'}
                                onChange={(e) => setData('headline', e.target.value)}
                            />
                            {errors.headline && <p className="text-red-500">{errors.headline}</p>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Summarize Yourself <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                placeholder="Describe your experience, skills, and what makes you unique as a freelancer..."
                                value={data.about}
                                rows={5}
                                required
                                className={'text-black'}
                                onChange={(e) => setData('about', e.target.value)}
                            />
                            {errors.about && <p className="text-red-500">{errors.about}</p>}
                        </div>
                    </form>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={submit} disabled={processing}>
                        {processing ? 'Saving...' : 'Save'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
