<?php

namespace App\Mail;

use App\Models\Feedback;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class FeedbackReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Feedback $feedback) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Phản hồi từ Maverick Dresses',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.feedback-reply',
            with: [
                'customerName'    => $this->feedback->name,
                'originalMessage' => $this->feedback->message,
                'adminReply'      => $this->feedback->admin_reply,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
