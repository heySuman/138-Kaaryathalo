<?php

use App\Http\Controllers\Client\MilestoneController;
use App\Http\Controllers\PaymentController;
use App\Models\Client;
use App\Models\RequestPayment;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

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

Route::get('/payment', function (Request $request) {
    $user = Auth::user();
    if (!$user) {
        return redirect('/login');
    }

    $client = Client::where('user_id', $user->id)->first();
    $paymentRequests = RequestPayment::where('client_id', $client->id)
        ->with(['freelancer', 'job'])
        ->latest()
        ->get();

    // Handle Khalti verification
    if ($request->has('pidx')) {
        $secretKey = '4c057d8ac62f4a3685785ac6edd41a40';
        $response = Http::withHeaders([
            'Authorization' => 'Key ' . $secretKey,
            'Content-Type' => 'application/json'
        ])->post('https://a.khalti.com/api/v2/epayment/lookup/', [
            'pidx' => $request->query('pidx')
        ]);

        $request_id = null;
        if($request->has('purchase_order_id')){
                $request_id = $request->query('purchase_order_id');
        }

        if ($response->successful()) {
            $paymentData = $response->json();
            $status = 'approved';

            // Update the payment status in the database
            $paymentRequest = RequestPayment::where('id', $request_id)->first();
            if ($paymentRequest) {
                $paymentRequest->update([
                    'status' => $status,
                ]);
            }

            Session::flash('payment', $response->json());
        } else {
            Log::error('Khalti payment verification failed', [
                'response' => $response->body(),
            ]);
            Session::flash('error', 'Payment verification failed. Please try again.');
        }
        return redirect('/payment');
    }

    return Inertia::render('Payment', [
        'paymentRequests' => $paymentRequests,
        'payment' => Session::get('payment'),
        'error' => Session::get('error'),
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/freelancer.php';
require __DIR__ . '/client.php';
require __DIR__ . '/auth.php';
