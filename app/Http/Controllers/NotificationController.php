<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get all notifications for the logged-in user
     */
    public function getNotifications(Request $request)
    {
        \Log::info('Authenticated User: ', ['user' => $request->user()]);
        $notifications = $request->user()->notifications()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($notifications);
    }
}
