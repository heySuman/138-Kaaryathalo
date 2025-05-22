<?php

namespace App\Http\Controllers\Freelancer;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Freelancer;
use App\Models\RatingReview;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
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
        try {

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
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Profile not created.']);
        }
    }

    public function update(Request $request): RedirectResponse
    {
        try {
            $user = Auth::user();
            $freelancer = Freelancer::where('user_id', $user->id)->first();

            if (!$freelancer) {
                return back()->withErrors(['error' => 'Profile not found.']);
            }

            $validated = $request->validate([
                'headline' => ['nullable', 'string', 'max:255'],
                'about' => ['nullable', 'string'],
                'profile_picture' => ['nullable', 'image', 'mimes:jpg,png,jpeg,gif', 'max:2048'],
            ]);

            if ($request->hasFile('profile_picture')) {
                if ($freelancer->profile_picture) {
                    $publicId = basename(parse_url($freelancer->profile_picture, PHP_URL_PATH)); // Extract public ID
                    Cloudinary::destroy($publicId);
                }

                $uploadedFile = Cloudinary::upload(
                    $request->file('profile_picture')->getRealPath(),
                    ['folder' => 'profile_pictures']
                );

                $validated['profile_picture'] = $uploadedFile->getSecurePath();
            }

            $freelancer->update(array_filter($validated, fn($value) => !is_null($value)));

            return back()->with('success', 'Profile updated successfully.');
        } catch (Exception $e) {
            \Log::error('Profile update failed', [
                'message' => $e->getMessage(),
            ]);
            return back()->withErrors(['error' => 'Profile not updated.']);
        }
    }
    /**
     * Delete the freelancer's profile and associated profile picture.
     *
     * @return RedirectResponse
     */
    public function delete(): RedirectResponse
    {
        try {

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
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Profile not deleted.']);
        }
    }

    public function updateProfilePicture(Request $request): RedirectResponse
    {
        try {
            \Log::info('Received profile picture request', [
                'has_file' => $request->hasFile('profile_picture'),
                'method' => $request->input('_method'),
            ]);

            $user = Auth::user();
            $freelancer = Freelancer::where('user_id', $user->id)->first();

            if (!$freelancer) {
                return back()->withErrors(['profile_picture' => 'Freelancer profile not found.']);
            }

            $validated = $request->validate([
                'profile_picture' => ['required', 'image', 'mimes:jpg,png,jpeg,gif', 'max:2048'],
            ]);

            if ($request->hasFile('profile_picture')) {
                $uploadedFile = Cloudinary::upload(
                    $request->file('profile_picture')->getRealPath(),
                    ['folder' => 'profile_pictures']
                );

                $profilePictureUrl = $uploadedFile->getSecurePath();

                $freelancer->update([
                    'profile_picture' => $profilePictureUrl,
                ]);

                return back()->with('success', 'Profile picture updated successfully.');
            }

            return back()->withErrors(['profile_picture' => 'No file was uploaded.']);
        } catch (Exception $e) {
            \Log::error('Profile picture upload failed', [
                'message' => $e->getMessage(),
            ]);

            return back()->withErrors([
                'profile_picture' => 'Profile picture could not be updated: ' . $e->getMessage(),
            ]);
        }
    }
}
