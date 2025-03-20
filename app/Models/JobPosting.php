<?php

namespace App\Models;

use App\Models\Freelancer\Category;
use Illuminate\Database\Eloquent\Model;

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
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the client associated with the job posting.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
