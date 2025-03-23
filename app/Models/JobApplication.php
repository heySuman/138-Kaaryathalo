<?php

namespace App\Models;
use App\Models\Freelancer\Freelancer;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    protected $fillable = [
        'job_id',
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
    public function job()
    {
        return $this->belongsTo(JobPosting::class, 'job_id');
    }

    /**
     * Relationship with Freelancer
     */
    public function freelancer()
    {
        return $this->belongsTo(Freelancer::class, 'freelancer_id');
    }
}
