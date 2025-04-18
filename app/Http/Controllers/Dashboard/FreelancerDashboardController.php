<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Freelancer\Freelancer;
use App\Models\JobApplication;
use App\Models\JobPosting;
use App\Models\RequestPayment;
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
            "accepted" => JobApplication::where("freelancer_id", $freelancer->id)->where("status", "accepted")
                ->count(),
            "total" => JobApplication::where("freelancer_id", $freelancer->id)->count(),
        ];

        $raw = RequestPayment::selectRaw('SUM(amount) as total, EXTRACT(MONTH FROM created_at) as month')
            ->where('freelancer_id', Auth::id())
            ->groupByRaw('EXTRACT(MONTH FROM created_at)')
            ->orderByRaw('EXTRACT(MONTH FROM created_at)')
            ->get()
            ->keyBy('month');

        $fullYear = collect(range(1, 12))->map(function ($month) use ($raw) {
            return [
                'month' => $month,
                'total' => $raw[$month]->total ?? 0
            ];
        });

        return Inertia::render('Dashboard/Freelancer/FreelancerDashboard', [
            'jobStatusCount' => $appliedJobCountStatus,
            'jobApplication' => JobApplication::where('freelancer_id', $freelancer->id)->with(['job'])
                ->paginate(10),
            'earningsData' => $fullYear,
        ]);
    }
}
