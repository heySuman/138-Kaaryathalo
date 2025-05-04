<?php

namespace App\Http\Controllers;

use App\Models\Freelancer\Freelancer;
use App\Models\JobPosting;
use App\Models\RatingReview;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TalentSearch extends Controller
{
    public function index(Request $request)
    {
        $query = Freelancer::with(['certificates', 'user', 'projects', 'experiences', 'user.givenRatings']);

        // Search with names
        if ($request->filled('name')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'ILIKE', '%' . $request->name . '%');
            });
        }

        return Inertia::render('TalentSearch/Index', [
            'freelancers' => $query->paginate(10),
            'filters' => $request->only('name'),
        ]);
    }


    public function show($id)
    {
        $freelancer = Freelancer::with(['user.receivedRatings.reviewer'])->find($id);

        $user = $freelancer->user;
        $reviews = $user->receivedRatings;

        return Inertia::render('TalentSearch/Show', [
            'freelancer' => Freelancer::with(['certificates', 'user', 'projects', 'experiences'])->findOrFail($id),
            'reviews' => $reviews,
        ]);
    }
}
