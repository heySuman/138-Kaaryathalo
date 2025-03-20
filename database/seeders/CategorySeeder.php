<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Freelancer\Category;
use App\Models\Freelancer\Skill;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Web Development' => [
                'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Vue.js', 'Angular',
                'Next.js', 'Nuxt.js', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'PHP',
                'Laravel', 'Node.js', 'Django', 'Flask', 'ASP.NET', 'Ruby on Rails',
                'GraphQL', 'REST API', 'WebSockets'
            ],
            'Mobile Development' => [
                'Flutter', 'React Native', 'Swift', 'Kotlin', 'Java (Android)',
                'Objective-C', 'Dart', 'Ionic', 'Xamarin'
            ],
            'UI/UX Design' => [
                'Adobe XD', 'Figma', 'Sketch', 'InVision', 'Photoshop',
                'Illustrator', 'Wireframing', 'Prototyping', 'User Research'
            ],
            'Graphic Design' => [
                'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'CorelDRAW',
                'InDesign', 'Typography', 'Branding', 'Logo Design', 'Motion Graphics'
            ],
            'Data Science & AI' => [
                'Python', 'R', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas',
                'NumPy', 'Keras', 'Matplotlib', 'Data Visualization', 'Deep Learning',
                'Natural Language Processing (NLP)', 'Computer Vision'
            ],
            'Cybersecurity' => [
                'Ethical Hacking', 'Penetration Testing', 'Cryptography', 'Network Security',
                'Malware Analysis', 'Forensic Analysis', 'OWASP', 'SOC Analyst',
                'Incident Response', 'SIEM', 'Firewalls'
            ],
            'DevOps & Cloud' => [
                'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD',
                'Terraform', 'Ansible', 'Jenkins', 'Linux Administration'
            ],
            'Game Development' => [
                'Unity', 'Unreal Engine', 'C#', 'C++', 'Blender', 'Maya', 'Game Physics',
                '3D Modeling', 'AR/VR Development', 'Shader Programming'
            ],
            'Blockchain & Web3' => [
                'Ethereum', 'Solidity', 'Smart Contracts', 'Hyperledger', 'Rust',
                'Bitcoin', 'NFT Development', 'dApp Development'
            ],
            'Content Writing' => [
                'SEO Writing', 'Technical Writing', 'Copywriting', 'Editing',
                'Ghostwriting', 'Creative Writing', 'Proofreading'
            ],
            'Marketing & SEO' => [
                'SEO', 'Google Ads', 'Facebook Ads', 'Email Marketing',
                'Content Marketing', 'Affiliate Marketing', 'Social Media Marketing'
            ],
            'Video & Animation' => [
                'Adobe Premiere Pro', 'After Effects', 'Final Cut Pro', 'Davinci Resolve',
                '3D Animation', '2D Animation', 'Video Editing'
            ],
        ];

        foreach ($categories as $categoryName => $skills) {
            $category = Category::create(['category' => $categoryName]);

            foreach ($skills as $skillName) {
                Skill::create([
                    'category_id' => $category->id,
                    'name' => $skillName
                ]);
            }
        }
    }
}
