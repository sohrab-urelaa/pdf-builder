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
        Schema::create('my_fatoorahs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('api_key');
            $table->boolean('is_active')->default(false);
            $table->boolean('test_mode')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('my_fatoorahs');
    }
};
