<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageSent;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request, User $user)
    {
        $authId = auth()->id();
        $messages = Message::where(function ($query) use ($authId, $user) {
            $query->where('sender_id', $authId)
                ->where('receiver_id', $user->id);
        })->orWhere(function ($query) use ($authId, $user) {
            $query->where('sender_id', $user->id)
                ->where('receiver_id', $authId);
        })->orderBy('created_at')->get();

        $messages = $messages->map(function ($message) {
            $message->message = decrypt($message->message);
            return $message;
        });

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:1000',
        ]);

        $encryptedMessage = encrypt($validated['message']);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $validated['receiver_id'],
            'message' => $encryptedMessage,
        ]);

        return response()->json($message);
    }
}
