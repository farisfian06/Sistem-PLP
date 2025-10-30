<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $roles = [
            'Kaprodi',
            'Dosen Koordinator',
            'Dosen Pembimbing',
            'Akademik',
            'Observer',
            'Guru'
        ];

        foreach ($roles as $role) {
            User::factory()->create([
                'name' => $role . ' User',
                'email' => strtolower(str_replace(' ', '', $role)) . '@example.com',
                'role' => $role,
                'password' => Hash::make('pastibisa'),
            ]);
        }

        $this->call([
            SmkSeeder::class,
            KeminatanSeeder::class,
        ]);
    }
}
