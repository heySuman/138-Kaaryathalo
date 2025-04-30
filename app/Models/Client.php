<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class Client extends Model
{
    use Notifiable;

    protected $fillable = [
        'user_id',
        'company_name',
        'industry',
        'about',
        'profile_picture',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
