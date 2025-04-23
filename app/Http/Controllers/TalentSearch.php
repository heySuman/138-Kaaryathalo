<?php

namespace App\Http\Controllers;

use App\Models\Freelancer\Freelancer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TalentSearch extends Controller
{
    public function index()
    {
        return Inertia::render('TalentSearch/Index', [
            'freelancers' => Freelancer::with(['certificates', 'user', 'projects', 'experiences'])->paginate
            (10),
        ]);
    }

    public function show($id)
    {
        return Inertia::render('TalentSearch/Show', [
            'freelancer' => Freelancer::with(['certificates', 'user', 'projects', 'experiences'])->findOrFail($id),
        ]);
    }
}
