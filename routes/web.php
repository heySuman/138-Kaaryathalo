<?php

use App\Http\Controllers\Client\MilestoneController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RatingReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('milestones', [MilestoneController::class, 'index'])->name('milestones.index');
    Route::get('job-application/{jobPosting}/milestones/create', [MilestoneController::class, 'create'])->name('milestones.create');
    Route::post('job-application/{jobPosting}/milestones', [MilestoneController::class, 'store'])->name('milestones.store');
    Route::get('milestone/{milestone}/edit', [MilestoneController::class, 'edit'])->name('milestones.edit');
    Route::put('milestone/{milestone}', [MilestoneController::class, 'update'])->name('milestones.update');
    Route::patch('milestone/{milestone}', [MilestoneController::class, 'updateMilestone'])->name('milestones.update.status');
    Route::delete('milestone/{milestone}', [MilestoneController::class, 'destroy'])->name('milestones.destroy');

    Route::post('/khalti', [PaymentController::class, 'handlePayment'])->name('khalti.handle');
    Route::get('/payment', [PaymentController::class, 'payment'])->name('payment');
});

Route::middleware(['auth', 'verified'])->group(function () {
   Route::post('review', [RatingReviewController::class, 'store'])->name('review.store');
   Route::put('review/{id}', [RatingReviewController::class, 'update'])->name('review.update');
   Route::delete('review/{id}', [RatingReviewController::class, 'destroy'])->name('review.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/freelancer.php';
require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
