<?php

use App\Http\Controllers\Dashboard\FreelancerDashboardController;
use App\Http\Controllers\Freelancer\FreelancerController;
use App\Http\Controllers\Freelancer\CertificateController;
use App\Http\Controllers\Freelancer\ExperienceController;
use App\Http\Controllers\Freelancer\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:freelancer'])->prefix('freelancer')->group(function () {
    Route::get('dashboard', [FreelancerDashboardController::class, 'dashboard'])->name('freelancer.dashboard');

    Route::get('profile', [FreelancerController::class, 'index'])->name('freelancer.profile');
    Route::post('profile', [FreelancerController::class, 'store'])->name('freelancer.profile.create');
    Route::patch('profile', [FreelancerController::class, 'update'])->name('freelancer.profile.update');
    Route::delete('profile', [FreelancerController::class, 'delete'])->name('freelancer.profile.delete');

    Route::post('certificate', [CertificateController::class, 'store'])->name('freelancer.certificate.store');
    Route::patch('certificate/{certificate}', [CertificateController::class, 'update'])->name('freelancer.certificate.update');
    Route::delete('certificate/{certificate}', [CertificateController::class, 'destroy'])->name('freelancer.certificate.delete');

    Route::post('experience', [ExperienceController::class, 'store'])->name('freelancer.experience.store');
    Route::patch('experience/{experience}', [ExperienceController::class, 'update'])->name('freelancer.experience.update');
    Route::delete('experience/{experience}', [ExperienceController::class, 'destroy'])->name('freelancer.experience.delete');

    Route::post('project', [ProjectController::class, 'store'])->name('freelancer.project.store');
    Route::patch('project/{project}', [ProjectController::class, 'update'])->name('freelancer.project.update');
    Route::delete('project/{project}', [ProjectController::class, 'destroy'])->name('freelancer.project.delete');
});
