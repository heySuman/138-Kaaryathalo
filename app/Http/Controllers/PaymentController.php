<?php

namespace App\Http\Controllers;

use App\Models\RequestPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use App\Models\Client;

class PaymentController extends Controller
{
    public function handlePayment(Request $request)
    {
        $validated = $request->validate([
            'paymentRequest.id' => 'required|integer|exists:request_payments,id',
        ]);

        $paymentRequest = RequestPayment::with(['job', 'freelancer', 'freelancer.user'])
            ->findOrFail($request->input('paymentRequest.id'));

        $secretKey = '4c057d8ac62f4a3685785ac6edd41a40';

        $payload = [
            "return_url" => "http://localhost:8000/payment",
            "website_url" => "http://localhost:8000",
            "amount" => $paymentRequest->amount * 100,
            "purchase_order_id" => $paymentRequest->id,
            "purchase_order_name" => $paymentRequest->job->title,
            "customer_info" => [
                "name" => $paymentRequest->freelancer->user->name,
                "email" => $paymentRequest->freelancer->user->email,
                "phone" => '9800000000',
            ]
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Key ' . $secretKey,
            'Content-Type' => 'application/json'
        ])->post('https://a.khalti.com/api/v2/epayment/initiate/', $payload);

        if ($response->successful()) {
            $data = $response->json();
            return Inertia::location($data['payment_url']);
        }

        if (!$response->successful()) {
            logger()->error('Khalti payment failed', [
                'response' => $response->body(),
            ]);

            return back()->withErrors([
                'payment' => 'Failed to initiate payment. Please try again.'
            ]);
        }
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect('/login');
        }

        $client = Client::where('user_id', $user->id)->first();
        $paymentRequests = RequestPayment::where('client_id', $client->id)
            ->with(['freelancer', 'job'])
            ->latest()
            ->get();

        if ($request->has('pidx')) {
            $secretKey = '4c057d8ac62f4a3685785ac6edd41a40';
            $response = Http::withHeaders([
                'Authorization' => 'Key ' . $secretKey,
                'Content-Type' => 'application/json'
            ])->post('https://a.khalti.com/api/v2/epayment/lookup/', [
                'pidx' => $request->query('pidx')
            ]);

            $request_id = null;
            if ($request->has('purchase_order_id')) {
                $request_id = $request->query('purchase_order_id');
            }

            if ($response->successful()) {
                $paymentData = $response->json();
                $status = 'approved';

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

        $pendingAmount = RequestPayment::where('client_id', $client->id)->where('status', 'pending')->sum('amount');
        $paidAmount = RequestPayment::where('client_id', $client->id)->where('status', 'approved')->sum('amount');

        return Inertia::render('Payment', [
            'paymentRequests' => $paymentRequests,
            'payment' => Session::get('payment'),
            'error' => Session::get('error'),
            'pendingAmount' => $pendingAmount,
            'paidAmount' => $paidAmount,
        ]);
    }

    public function rejectPayment(Request $request)
    {
        $validated = $request->validate([
            'paymentRequest.id' => 'required|integer|exists:request_payments,id',
        ]);

        $paymentRequest = RequestPayment::with(['job', 'freelancer', 'freelancer.user'])
            ->findOrFail($request->input('paymentRequest.id'));
        $paymentRequest->update([
            'status' => 'rejected',
        ]);
        return redirect('/payment');
    }
}
