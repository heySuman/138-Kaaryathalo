<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->timestamp('expiry_date')->nullable();
            $table->enum('timeline', ['less than a month', 'less than three months', 'more than three months']);
            $table->decimal('budget', 10, 2);
            $table->json('skills');
            $table->enum('experience_level', ['fresher', 'intermediate', 'expert']);
            $table->enum('status', ['pending', 'in progress', 'completed'])->default('pending');
            $table->enum('visibility', ['public', 'private'])->default('public');
            $table->enum('payment_type', ['fixed', 'hourly'])->default('fixed');
            $table->json('attachments')->nullable();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
