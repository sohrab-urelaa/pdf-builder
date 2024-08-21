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
        Schema::table('plans', function (Blueprint $table) {
            $table->integer('template_creation_limit')->nullable();
            $table->integer('template_submission_limit_per_template')->nullable();
            $table->integer('user_creation_limit')->nullable();
            $table->boolean('can_upload_certificate')->default(false);
            $table->boolean('can_config_email_template')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plans', function (Blueprint $table) {
            $table->dropColumn([
                'template_creation_limit',
                'template_submission_limit_per_template',
                'user_creation_limit',
                'can_upload_certificate',
                'can_config_email_template',
            ]);
        });
    }
};
