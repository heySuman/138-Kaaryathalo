<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('disputes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_posting_id')->constrained('job_postings')->cascadeOnDelete();
            $table->foreignId('submitted_by_user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('user_type', ['freelancer', 'employer']);
            $table->enum('dispute_type', ['payment_issue', 'task_not_submitted'])->comment('Type of dispute');
            $table->text('description')->nullable()->comment('Details provided by the user about the dispute');
            $table->enum('status', ['open', 'resolved', 'rejected'])->default('open')->comment('Dispute status tracking');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disputes');
    }
};
