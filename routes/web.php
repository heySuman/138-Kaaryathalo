<?php

use App\Http\Controllers\Client\MilestoneController;
use App\Http\Controllers\PaymentController;
use \App\Http\Controllers\MessageController;
use App\Models\Client;
use App\Models\RequestPayment;
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
});

Route::get('/payment', function () {
    $user = Auth::user();
    $client = Client::where('user_id', $user->id)->first();
    $paymentRequest = RequestPayment::where('client_id', $client->id)->with(['freelancer', 'job'])->latest()->get();
    return Inertia::render('Payment', [
        'paymentRequests' => $paymentRequest
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/messages', [MessageController::class, 'sendMessage']);
    Route::get('/messages/{receiverId}', [MessageController::class, 'getMessages']);
    Route::patch('/messages/{messageId}/read', [MessageController::class, 'markAsRead']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/freelancer.php';
require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
