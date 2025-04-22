<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Freelancer\Category;
use App\Models\JobPosting;
use Illuminate\Database\Seeder;

class JobPostingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clients = Client::pluck('id');
        $categories = Category::pluck('id');

        foreach (range(1, 10) as $i) {
            JobPosting::create([
                'title' => fake()->sentence,
                'description' => fake()->paragraph(3),
                'expiry_date' => now()->addDays(rand(7, 30)),
                'timeline' => fake()->randomElement([
                    'less than a month',
                    'less than three months',
                    'more than three months'
                ]),
                'budget' => rand(100, 1000),
                'skills' => fake()->randomElements([
                    'PHP', 'Laravel', 'React', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'
                ], rand(2, 5)),
                'experience_level' => fake()->randomElement(['fresher', 'intermediate', 'expert']),
                'status' => fake()->randomElement(['pending', 'in progress', 'completed']),
                'visibility' => fake()->randomElement(['public', 'private']),
                'payment_type' => fake()->randomElement(['fixed', 'hourly']),
                'attachments' => [],
                'category_id' => $categories->random(),
                'client_id' => $clients->random(),
            ]);
        }
    }
}
