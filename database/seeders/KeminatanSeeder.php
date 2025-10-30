<?php

namespace Database\Seeders;

use App\Models\Keminatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KeminatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Keminatan::insert([
            ['name' => 'Keminatan 1'],
            ['name' => 'Keminatan 2'],
            ['name' => 'Keminatan 3'],
            ['name' => 'Keminatan 4'],
            ['name' => 'Keminatan 5'],
        ]);
    }
}
