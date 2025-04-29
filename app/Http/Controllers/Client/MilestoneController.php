<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Freelancer;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\Milestone;
use App\Models\RequestPayment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MilestoneController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        if (!$freelancer) {
            return Inertia::render('Milestone/Index', [
                'jobs' => null,
                'freelancer' => null,
            ]);
        }

        $applications = JobApplication::with(['job.milestones'])
            ->where('freelancer_id', $freelancer->id)
            ->where('status', 'accepted')
            ->get();

        $jobs = [];

        foreach ($applications as $application) {
            $job = $application->job;

            if ($job) {
                $jobs[] = [
                    'id' => $job->id,
                    'title' => $job->title,
                    'description' => $job->description,
                    'budget' => $job->budget,
                    'client_id' => $job->client_id,
                    'milestones' => $job->milestones,
                    'application' => $application,
                    'payment_request' => RequestPayment::where('job_id', $job->id)->first() ?? null,
                    'reviews' => $job->reviews,
                    'client_user' => $job->client->user,
                ];
            }
        }

        return Inertia::render('Milestone/Index', [
            'jobs' => $jobs,
            'freelancer' => $freelancer,
        ]);
    }

    public function create($jobPostingId): Response
    {
        $jobPosting = JobPosting::findOrFail($jobPostingId);
        $this->authorizeAccess($jobPosting);

        return Inertia::render('Milestone/Create', [
            'jobPostingId' => $jobPostingId,
        ]);
    }

    public function edit(Milestone $milestone): Response
    {
        return Inertia::render('Milestone/Edit', [
            'milestone' => $milestone,
        ]);
    }


    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in progress,completed,cancelled',
        ]);

        $jobPosting = JobPosting::findOrFail($validated['job_posting_id']);
        $this->authorizeAccess($jobPosting);

        Milestone::create($validated);
        return redirect()->route('client.job-posting.show', $jobPosting->id)->with('success', 'Milestone created successfully.');
    }

    public function update(Request $request, Milestone $milestone): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);

        $jobPosting = JobPosting::findOrFail($milestone->job_posting_id);

        $this->authorizeAccess($jobPosting);
        $milestone->update($validated);

        return redirect()->route('client.job-posting.show', $milestone->job_posting_id)->with('success', 'Milestone updated successfully.');
    }


    public function destroy(Milestone $milestone): RedirectResponse
    {
        $jobPosting = JobPosting::findOrFail($milestone->job_posting_id);
        $this->authorizeAccess($jobPosting);
        $milestone->delete();
        return redirect()->route('client.job-posting.show', $milestone->job_posting_id)->with('success', 'Milestone updated successfully.');
    }

    private function authorizeAccess(JobPosting $jobPosting): void
    {
        $user = Auth::user();
        if ($user->id !== $jobPosting->client->user_id) {
            abort(403, 'Unauthorized action.');
        }
    }

    public function updateMilestone(Request $request, Milestone $milestone): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in progress,completed,cancelled',
        ]);

        $milestone->update($validated);
        return back()->with('success', 'Milestone updated successfully.');
    }
}
