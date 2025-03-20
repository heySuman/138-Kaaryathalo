<?php

namespace App\Http\Controllers\JobPosting;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Freelancer\Category;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobPostingController extends Controller
{
    /**
     * Display a listing of job postings.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();

        return Inertia::render('JobPosting/Index', [
            'client' => $client ?? null,
            'jobPostings' => $client
                ? JobPosting::where('client_id', $client->id)->with('category', 'client')->latest()->paginate(10)
                : null,
        ]);
    }

    /**
     * Show the form for creating a new job posting.
     */
    public function create(): Response
    {
        return Inertia::render('JobPosting/Create', [
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created job posting.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();

        // Check if client exists
        if (!$client) {
            return redirect()->route('client.profile')
                ->with('error', 'Client profile does not exist. Please create a profile first.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'timeline' => 'required|in:less than a month,less than three months,more than three months',
            'budget' => 'required|numeric|min:0',
            'payment_type' => 'required|in:fixed,hourly',
            'skills' => 'required|array',
            'experience_level' => 'required|in:fresher,intermediate,expert',
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['client_id'] = $client->id;
        JobPosting::create($validated);

        return redirect()->route('client.job-posting.index')
            ->with('success', 'Job posting created successfully');
    }

    public function show(JobPosting $jobPosting): Response
    {
        // Load the related category and client relationships
        $jobPosting->load('category', 'client');

        // Return the view with the job posting data
        return Inertia::render('JobPosting/Show', [
            'jobPosting' => $jobPosting,
        ]);
    }

    /**
     * Show the form for editing the job posting.
     */
    public function edit(JobPosting $jobPosting): Response
    {
        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();

        if ($jobPosting->client_id !== $client->id) {
            abort(403);
        }

        return Inertia::render('JobPosting/Edit', [
            'jobPosting' => $jobPosting,
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified job posting.
     */
    public function update(Request $request, JobPosting $jobPosting)
    {
        $user = Auth::user();
        $client = Client::where('user_id', $user->id)->first();

        if ($jobPosting->client_id !== $client->id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'timeline' => 'sometimes|in:less than a month,less than three months,more than three months',
            'budget' => 'sometimes|numeric|min:0',
            'payment_type' => 'sometimes|in:fixed,hourly',
            'skills' => 'sometimes|array',
            'experience_level' => 'sometimes|in:fresher,intermediate,expert',
            'category_id' => 'sometimes|exists:categories,id',
        ]);

        $jobPosting->update($validated);

        return redirect()->route('client.job-posting.index')
            ->with('success', 'Job posting updated successfully');
    }

    /**
     * Remove the specified job posting.
     */
    public function destroy(JobPosting $jobPosting)
    {
        try {
            $user = Auth::user();
            $client = Client::where('user_id', $user->id)->first();

            if ($jobPosting->client_id !== $client->id) {
                return response()->json([
                    'message' => 'You are not authorized to delete this job posting'
                ], 403);
            }

            $jobPosting->delete();

            return redirect()->route('client.job-posting.index')
                ->with('success', 'Job posting deleted successfully');
        } catch (\Exception $e) {
            \Log::error('Failed to delete job posting: ' . $e->getMessage());

            return redirect()->back()
                ->with('error', 'Failed to delete job posting. Please try again.');
        }
    }
}
