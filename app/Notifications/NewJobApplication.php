<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewJobApplication extends Notification implements ShouldQueue
{
    use Queueable;

    protected $job;

    public function __construct($job)
    {
        $this->job = $job;
    }

    /**
     * Notification Channels
     */
    public function via($notifiable)
    {
        return ['database', 'mail'];;
    }

    /**
     * Database Representation of Notification
     */
    public function toDatabase($notifiable): array
    {
        return [
            'job_id' => $this->job->id,
            'job_title' => $this->job->title,
            'message' => 'Your job posting has received a new application!',
        ];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Job Application')
            ->greeting('Hello, ' . $this->job->client->user->name)
            ->line('Your job posting has received a new application!')
            ->action('View Job', url(':8000/client/my-jobs/' . $this->job->id));
    }
}
