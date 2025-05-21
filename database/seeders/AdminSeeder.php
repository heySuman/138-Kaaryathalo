<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make(env('ADMIN_PASSWORD')),
            'phone' => '9800000000',
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);
    }
}
