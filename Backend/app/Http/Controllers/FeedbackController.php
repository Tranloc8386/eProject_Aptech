<?php

namespace App\Http\Controllers;

use App\Mail\FeedbackReplyMail;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FeedbackController extends Controller
{
    // GET /api/feedbacks — admin xem danh sách
    public function index()
    {
        $feedbacks = Feedback::latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $feedbacks,
        ]);
    }

    // GET /api/feedbacks/{id}
    public function show($id)
    {
        $feedback = Feedback::findOrFail($id);

        return response()->json([
            'success' => true,
            'data'    => $feedback,
        ]);
    }

    // POST /api/feedbacks — khách hàng gửi feedback (không cần auth)
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:20',
            'message' => 'required|string|max:2000',
        ]);

        $feedback = Feedback::create([
            'name'    => $request->name,
            'email'   => $request->email,
            'phone'   => $request->phone,
            'message' => $request->message,
            'status'  => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.',
            'data'    => $feedback,
        ], 201);
    }

    // POST /api/feedbacks/{id}/reply — admin trả lời, gửi email
    public function reply(Request $request, $id)
    {
        $request->validate([
            'admin_reply' => 'required|string|max:5000',
        ]);

        $feedback = Feedback::findOrFail($id);

        $feedback->update([
            'admin_reply' => $request->admin_reply,
            'status'      => 'replied',
            'replied_at'  => now(),
        ]);

        Mail::to($feedback->email)->send(new FeedbackReplyMail($feedback));

        return response()->json([
            'success' => true,
            'message' => "Đã gửi email phản hồi đến {$feedback->email}!",
            'data'    => $feedback,
        ]);
    }

    // DELETE /api/feedbacks/{id} — admin xóa feedback
    public function destroy($id)
    {
        $feedback = Feedback::findOrFail($id);
        $feedback->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa feedback!',
        ]);
    }
}
