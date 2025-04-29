<?php

namespace App\Http\Controllers;

use App\Models\RatingReview;
use Illuminate\Http\Request;


class RatingReviewController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_posting_id' => 'required|exists:job_postings,id',
            'reviewer_id' => 'required|exists:users,id',
            'reviewee_id' => 'required|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);
        RatingReview::create($validated);

        return redirect()->back()->with('success', 'Review submitted successfully!');
    }

    public function update(Request $request, $id)
    {
        $review = RatingReview::findOrFail($id);

        $validated = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $review->update($validated);

        return redirect()->back()->with('success', 'Review updated successfully!');
    }

    public function destroy($id)
    {
        $review = RatingReview::findOrFail($id);
        $review->delete();

        return redirect()->back()->with('success', 'Review deleted successfully!');
    }
}
