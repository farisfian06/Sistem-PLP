<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations (drop the column).
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('angkatan');
        });
    }

    /**
     * Reverse the migrations (add the column back).
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->year('angkatan')->nullable()->default(2022)->after('details');
        });
    }
};
