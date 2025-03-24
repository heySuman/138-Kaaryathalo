export type FilterType = {
    title: string;
    category_id: number | null;
    experience: 'fresher' | 'intermediate' | 'expert';
    minBudget: number;
    maxBudget: number;
};
