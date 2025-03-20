<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Freelancer;
use App\Models\JobPosting;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Inertia\Inertia;

class FreelancerDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard');
    }
}
