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
        Schema::create('pendaftaran_plps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('keminatan_id');
            $table->enum('nilai_plp_1', ['A', 'B+', 'B', 'C+', 'C', 'D', 'E','Belum']);
            $table->enum('nilai_micro_teaching', ['A', 'B+', 'B', 'C+', 'C', 'D', 'E','Belum']);
            $table->unsignedBigInteger('pilihan_smk_1');
            $table->unsignedBigInteger('pilihan_smk_2');
            $table->unsignedBigInteger('penempatan')->nullable();
            $table->unsignedBigInteger('dosen_pembimbing')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('keminatan_id')->references('id')->on('keminatans')->onDelete('cascade');
            $table->foreign('pilihan_smk_1')->references('id')->on('smks')->onDelete('cascade');
            $table->foreign('pilihan_smk_2')->references('id')->on('smks')->onDelete('cascade');
            $table->foreign('penempatan')->references('id')->on('smks')->onDelete('cascade');
            $table->foreign('dosen_pembimbing')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftaran_plps');
    }
};
