<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Milestone extends Model
{
    protected $with = ['job'];

    protected $fillable = [
        'job_posting_id',
        'title',
        'description',
        'due_date',
        'status',
    ];

    public function job(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }
}
