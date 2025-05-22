<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Client;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function index()
    {
        $id = Auth::id();
        $client = Client::with(['user'])->where('user_id', $id)->first();
        return Inertia::render('Client/Index', ['client' => $client ?: null]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {

            $user = Auth::user();

            $validated = $request->validate([
                'company_name' => ['nullable', 'string', 'max:255'],
                'industry' => ['nullable', 'string', 'max:255'],
                'about' => ['nullable', 'string'],
                'profile_picture' => ['nullable', 'image', 'mimes:jpg,png,jpeg,gif', 'max:2048'],
            ]);

            $profilePictureUrl = null;

            if ($request->hasFile('profile_picture')) {
                $uploadedFile = Cloudinary::upload($request->file('profile_picture')->getRealPath(), [
                    'folder' => 'profile_pictures',
                ]);
                $profilePictureUrl = $uploadedFile->getSecurePath();
            }

            Client::create([
                'user_id' => $user->id,
                'company_name' => $validated['company_name'],
                'industry' => $validated['industry'] ?? null,
                'about' => $validated['about'] ?? null,
                'profile_picture' => $profilePictureUrl,
            ]);

            return back()->with('success', 'Client profile created successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Client profile not created.']);
        }
    }

    public function update(Request $request): RedirectResponse
    {
        try {

            $user = Auth::user();
            $client = Client::where('user_id', $user->id)->first();

            if (!$client) {
                return back()->withErrors(['error' => 'Client profile not found.']);
            }

            $validated = $request->validate([
                'company_name' => ['nullable', 'string', 'max:255'],
                'industry' => ['nullable', 'string', 'max:255'],
                'about' => ['nullable', 'string'],
                'profile_picture' => ['nullable', 'image', 'mimes:jpg,png,jpeg,gif', 'max:2048'],
            ]);

            if ($request->hasFile('profile_picture')) {
                if ($client->profile_picture) {
                    $publicId = basename(parse_url($client->profile_picture, PHP_URL_PATH));
                    Cloudinary::destroy($publicId);
                }
                $uploadedFile = Cloudinary::upload($request->file('profile_picture')->getRealPath(), [
                    'folder' => 'profile_pictures'
                ]);
                $validated['profile_picture'] = $uploadedFile->getSecurePath();
            }

            $client->update(array_filter($validated, fn($value) => !is_null($value)));

            return back()->with('success', 'Client profile updated successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Client profile not updated.']);
        }
    }

    public function delete(): RedirectResponse
    {
        try {

            $user = Auth::user();
            $client = Client::where('user_id', $user->id)->first();

            if (!$client) {
                return back()->withErrors(['error' => 'Client profile not found.']);
            }

            if ($client->profile_picture) {
                $publicId = basename(parse_url($client->profile_picture, PHP_URL_PATH));
                Cloudinary::destroy($publicId);
            }

            $client->delete();

            return redirect()->route('client.profile')->with('success', 'Client profile deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Client profile not deleted.']);
        }
    }
}
