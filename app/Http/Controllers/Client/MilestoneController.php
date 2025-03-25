<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MilestoneController extends Controller
{
    public function index($jobApplicationId): Response
    {
        $jobApplication = JobApplication::findOrFail($jobApplicationId);
        $this->authorizeAccess($jobApplication);

        $milestones = Milestone::where('job_application_id', $jobApplicationId)->get();
        return Inertia::render('Milestone/Index', [
            'milestones' => $milestones,
        ]);
    }

    public function create($jobApplicationId): Response
    {
        $jobApplication = JobApplication::findOrFail($jobApplicationId);
        $user = Auth::user();
        if ($user->id !== $jobApplication->job->client->user_id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Milestone/Create', [
            'jobApplicationId' => $jobApplicationId,
        ]);
    }

    public function edit(Milestone $milestone): Response
    {
        $this->authorizeAccess($milestone->jobApplication);
        return Inertia::render('Milestone/Edit', [
            'milestone' => $milestone,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_application_id' => 'required|exists:job_applications,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);

        $jobApplication = JobApplication::findOrFail($validated['job_application_id']);
        $this->authorizeAccess($jobApplication);

        Milestone::create($validated);
        return redirect()->back()->with('success', 'Milestone created successfully.');
    }

    public function update(Request $request, Milestone $milestone)
    {
        $this->authorizeAccess($milestone->jobApplicationn);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed,cancelled',
        ]);

        $milestone->update($validated);
        return redirect()->back()->with('success', 'Milestone updated successfully.');
    }

    public function destroy(Milestone $milestone)
    {
        $this->authorizeAccess($milestone->jobApplication);
        $milestone->delete();
        return redirect()->back()->with('success', 'Milestone deleted successfully.');
    }

    private function authorizeAccess(JobApplication $jobApplication)
    {
        $user = Auth::user();
        if ($user->id !== $jobApplication->job->client->user_id && $user->id !==
            $jobApplication->freelancer_id) {
            abort(403, 'Unauthorized action.');
        }
    }
}
