<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Logbook extends Model
{
    protected $fillable = [
        'user_id',
        'tanggal',
        'keterangan',
        'mulai',
        'selesai',
        'dokumentasi',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function logbookApprovers()
    {
        return $this->hasMany(LogbookApprover::class);
    }
}
