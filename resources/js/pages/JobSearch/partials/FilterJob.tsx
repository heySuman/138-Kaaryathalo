import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterType } from '@/types/filter';
import { ICategory } from '@/types/freelancer';
import { InertiaFormProps } from '@inertiajs/react';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

export default function FilterJob({
    data,
    setData,
    handleSubmit,
    category,
}: {
    data: InertiaFormProps<FilterType>;
    setData: (key: keyof FilterType, value: FilterType[keyof FilterType]) => void;
    handleSubmit: (e: React.FormEvent) => void;
    category: ICategory[];
}) {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <Card>
            <CardContent className="px-4">
                <form onSubmit={handleSubmit} className="">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                        <div className={'flex items-center'}>
                            <Search className="text-gray-500" />
                            <Input
                                className="max-w-[500px] border-0 shadow-none ring-0 transition-none focus:border-0 focus:shadow-none focus-visible:ring-transparent"
                                placeholder="Search Job..."
                                name="title"
                                value={data.data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                        </div>
                        <div className={'flex flex-wrap'}>
                            <Button
                                type="button"
                                className="flex items-center justify-between text-gray-500"
                                onClick={() => setShowFilters(!showFilters)}
                                variant={'ghost'}
                            >
                                Advanced Filter
                                <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                            </Button>
                            <Button type="submit">Search</Button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="space-y-3">
                            <div>
                                <Label className={'mb-2'}>Category</Label>
                                <Select value={String(data.data.category_id)} onValueChange={(value) => setData('category_id', Number(value))}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {category && category.map((i) => <SelectItem value={String(i.id)}>{i.category}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label className={'mb-2'}>Experience</Label>
                                <Select value={data.data.experience} onValueChange={(value) => setData('experience', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Experience Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fresher">Fresher</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className={'mb-2'}>Min. Budget</Label>
                                    <Input
                                        type="number"
                                        name="minBudget"
                                        value={data.data.minBudget || ""}
                                        onChange={(e) => setData('minBudget', Number(e.target.value))}
                                    />
                                </div>

                                <div>
                                    <Label className={'mb-2'}>Max. Budget</Label>
                                    <Input
                                        type="number"
                                        name="maxBudget"
                                        value={data.data.maxBudget || ""}
                                        onChange={(e) => setData('maxBudget', Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
