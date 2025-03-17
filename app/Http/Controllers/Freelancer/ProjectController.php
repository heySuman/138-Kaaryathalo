<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Freelancer;
use App\Models\Freelancer\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Store a new project.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        $validated = $request->validate([
            'title' => 'string|required',
            'description' => 'string|nullable',
            'project_url' => 'string|nullable',
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable',
            'status' => 'string|required|in:in progress,completed',
        ]);

        $validated['freelancer_id'] = $freelancer->id;

        Project::create($validated);

        return redirect()->route('freelancer.profile')
            ->with('success', 'Project added successfully!');
    }

    /**
     * Update an existing project.
     */
    public function update(Request $request, Project $project)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

        if ($project->freelancer_id !== $freelancer->id) {
            return redirect()->route('freelancer.profile')
                ->with('error', 'Unauthorized access.');
        }

        // Validate request data
        $validated = $request->validate([
            'title' => 'string|required',
            'description' => 'string|nullable',
            'project_url' => 'string|nullable',
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable',
            'status' => 'string|required|in:in progress,completed',
        ]);

        // Update the project
        $project->update($validated);

        return redirect()->route('freelancer.profile')
            ->with('success', 'Project updated successfully!');
    }

    /**
     * Delete a project.
     */
    public function destroy(Project $project)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

        if ($project->freelancer_id !== $freelancer->id) {
            return redirect()->route('freelancer.profile')
                ->with('error', 'Unauthorized access.');
        }

        // Delete the project
        $project->delete();

        return redirect()->route('freelancer.profile')
            ->with('success', 'Project deleted successfully!');
    }
}
