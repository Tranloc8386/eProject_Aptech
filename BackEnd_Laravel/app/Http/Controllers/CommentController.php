<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // GET /api/comments
    public function index()
    {
        $comments = Comment::with(['user', 'product'])
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Danh sách bình luận',
            'data' => $comments
        ], 200);
    }

    // GET /api/comments/{id}
    public function show(Comment $comment)
    {
        $comment->load(['user', 'product']);

        return response()->json([
            'success' => true,
            'data' => $comment
        ], 200);
    }

    // DELETE /api/comments/{id}
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đã xóa bình luận thành công!'
        ], 200);
    }
}
