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
        Schema::table('supported_languages', function (Blueprint $table) {
          $table->boolean('rtl')->default(false)->after('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supported_languages', function (Blueprint $table) {
            Schema::table('supported_languages', function (Blueprint $table) {
                $table->dropColumn('rtl');
            });
        });
    }
};
