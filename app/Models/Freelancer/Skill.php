<?php

namespace App\Models\Freelancer;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    protected $fillable = [
      'category_id',
      'name'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
