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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useInitials } from '@/hooks/use-initials';
import { SharedData } from '@/types';
import { IClient } from '@/types/client';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

export default function ClientProfileDialog({ client }: { client: IClient | null }) {
    const getInitials = useInitials();
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, patch, processing, errors, reset } = useForm<{
        company_name: string;
        industry: string;
        about: string;
        profile_picture: File | null;
        _method?: string;
    }>({
        company_name: client?.company_name || '',
        industry: client?.industry || '',
        about: client?.about || '',
        profile_picture: null,
        _method: client ? 'PATCH' : 'POST',
    });

    const [isOpen, setIsOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(client?.profile_picture || null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('profile_picture', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('company_name', data.company_name);
        formData.append('industry', data.industry);
        formData.append('about', data.about);
        if (data.profile_picture instanceof File) {
            formData.append('profile_picture', data.profile_picture);
        }
        if (client) {
            formData.append('_method', 'PATCH');
            post(route('client.profile.update'), {
                data: formData,
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Profile updated successfully');
                    reset();
                    setIsOpen(false);
                },
                onError: () => {
                    toast.error('Failed to update profile. Please try again.');
                },
            });
        } else {
            post(route('client.profile.create'), {
                data: formData,
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Profile created successfully');
                    reset();
                    setIsOpen(false);
                },
                onError: () => {
                    toast.error('Failed to create profile. Please try again.');
                },
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant={client ? 'ghost' : 'default'} className="border" size="sm" onClick={() => setIsOpen(true)}>
                    {client ? <Pencil /> : 'Create Profile'}
                </Button>
            </AlertDialogTrigger>

            {isOpen && (
                <AlertDialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {client ? 'Edit Your Company Profile' : 'Create Your Company Profile'}
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>

                        <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={previewUrl || undefined} alt={auth.user.name} />
                                    <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Label htmlFor="profile_picture" className="cursor-pointer hover:underline">
                                        {client && previewUrl ? 'Change Profile Picture' : 'Upload Profile Picture'}
                                    </Label>
                                    <Input
                                        type="file"
                                        id="profile_picture"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mt-1"
                                    />
                                    {errors.profile_picture && (
                                        <p className="mt-1 text-red-500">{errors.profile_picture}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="company_name">
                                    Company Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="company_name"
                                    placeholder="Your Company Name"
                                    value={data.company_name}
                                    required
                                    className="text-black dark:text-white"
                                    onChange={(e) => setData('company_name', e.target.value)}
                                />
                                {errors.company_name && (
                                    <p className="text-red-500">{errors.company_name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="industry">
                                    Industry <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="industry"
                                    placeholder="Tech, Marketing, etc."
                                    value={data.industry}
                                    required
                                    className="text-black dark:text-white"
                                    onChange={(e) => setData('industry', e.target.value)}
                                />
                                {errors.industry && (
                                    <p className="text-red-500">{errors.industry}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="about">
                                    About Your Company <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                    id="about"
                                    placeholder="Describe your company, goals, and uniqueness..."
                                    value={data.about}
                                    rows={5}
                                    required
                                    className="text-black dark:text-white"
                                    onChange={(e) => setData('about', e.target.value)}
                                />
                                {errors.about && <p className="text-red-500">{errors.about}</p>}
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : client ? 'Update Profile' : 'Create Profile'}
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogHeader>
                </AlertDialogContent>
            )}
        </AlertDialog>
    );
}
