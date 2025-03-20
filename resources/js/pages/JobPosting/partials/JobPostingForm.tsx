import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ICategory } from '@/types/freelancer';
import { JobPosting } from '@/types/job-postings';
import { Link, useForm } from '@inertiajs/react';
import { X } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface JobPostingFormProps {
    categories: ICategory[];
}

export default function JobPostingForm({ categories }: JobPostingFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Partial<JobPosting>>({
        title: '',
        category: undefined,
        category_id: 0,
        description: '',
        budget: 0,
        experience_level: 'fresher',
        payment_type: 'hourly',
        skills: [],
        status: 'pending',
        timeline: 'less than a month',
        visibility: 'public',
    });

    const [skillInput, setSkillInput] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('client.job-posting.store'), {
            onSuccess: () => reset(),
            onError: () => {
                console.log(errors);
            },
        });
    };

    const addSkill = () => {
        if (skillInput.trim() !== '' && !data.skills?.includes(skillInput.trim())) {
            setData('skills', [...(data.skills || []), skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (index: number) => {
        const updatedSkills = [...(data.skills || [])];
        updatedSkills.splice(index, 1);
        setData('skills', updatedSkills);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                    id="title"
                    type="text"
                    name="title"
                    value={data.title || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('title', e.target.value)}
                    required
                />
                {errors.title && <InputError message={errors.title} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <ReactQuill
                    theme="snow"
                    value={data.description || ''}
                    onChange={(value) => setData('description', value)}
                    placeholder="Describe the job requirements and responsibilities"
                />
                {errors.description && <InputError message={errors.description} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Select
                    onValueChange={(value) => setData('timeline', value as 'less than a month' | 'less than three months' | 'more than three months')}
                    defaultValue={data.timeline}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Timeline" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="less than a month">Less than a month</SelectItem>
                        <SelectItem value="less than three months">Less than three months</SelectItem>
                        <SelectItem value="more than three months">More than three months</SelectItem>
                    </SelectContent>
                </Select>
                {errors.timeline && <InputError message={errors.timeline} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                    id="budget"
                    type="number"
                    name="budget"
                    step="0.01"
                    value={data.budget || ''}
                    onChange={(e) => setData('budget', parseFloat(e.target.value))}
                    required
                />
                {errors.budget && <InputError message={errors.budget} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="payment_type">Payment Type</Label>
                <Select onValueChange={(value) => setData('payment_type', value as 'fixed' | 'hourly')} defaultValue={data.payment_type || 'fixed'}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fixed">Fixed</SelectItem>
                        <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                </Select>
                {errors.payment_type && <InputError message={errors.payment_type} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="category_id">Category</Label>
                <Select onValueChange={(value) => setData('category_id', parseInt(value))} defaultValue={data.category_id?.toString()}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && <InputError message={errors.category_id} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="skills">Skills Required</Label>
                <div className="flex space-x-2">
                    <Input
                        id="skills"
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a skill and press Enter"
                    />
                    <Button type="button" onClick={addSkill} variant="secondary">
                        Add
                    </Button>
                </div>
                {data.skills && data.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {data.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                                {skill}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                    onClick={() => removeSkill(index)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                )}
                {errors.skills && <InputError message={errors.skills} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="experience_level">Experience Level</Label>
                <Select
                    onValueChange={(value) => setData('experience_level', value as 'fresher' | 'intermediate' | 'expert')}
                    defaultValue={data.experience_level}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="fresher">Fresher</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                </Select>
                {errors.experience_level && <InputError message={errors.experience_level} className="mt-2" />}
            </div>

            <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select onValueChange={(value) => setData('visibility', value as 'public' | 'private')} defaultValue={data.visibility || 'public'}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                </Select>
                {errors.visibility && <InputError message={errors.visibility} className="mt-2" />}
            </div>

            <div className="mt-6 flex items-center justify-end gap-4">
                <Link href={route('client.job-posting.index')}>
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" disabled={processing}>
                    Create Job Posting
                </Button>
            </div>
        </form>
    );
}
