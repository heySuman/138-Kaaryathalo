<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\JobPosting;
use App\Models\Milestone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MilestoneController extends Controller
{
    public function index($jobPostingId): Response
    {
        $jobPosting = JobPosting::findOrFail($jobPostingId);
        $this->authorizeAccess($jobPosting);

        $milestones = Milestone::where('job_posting_id', $jobPosting->id)->get();
        return Inertia::render('Milestone/Index', [
            'milestones' => $milestones,
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
        $this->authorizeAccess($milestone->jobPosting);
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
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);

        $jobPosting = JobPosting::findOrFail($validated['job_posting_id']);
        $this->authorizeAccess($jobPosting);

        Milestone::create($validated);
        return redirect()->route('job.show', $jobPosting->id)->with('success', 'Milestone created successfully.');
    }

    public function update(Request $request, Milestone $milestone): RedirectResponse
    {
        $this->authorizeAccess($milestone->jobPosting);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);

        $milestone->update($validated);
        return redirect()->route('job.show', $milestone->jobPosting->id)->with('success', 'Milestone updated successfully.');
    }

    public function destroy(Milestone $milestone): RedirectResponse
    {
        $this->authorizeAccess($milestone->jobPosting);
        $milestone->delete();
        return redirect()->route('job.show', $milestone->jobPosting->id)->with('success', 'Milestone deleted successfully.');
    }

    private function authorizeAccess(JobPosting $jobPosting): void
    {
        $user = Auth::user();
        if ($user->id !== $jobPosting->client->user_id) {
            abort(403, 'Unauthorized action.');
        }
    }
}
