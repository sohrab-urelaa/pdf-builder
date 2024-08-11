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
        Schema::create('header_sub_options', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nav_item_id');
            $table->string('image');
            $table->string('title');
            $table->text('description');
            $table->string('link')->nullable();
            $table->timestamps();

            $table->foreign('nav_item_id')->references('id')->on('header_items')->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('header_sub_options');
    }
};
