<?php

namespace App\Models;
use App\Models\Freelancer\Freelancer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobApplication extends Model
{
    protected $fillable = [
        'job_posting_id',
        'freelancer_id',
        'cover_letter',
        'proposed_budget',
        'status',
        'attachments',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    /**
     * Relationship with JobPosting
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class, 'job_posting_id');
    }

    /**
     * Relationship with Freelancer
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class, 'freelancer_id');
    }

    public function milestones(): HasMany
    {
        return $this->hasMany(Milestone::class, 'job_application_id');
    }
}
