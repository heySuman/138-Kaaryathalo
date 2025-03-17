<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Experience;
use App\Models\Freelancer\Freelancer;
use Cloudinary\Api\Exception\ApiError;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ExperienceController extends Controller
{
    /**
     * Store a new experience.
     * @throws ApiError
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

        $validated = $request->validate([
            'job_title' => 'required|string',
            'company_name' => 'required|string',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'experience_letter' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $validated['freelancer_id'] = $freelancer->id;

        // Upload file to Cloudinary if present
        if ($request->hasFile('experience_letter')) {
            $uploadedFile = Cloudinary::uploadFile($request->file('experience_letter')->getRealPath(), [
                'folder' => 'experience_letters'
            ]);
            $validated['experience_letter'] = $uploadedFile->getSecurePath();
        }

        Experience::create($validated);

        return redirect()->route('freelancer.profile')
            ->with('success', 'Experience added successfully!');
    }

    /**
     * Update an experience.
     */
    public function update(Request $request, Experience $experience)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

        if ($experience->freelancer_id !== $freelancer->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'job_title' => 'required|string',
            'company_name' => 'required|string',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'experience_letter' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('experience_letter')) {
            // Delete old Cloudinary file if exists
            if ($experience->experience_letter) {
                Cloudinary::destroy(pathinfo($experience->experience_letter, PATHINFO_FILENAME));
            }
            // Upload new file
            $uploadedFile = Cloudinary::uploadFile($request->file('experience_letter')->getRealPath(), [
                'folder' => 'experience_letters'
            ]);
            $validated['experience_letter'] = $uploadedFile->getSecurePath();
        }

        $experience->update($validated);

        return redirect()->route('freelancer.profile')
            ->with('success', 'Experience updated successfully!');
    }

    /**
     * Delete an experience.
     */
    public function destroy(Experience $experience)
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->firstOrFail();

        // Ensure only the owner can delete
        if ($experience->freelancer_id !== $freelancer->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete Cloudinary file if exists
        if ($experience->experience_letter) {
            Cloudinary::destroy(pathinfo($experience->experience_letter, PATHINFO_FILENAME));
        }

        // Delete the experience record
        $experience->delete();

        return redirect()->route('freelancer.profile')
            ->with('success', 'Experience deleted successfully!');
    }
}
