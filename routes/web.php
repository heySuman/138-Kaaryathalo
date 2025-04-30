<?php
use App\Http\Controllers\DisputeController;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Client\MilestoneController;
use App\Http\Controllers\HelpController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\RatingReviewController;
use App\Models\User;
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

Route::middleware('auth')->group(function () {
    Route::get('/messages/{user}', [MessageController::class, 'index']);
    Route::post('/messages', [MessageController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::get('/chat', function () {
        $role = Auth::user()->role;
        return Inertia::render('Chat/Index', [
            'users' => User::where('id', '!=', Auth::id())->where('role', $role === 'client' ? 'freelancer' : 'client' )->with([$role === 'client' ? 'freelancer' : 'client'])
                ->get(),
        ]);
    })->name('chat.index');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('users', [AdminController::class, 'showUsers'])->name('admin.users');
    Route::get('disputes', [DisputeController::class, 'adminIndex'])->name('admin.disputes.index');
    Route::get('disputes/{id}', [DisputeController::class, 'adminShow'])->name('admin.disputes.show');
    Route::patch('disputes/{id}', [DisputeController::class, 'adminUpdate'])->name('admin.disputes.update');
});

Route::middleware(['auth'])->group(function () {
    Route::get('disputes', [DisputeController::class, 'index'])->name('disputes.index');
    Route::get('disputes/create', [DisputeController::class, 'create'])->name('disputes.create');
    Route::post('disputes', [DisputeController::class, 'store'])->name('disputes.store');
    Route::get('disputes/{id}', [DisputeController::class, 'show'])->name('disputes.show');
    Route::patch('disputes/{id}', [DisputeController::class, 'update'])->name('disputes.update');
    Route::delete('disputes/{id}', [DisputeController::class, 'destroy'])->name('disputes.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('help', [HelpController::class, 'index'])->name('help.index');
});

Broadcast::routes(['middleware' => ['auth', 'web']]);;
require __DIR__ . '/settings.php';
require __DIR__ . '/freelancer.php';
require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
