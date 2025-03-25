<?php

use App\Http\Controllers\Client\MilestoneController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('job-application/{jobApplication}/milestones', [MilestoneController::class, 'index'])->name('milestones.index');
    Route::get('job-application/{jobApplication}/milestones/create', [MilestoneController::class, 'create'])->name('milestones.create');
    Route::post('job-application/{jobApplication}/milestones', [MilestoneController::class, 'store'])->name('milestones.store');
    Route::get('milestone/{milestone}/edit', [MilestoneController::class, 'edit'])->name('milestones.edit');
    Route::put('milestone/{milestone}', [MilestoneController::class, 'update'])->name('milestones.update');
    Route::delete('milestone/{milestone}', [MilestoneController::class, 'destroy'])->name('milestones.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/freelancer.php';
require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
