<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Freelancer;
use App\Models\RatingReview;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FreelancerController extends Controller
{
    public function index()
    {
        $id = Auth::id();
        $reviews = RatingReview::where('reviewee_id', $id)->with(['reviewer'])->get();
        $freelancer = Freelancer::with(['user', 'projects', 'experiences', 'certificates'])->where('user_id', $id)->first();
        return Inertia::render('Freelancer/Index', [
            'freelancer' => $freelancer ?? null,
            'reviews' => $reviews ?? null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $validated = $request->validate([
            'headline' => ['required', 'string', 'max:255'],
            'about' => ['required', 'string'],
            'profile_picture' => ['required', 'image', 'mimes:jpg,png,jpeg,gif', 'max:2048'],
        ]);

        $profilePictureUrl = null;

        if ($request->hasFile('profile_picture')) {
            $uploadedFile = Cloudinary::upload($request->file('profile_picture')->getRealPath(), [
                'folder' => 'profile_pictures'
            ]);
            $profilePictureUrl = $uploadedFile->getSecurePath();
        }

        Freelancer::create([
            'user_id' => $user->id,
            'headline' => $validated['headline'],
            'about' => $validated['about'],
            'profile_picture' => $profilePictureUrl,
        ]);

        return back()->with('success', 'Profile created successfully.');
    }

    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        if (!$freelancer) {
            return back()->withErrors(['error' => 'Profile not found.']);
        }

        $validated = $request->validate([
            'headline' => ['nullable', 'string', 'max:255'],
            'about' => ['nullable', 'string'],
        ]);

        $freelancer->update(array_filter($validated, fn($value) => !is_null($value)));

        return back()->with('success', 'Profile updated successfully.');
    }

    /**
     * Delete the freelancer's profile and associated profile picture.
     *
     * @return RedirectResponse
     */
    public function delete(): RedirectResponse
    {
        $user = Auth::user();
        $freelancer = Freelancer::where('user_id', $user->id)->first();

        if (!$freelancer) {
            return back()->withErrors(['error' => 'Profile not found.']);
        }

        // Delete the profile picture from Cloudinary if it exists
        if ($freelancer->profile_picture) {
            $publicId = basename(parse_url($freelancer->profile_picture, PHP_URL_PATH)); // Extract public ID
            Cloudinary::destroy($publicId);
        }

        // Delete the freelancer's record
        $freelancer->delete();

        return redirect()->route('freelancer.profile')->with('success', 'Profile deleted successfully.');
    }
}
