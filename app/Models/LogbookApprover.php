<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LogbookApprover extends Model
{
    protected $table = 'logbook_approvers';

    protected $fillable = [
        'logbook_id',
        'approver_id',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    public function logbook(): BelongsTo
    {
        return $this->belongsTo(Logbook::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approver_id');
    }
}
