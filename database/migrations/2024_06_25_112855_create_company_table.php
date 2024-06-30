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
        Schema::create('company', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table -> string("companyName");
            $table -> string("description");

            $table -> unsignedBigInteger('planId');
            $table->unsignedBigInteger('ownerId');
            
            $table->foreign('ownerId')->references('id')->on('users');
            $table->foreign('planId')->references('id')->on('users');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('company');
    }
};
