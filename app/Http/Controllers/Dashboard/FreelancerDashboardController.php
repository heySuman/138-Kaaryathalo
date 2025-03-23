<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Freelancer\Freelancer;
use App\Models\JobApplication;
use App\Models\JobPosting;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;

class FreelancerDashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        if (!$freelancer) {
            return Inertia::render('Dashboard/Freelancer/FreelancerDashboard', [
                'message' => 'Freelancer not found.'
            ]);
        }

        $appliedJobCountStatus = [
            "pending" => JobApplication::where("freelancer_id", $freelancer->id)->where("status", "pending")->count(),
            "rejected" => JobApplication::where("freelancer_id", $freelancer->id)->where("status", "rejected")
                ->count(),
            "approved" => JobApplication::where("freelancer_id", $freelancer->id)->where("status", "approved")
                ->count(),
            "total" => JobApplication::where("freelancer_id", $freelancer->id)->count(),
        ];

        return Inertia::render('Dashboard/Freelancer/FreelancerDashboard', [
            'jobStatusCount' => $appliedJobCountStatus
        ]);
    }
}
