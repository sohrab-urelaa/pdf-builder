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
        Schema::table('header_items', function (Blueprint $table) {
            $table->boolean('has_dynamic_html')->default(false);
            $table->longText('dynamic_html')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('header_items', function (Blueprint $table) {
            $table->dropColumn(['has_dynamic_html', 'dynamic_html']);
        });
    }
};
