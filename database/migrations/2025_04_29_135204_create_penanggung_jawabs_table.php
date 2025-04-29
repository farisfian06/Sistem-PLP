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
        Schema::create('penanggung_jawabs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nama');
            $table->string('nip');
            $table->string('notel');
            $table->string('status');
            $table->string('pangkat');
            $table->string('norek');
            $table->string('norek_an');
            $table->string('nama_bank');
            $table->unsignedBigInteger('smk_id');
            $table->foreign('smk_id')->references('id')->on('smks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penanggung_jawabs');
    }
};
