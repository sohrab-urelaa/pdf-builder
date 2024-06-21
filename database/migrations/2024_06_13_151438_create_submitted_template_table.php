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
        Schema::create('submitted_template', function (Blueprint $table) {
            $table->id();
            $table->string("submitted_user_email");
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('template_id');
            $table->string("template_json");
            $table->string("templated_pdf_link");
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('template_id')->references('id')->on('pdf_template');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submitted_template');
    }
};
