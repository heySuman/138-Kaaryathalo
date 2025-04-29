<?php

namespace App\Models;

use App\Models\Freelancer\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobPosting extends Model
{
    protected $fillable = [
        'title',
        'description',
        'expiry_date',
        'timeline',
        'budget',
        'skills',
        'experience_level',
        'status',
        'visibility',
        'payment_type',
        'attachments',
        'category_id',
        'client_id',
    ];

    protected $casts = [
        'skills' => 'array',
        'attachments' => 'array',
        'expiry_date' => 'datetime',
    ];

    /**
     * Get the category associated with the job posting.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the client associated with the job posting.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function application(): HasMany
    {
        return $this->HasMany(JobApplication::class);
    }

    public function milestones(): HasMany{
        return $this->HasMany(Milestone::class);
    }

    public function disputes(): HasMany
    {
        return $this->hasMany(Dispute::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(RatingReview::class);
    }
}
