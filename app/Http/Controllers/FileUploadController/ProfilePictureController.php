<?php

namespace App\Http\Controllers\FileUploadController;

use App\Http\Controllers\Controller;
use App\Models\Freelancer\Freelancer;
use Cloudinary\Api\Exception\ApiError;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProfilePictureController extends Controller
{
    /**
     * @throws ApiError
     */
    public function uploadAvatar(Request $request)
    {
        $request->validate(['profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048']);

        try {
            // Retrieve the authenticated user
            $user = $request->user();
            $freelancer = Freelancer::where('user_id', $user->id)->first();

            $uploadedFileUrl = cloudinary()->upload($request->file('avatar')->getRealPath(), [
                'folder' => 'profile_pictures',
            ])->getSecurePath();

            // Save the avatar URL to the user record
            $freelancer->profile_picture = $uploadedFileUrl;
            $freelancer->save();

            // Return a success message
            return back()->with('success', 'You have successfully uploaded your avatar!');
        } catch (\Exception $e) {
            // Log the error
            Log::error('Profile upload failed: ' . $e->getMessage());

            // Return an error message
            return back()->with('error', 'There was an issue uploading your avatar. Please try again later.');
        }
    }
}
