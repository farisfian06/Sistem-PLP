<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Smk extends Model
{
    protected $fillable = [
        'name',
    ];

    public function pendaftaranPlps()
    {
        return $this->hasMany(PendaftaranPlp::class, 'penempatan');
    }

    public function penanggungJawabs()
    {
        return $this->hasMany(PenanggungJawab::class);
    }
}
