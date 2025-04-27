<?php

namespace App\Http\Controllers;

use App\Models\Dispute;
use App\Models\JobPosting;
use App\Models\RequestPayment;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $totalUsers = User::count();
        $totalJobs = JobPosting::count();
        $totalTransactions = RequestPayment::count();

        $recentDisputes = Dispute::with(['jobPosting', 'jobPosting.client', 'jobPosting.client.user'])->latest()
            ->take(5)->get();

        return Inertia::render('Admin/Index', [
            'totalUsers' => $totalUsers,
            'totalJobs' => $totalJobs,
            'totalTransactions' => $totalTransactions,
            'recentDisputes' => $recentDisputes,
        ]);
    }

    public function showUsers()
    {
        $users = User::where('role', '!=', 'admin')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Users', [
            'totalFreelancers' => User::where('role', 'freelancer')->count(),
            'totalClients' => User::where('role', 'client')->count(),
            'totalUsers' => User::count(),
            'users' => $users,
        ]);
    }
}
