<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            ALTER TABLE users
            MODIFY COLUMN role
            ENUM('Kaprodi', 'Dosen Koordinator','Dosen Pembimbing','Akademik', 'Mahasiswa', 'Observer', 'Guru', 'Admin')
            NOT NULL
            DEFAULT 'Mahasiswa'
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("
            ALTER TABLE users
            MODIFY COLUMN role
            ENUM('Kaprodi', 'Dosen Koordinator','Dosen Pembimbing','Akademik', 'Mahasiswa', 'Observer', 'Guru')
            NOT NULL
            DEFAULT 'Mahasiswa'
        ");
    }
};
