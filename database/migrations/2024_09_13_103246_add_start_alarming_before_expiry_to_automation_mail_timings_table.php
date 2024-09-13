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
        Schema::table('automation_mail_timings', function (Blueprint $table) {
            $table->integer('start_alarming_before_expiry')->default(7)->comment('Time in days before expiry to start alarming');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('automation_mail_timings', function (Blueprint $table) {
            $table->dropColumn('start_alarming_before_expiry');
        });
    }
};
