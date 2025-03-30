<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Milestone extends Model
{
    protected $fillable = [
        'job_posting_id',
        'title',
        'description',
        'due_date',
        'status',
    ];

    public function jobs(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }
}
