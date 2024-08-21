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
        Schema::table('paypal', function (Blueprint $table) {
            $table->string('app_id')->nullable()->after('client_secret');
            $table->string('payment_action')->nullable()->after('app_id');
            $table->string('locale')->nullable()->after('payment_action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('paypal', function (Blueprint $table) {
            $table->dropColumn(['app_id', 'payment_action', 'locale']);
        });
    }
};
