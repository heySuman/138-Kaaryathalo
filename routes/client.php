<?php

use App\Http\Controllers\Client\ClientController;
use \App\Http\Controllers\Dashboard\ClientDashboardController;
use App\Http\Controllers\JobApplication\JobApplicationController;
use App\Http\Controllers\JobPosting\JobPostingController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:client'])->prefix('client')->group(function () {
    Route::get('dashboard', [ClientDashboardController::class, 'index'])->name('client.dashboard');

    Route::get('profile', [ClientController::class, 'index'])->name('client.profile');
    Route::post('profile', [ClientController::class, 'store'])->name('client.profile.create');
    Route::patch('profile', [ClientController::class, 'update'])->name('client.profile.update');
    Route::delete('profile', [ClientController::class, 'delete'])->name('client.profile.delete');

    // Job Posting Routing
    Route::get('my-jobs', [JobPostingController::class, 'index'])->name('client.job-posting.index');
    Route::get('my-jobs/create', [JobPostingController::class, 'create'])->name('client.job-posting.create');
    Route::post('my-jobs', [JobPostingController::class, 'store'])->name('client.job-posting.store');
    Route::get('my-jobs/{jobPosting}', [JobPostingController::class, 'show'])->name('client.job-posting.show');
    Route::get('my-jobs/{jobPosting}/edit', [JobPostingController::class, 'edit'])->name('client.job-posting.edit');
    Route::patch('my-jobs/{jobPosting}', [JobPostingController::class, 'update'])->name('client.job-posting.update');
    Route::delete('my-jobs/{jobPosting}', [JobPostingController::class, 'destroy'])->name('client.job-posting.destroy');

    Route::patch('job-applications/{jobApplication}', [JobApplicationController::class, 'update'])->name('job-applications.update');
});
