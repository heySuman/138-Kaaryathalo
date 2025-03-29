<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function esewaPay(Request $request)
    {
        $amount = $request->amount;
        $transactionId = 'TXN' . time();

        $data = [
            'amt' => $amount,
            'pdc' => 0,
            'psc' => 0,
            'txAmt' => 0,
            'tAmt' => $amount,
            'pid' => $transactionId,
            'scd' => 'EPAYTEST',
            'su' => url('/payment/success?pid=' . $transactionId),
            'fu' => url('/payment/failure')
        ];

        return Inertia::location('https://rc-epay.esewa.com.np/api/epay/main/v2/form?' . http_build_query($data));
    }

    public function khaltiPay(Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Key Your_Khalti_Secret_Key'
        ])->post('https://dev.khalti.com/api/v2/epayment/initiate/', [
            'return_url' => url('/payment/success'),
            'website_url' => url('/'),
            'amount' => $request->amount * 100, // Khalti uses paisa
            'purchase_order_id' => uniqid(),
            'purchase_order_name' => 'Freelancer Payment'
        ]);

        return Inertia::location($response->json()['payment_url']);
    }

    public function khaltiVerify(Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Key Your_Khalti_Secret_Key'
        ])->post('https://dev.khalti.com/api/v2/payment/verify/', [
            'token' => $request->token,
            'amount' => $request->amount * 100
        ]);

        return response()->json($response->json());
    }
}
