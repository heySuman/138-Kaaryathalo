<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Certificate;
use App\Models\Freelancer\Freelancer;
use Cloudinary\Api\Exception\ApiError;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;

class CertificateController extends Controller
{
    /**
     * Store a newly created certificate in the database.
     * @throws ApiError
     */
    public function store(Request $request)
    {
        try {

            $user = Auth::user();
            $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'issuer' => 'nullable|string|max:255',
                'certificate_url' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
                'issued_date' => 'required|date',
            ]);

            // Upload image if provided
            $uploadedFileUrl = $request->hasFile('certificate_url')
                ? cloudinary()->upload($request->file('certificate_url')->getRealPath())->getSecurePath()
                : null;

            // Store certificate details including image URL
            Certificate::create([
                'freelancer_id' => $freelancer->id,
                'title' => $validated['title'],
                'issuer' => $validated['issuer'] ?? null,
                'certificate_url' => $uploadedFileUrl,
                'issued_date' => $validated['issued_date'],
            ]);

            return redirect()->route('freelancer.profile')
                ->with('success', 'Certificate added successfully!');
        } catch (ApiError $e) {
            return back()->withErrors('certificate_url', 'Error uploading image. Please try again.');
        } catch (\Exception $e) {
            return back()->withErrors('error', 'Something Went Wrong! Please try again.');
        }
    }

    /**
     * Update the specified certificate in the database.
     */
    public function update(Request $request, Certificate $certificate): RedirectResponse
    {
        try {
            $user = Auth::user();
            $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

            if ($certificate->freelancer_id !== $freelancer->id) {
                return redirect()->route('freelancer.profile')
                    ->with('error', 'Unauthorized access.');
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'issuer' => 'nullable|string|max:255',
//                'certificate_url' => 'nullable|file|image|mimes:jpeg,png,jpg|max:2048',
                'issued_date' => 'required|date',
            ]);

            // Check if a new image is uploaded
            if ($request->hasFile('certificate_url')) {
                $uploadedFileUrl = cloudinary()->upload($request->file('certificate_url')->getRealPath())->getSecurePath();
                $validated['certificate_url'] = $uploadedFileUrl;
            }

            $certificate->update($validated);

            return redirect()->route('freelancer.profile')
                ->with('success', 'Certificate updated successfully!');
        } catch (ApiError $e) {
            return back()->withErrors('certificate_url', 'Error uploading image. Please try again.');
        } catch (\Exception $e) {
            \Log::info($e);
            return back()->withErrors('error', 'Something Went Wrong! Please try again.');
        }
    }

    /**
     * Remove the specified certificate from the database.
     */
    public function destroy(Certificate $certificate)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

        if ($certificate->freelancer_id !== $freelancer->id) {
            return redirect()->route('freelancer.profile')
                ->with('error', 'Unauthorized access.');
        }

        $certificate->delete();

        return redirect()->route('freelancer.profile')
            ->with('success', 'Certificate deleted successfully!');
    }
}
