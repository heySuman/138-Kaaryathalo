<?php

namespace App\Notifications;

use Auth;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class JobStatusNotification extends Notification
{
    use Queueable;

    protected $jobApplication;

    /**
     * Create a new notification instance.
     */
    public function __construct($jobApplication)
    {
        $this->jobApplication = $jobApplication;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Job Application Updated')
            ->greeting('Hello,')
            ->line('Your application of ' . $this->jobApplication->job->title . ' has been updated.')
            ->action('View Applications', url('/freelancer/job-applications'))
            ->line('');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'job_id' => $this->jobApplication->job->id,
            'job_title' => $this->jobApplication->job->title,
            'message' => 'Your application of ' . $this->jobApplication->job->title . ' has been updated.',
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
