<?php

namespace App\Http\Controllers\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Freelancer\Freelancer;
use App\Models\JobApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class JobApplicationController extends Controller
{
    /**
     * Display a listing of the job applications.
     */
    public function index(): Response
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();
        $client = Client::where('user_id', $user->id)->first();

        if ($user->role === "freelancer") {
            // Show only applications submitted by the logged-in freelancer
            $applications = JobApplication::with(['job', 'freelancer'])
                ->where('freelancer_id', $freelancer->id)
                ->latest()
                ->paginate(10);
        } elseif ($user->role === "client") {
            // Show only applications for jobs posted by the logged-in client
            $applications = JobApplication::with(['job', 'freelancer'])
                ->whereHas('job', function ($query) use ($user) {
                    $query->where('client_id', $client->id);
                })
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('JobApplication/Index', [
            'applications' => $applications ?? null
        ]);
    }


    /**
     * Store a newly created job application.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:job_postings,id',
            'freelancer_id' => 'required|exists:freelancers,id',
            'cover_letter' => 'nullable|string',
            'proposed_budget' => 'required|numeric|min:0',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:2048',
        ]);

        if ($request->hasFile('attachments')) {
            $validated['attachments'] = collect($request->file('attachments'))->map(function ($file) {
                return $file->store('attachments', 'public');
            })->toJson();
        }

        JobApplication::create($validated);
        return redirect()->route('job-applications.index');
    }

    /**
     * Display the specified job application.
     */
    public function show(JobApplication $jobApplication): Response
    {
        return Inertia::render('JobApplication/Show', [
            'application' => $jobApplication->load(['job', 'freelancer'])
        ]);
    }

    /**
     * Update the specified job application.
     */
    public function update(Request $request, JobApplication $jobApplication): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected'
        ]);

        $jobApplication->update($validated);
        return redirect()->route('job-applications.index');
    }

    /**
     * Remove the specified job application.
     */
    public function destroy(JobApplication $jobApplication): RedirectResponse
    {
        $jobApplication->delete();
        return redirect()->route('job-applications.index');
    }
}
