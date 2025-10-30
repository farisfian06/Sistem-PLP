<?php

namespace Database\Seeders;

use App\Models\Smk;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SmkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    Smk::insert([
        ['name' => 'SMK Negeri 1 Kota Bandung'],
        ['name' => 'SMK Negeri 2 Kota Bandung'],
        ['name' => 'SMK Negeri 3 Kota Bandung'],
        ['name' => 'SMK Negeri 4 Kota Bandung'],
        ['name' => 'SMK Negeri 5 Kota Bandung'],
        ['name' => 'SMK Negeri 6 Kota Bandung'],
        ['name' => 'SMK Negeri 7 Kota Bandung'],
        ['name' => 'SMK Negeri 8 Kota Bandung'],
        ['name' => 'SMK Negeri 9 Kota Bandung'],
        ['name' => 'SMK Negeri 10 Kota Bandung'],
    ]);
    }
}
