<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\JobPosting;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        // Check if the client exists
        $client = Client::where('user_id', $user->id)->first();

        if (!$client) {
            // Handle the case where the client does not exist
            // For example, you can return an error response or redirect
            return Inertia::render('Dashboard/client/ClientDashboard', [
                'message' => 'Client not found.'
            ]);
        }

        $jobCountStatus = [
            "pending" => JobPosting::where("client_id", $client->id)->where("status", "pending")->count(),
            "in progress" => JobPosting::where("client_id", $client->id)->where("status", "in progress")->count(),
            "completed" => JobPosting::where("client_id", $client->id)->where("status", "completed")->count(),
            "total" => JobPosting::where("client_id", $client->id)->count(),
        ];

        // Latest job postings by the user
        $latest_job_postings = JobPosting::where("client_id", $client->id)
            ->with(['category'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/client/ClientDashboard', [
            "jobStatusCount" => $jobCountStatus,
            "latestJobPostings" => $latest_job_postings
        ]);
    }
}
