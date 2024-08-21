<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('paypal', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('client_id');
            $table->string('client_secret');
            $table->boolean('is_active')->default(false);
            $table->boolean('test_mode')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paypal');
    }
};
