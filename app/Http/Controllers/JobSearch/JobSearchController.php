<?php

namespace App\Http\Controllers\JobSearch;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Category;
use App\Models\Freelancer\Freelancer;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JobSearchController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        $query = JobPosting::query();

        // Apply filters dynamically
        if ($request->filled('title')) {
            $query->where('title', 'ILIKE', '%' . $request->title . '%');
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('experience')) {
            $query->where('experience_level', $request->experience);
        }

        if ($request->filled('minBudget')) {
            $query->where('budget', '>=', $request->minBudget);
        }

        if ($request->filled('maxBudget')) {
            $query->where('budget', '<=', $request->maxBudget);
        }

        $query->where('status', 'pending');

        // Get results
        $jobs = $query->paginate(10);

        return inertia('JobSearch/Index', [
            'jobs' => $jobs,
            'category' => Category::all(),
            'freelancer' => $freelancer ?? null,
        ]);
    }

    public function show(JobPosting $jobPosting)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        $jobPosting->load('category', 'client', 'client.user');

        $applied = $freelancer
            ? JobApplication::where('freelancer_id', $freelancer->id)
                ->where('job_posting_id', $jobPosting->id)
                ->first()
            : null;

        return Inertia::render('JobSearch/Show', [
            'jobPosting' => $jobPosting,
            'freelancer' => $freelancer,
            'applied' => $applied,
        ]);
    }

}
