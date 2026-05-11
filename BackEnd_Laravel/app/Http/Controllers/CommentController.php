<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
   // 1. Hiển thị danh sách bình luận
    public function index() {
        // Lấy bình luận kèm thông tin User và Product để hiển thị cho rõ
        $comments = Comment::with(['user', 'product'])->latest()->get();
        return view('comments.index', compact('comments'));
    }

    // 2. Xóa bình luận (Dành cho Admin khi muốn gỡ bỏ comment xấu)
    public function destroy(Comment $comment) {
        $comment->delete();
        return back()->with('success', 'Đã xóa bình luận thành công!');
    }

    // Lưu ý: Thường không làm trang Create hay Edit cho Comment trong Admin
    // vì Admin không nên sửa nội dung khách viết.
}
