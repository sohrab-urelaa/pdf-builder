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
        Schema::create('automation_mail_timings', function (Blueprint $table) {
            $table->id();
            $table->integer('plan_extension_notifieng_mail_interval');
            $table->integer('free_user_plan_upgrade_notifieng_mail_interval');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('automation_mail_timings');
    }
};
