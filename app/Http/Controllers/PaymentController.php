<?php

namespace App\Http\Controllers;

use App\Models\RequestPayment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function handlePayment(Request $request)
    {
        $validated = $request->validate([
            'paymentRequest.id' => 'required|integer|exists:request_payments,id',
        ]);

        $paymentRequest = RequestPayment::with(['job', 'freelancer','freelancer.user'])
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
                "phone" => "9800000001",
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
                'payment' => 'Failed to initiate payment. Please try again.',
            ]);
        }
    }

}
