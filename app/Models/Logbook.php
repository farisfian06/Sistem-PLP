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
        'dokumentasi'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
