<?php

namespace App\Models;

use App\Models\Freelancer\Freelancer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RequestPayment extends Model
{

    protected $fillable = [
        'client_id',
        'job_id',
        'freelancer_id',
        'amount',
        'status',
    ];

    /**
     * The user who requested the payment (likely the client).
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    /**
     * The job this payment is for.
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(JobPosting::class);
    }

    /**
     * The freelancer requesting the payment.
     */
    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }
}
