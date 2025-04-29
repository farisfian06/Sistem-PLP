<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PenanggungJawab extends Model
{
    protected $table = 'penanggung_jawabs';

    protected $fillable = [
        'nama',
        'nip',
        'notel',
        'status',
        'pangkat',
        'norek',
        'norek_an',
        'nama_bank',
        'smk_id',
    ];

    public function smk()
    {
        return $this->belongsTo(Smk::class);
    }
}
