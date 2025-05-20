<?php

namespace App\Http\Controllers\JobApplication;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Notifications\JobStatusNotification;
use App\Notifications\NewJobApplication;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        if ($user->role === "freelancer") {
            $applications = JobApplication::with(['job', 'freelancer.user', 'job.category'])
                ->whereHas('freelancer', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->latest()
                ->paginate(10);

        } elseif ($user->role === "client") {
            $applications = JobPosting::with(['applications.freelancer.user'])
                ->where('client_id', $user->client->id)
                ->latest()
                ->paginate(10);
        } else {
            abort(403, "Unauthorized access.");
        }

        return Inertia::render('JobApplication/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Store a newly created job application.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',
            'freelancer_id' => 'required|exists:freelancers,id',
            'cover_letter' => 'nullable|string',
            'proposed_budget' => 'required|numeric|min:0',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:2048',
        ]);

        if ($request->hasFile('attachments')) {
            $validated['attachments'] = collect($request->file('attachments'))->map(function ($file) {
                return Cloudinary::upload($file->getRealPath())->getSecurePath();
            })->all();
        }

        $jobPosting = JobPosting::findOrFail($validated['job_posting_id']);
        $jobPoster = $jobPosting->client->user;

        if ($jobPoster) {
            \Log::info('Notifying job poster:', ['job_posting_id' => $jobPosting->id, 'jobPoster_id' => $jobPoster->id]);
            $jobPoster->notify(new NewJobApplication($jobPosting));
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
     * Update the status of a job application.
     */
    public function update(Request $request, JobApplication $jobApplication): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,rejected'
        ]);

        // If approved, reject all other applications for the same job
        if ($validated['status'] === 'accepted') {
            JobApplication::where('job_posting_id', $jobApplication->job_posting_id)
                ->where('id', '!=', $jobApplication->id)
                ->update(['status' => 'rejected']);
        }

        $freelancer = $jobApplication->freelancer->user;
        if($freelancer) {
            \Log::info('Notifying freelancer:', ['freelancer_id' => $freelancer->id]);
            $freelancer->notify(new JobStatusNotification($jobApplication));
        }

        $jobApplication->job()->update(['status' => 'in progress']);
        $jobApplication->update($validated);

        return back()->with('success', 'Application updated successfully.');
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
