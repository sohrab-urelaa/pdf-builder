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
        Schema::create('user_plan_histories', function (Blueprint $table) {
            $table->id();


            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('plan_id');
            $table->integer('template_creation_count')->nullable();
            $table->integer('user_creation_count')->nullable();
            $table->boolean('can_upload_certificate')->default(false);
            $table->boolean('can_config_email_template')->default(false);

            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('plan_id')->references('id')->on('plans');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_plan_histories');
    }
};
