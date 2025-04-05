import type React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { Milestone } from '@/types/milestone';
import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Create() {
    const [date, setDate] = useState<Date>();
    const { data, setData, post } = useForm<Partial<Milestone>>({
        title: '',
        description: '',
        due_date: undefined,
        job_posting_id: Number(usePage().props.jobPostingId),
        status: 'pending',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('milestones.store', { jobPosting: data.job_posting_id }), {
            onSuccess: () => {
                toast('Milestone Added!');
            },
        });
    };

    return (
        <AppLayout>
            <Head title={'Create Milestone'} />
            <div className="z-10 pt-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Button variant={'link'} className={'p-0 text-slate-600'} onClick={() => window.history.back()}>
                            <ArrowLeft /> Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-2 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black">Create Milestone</h2>
                            <p className={'text-slate-600'}>Please fill up the following form to create milestone</p>
                        </div>
                    </div>

                    <Separator />

                    <div className="py-10">
                        <Card className="border-0 px-0 shadow-none">
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-3 px-0">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Milestone Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="e.g., Website Design Phase 1"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe what needs to be delivered for this milestone"
                                            rows={3}
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <div className="space-y-2">
                                            <Label>Deadline</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {date ? format(date, 'PPP') : 'Select a date'}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        onSelect={(selectedDate) => {
                                                            setDate(selectedDate);
                                                            setData('due_date', selectedDate?.toISOString());
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2 pt-6">
                                    <Button type="submit">Create Milestone</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster />
        </AppLayout>
    );
}
