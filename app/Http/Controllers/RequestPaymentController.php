<?php

namespace App\Http\Controllers;

use App\Models\RequestPayment;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RequestPaymentController extends Controller
{

    /**
     * Store a new payment request by a freelancer.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'job_id' => 'required|exists:job_postings,id',
            'client_id' => 'required|exists:clients,id',
            'freelancer_id' => 'required|exists:freelancers,id',
            'amount' => 'required|numeric|min:1',
        ]);

        RequestPayment::create([
            'client_id' => $validated['client_id'],
            'job_id' => $validated['job_id'],
            'freelancer_id' => $validated['freelancer_id'],
            'amount' => $validated['amount'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Payment request submitted successfully.');
    }

    /**
     * Update the status of a payment request (approved or rejected).
     */
    public function updateStatus(Request $request, RequestPayment $requestPayment): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        $requestPayment->update([
            'status' => $validated['status'],
        ]);

        return back()->with('success', 'Payment request status updated.');
    }

    /**
     * Delete a payment request.
     */
    public function destroy(RequestPayment $requestPayment): RedirectResponse
    {
        $requestPayment->delete();

        return back()->with('success', 'Payment request deleted.');
    }
}
