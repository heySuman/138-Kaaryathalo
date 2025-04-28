<?php

namespace App\Http\Controllers;

use App\Models\Dispute;
use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DisputeController extends Controller
{
    /**
     * Display all disputes tied to the authenticated user.
     */
    public function index()
    {
        $user = Auth::user();

        $disputes = Dispute::where('submitted_by_user_id', $user->id)
            ->with(['jobPosting', 'submittedByUser'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dispute/Index', [
            'disputes' => $disputes,
        ]);
    }

    /**
     * Show a form to create a new dispute for a specific job posting.
     */
    public function create()
    {
        $role = Auth::user()->role;

        if ($role === 'freelancer') {
            $jobs = Auth::user()
                ->freelancer
                ->jobApplications()
                ->where('status', 'accepted')
                ->with('jobPosting')
                ->get()
                ->pluck('jobPosting');

            return Inertia::render('Dispute/Create', [
                'jobs' => $jobs,
            ]);
        } elseif ($role === 'client') {
            $jobPostings = JobPosting::where('client_id', Auth::user()->client->id)->get();

            return Inertia::render('Dispute/Create', [
                'jobs' => $jobPostings,
            ]);
        } else {
            abort(403, "Unauthorized access.");
        }
    }

    /**
     * Store a new dispute.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',
            'dispute_type' => 'required|in:payment_issue,task_not_submitted',
            'description' => 'nullable|string|max:1000',
        ]);

        $user = Auth::user();

        $validated['submitted_by_user_id'] = $user->id;
        $validated['user_type'] = $user->freelancer ? 'freelancer' : 'client';

        Dispute::create($validated);

        return redirect()->route('disputes.index')->with('success', 'Dispute submitted successfully.');
    }

    /**
     * Display a specific dispute.
     */
    public function show($id)
    {
        $dispute = Dispute::with(['jobPosting', 'submittedByUser'])->findOrFail($id);

        return Inertia::render('Dispute/Show', [
            'dispute' => $dispute,
        ]);
    }

    /**
     * Update the status of a dispute (e.g., resolved, rejected).
     */
    public function update(Request $request, $id)
    {
        $dispute = Dispute::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:open,resolved,rejected',
        ]);

        $dispute->update($validated);

        return redirect()->route('disputes.index')->with('success', 'Dispute status updated successfully.');
    }

    /**
     * Delete a dispute.
     */
    public function destroy($id)
    {
        $dispute = Dispute::findOrFail($id);
        $dispute->delete();

        return redirect()->route('disputes.index')->with('success', 'Dispute deleted successfully.');
    }

    /**
     * Display a list of all disputes for admin.
     */
    public function adminIndex()
    {
        $disputes = Dispute::with(['submittedByUser', 'jobPosting'])->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Dispute/AdminIndex', [
            'disputes' => $disputes,
        ]);
    }

    /**
     * Show the details of a specific dispute for admin.
     */
    public function adminShow($id)
    {
        $dispute = Dispute::with(['jobPosting', 'submittedByUser'])->findOrFail($id);

        return Inertia::render('Dispute/AdminShow', [
            'dispute' => $dispute,
        ]);
    }

    /**
     * Update the status of a dispute (admin-specific action).
     */
    public function adminUpdate(Request $request, $id)
    {
        $dispute = Dispute::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:open,resolved,rejected',
        ]);

        $dispute->update($validated);

        return redirect()->route('admin.disputes.index')->with('success', 'Dispute status updated successfully.');
    }

}
