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
        Schema::table('submitted_template', function (Blueprint $table) {
            $table->unsignedBigInteger('owner_id')->default("1");
            $table->foreign('owner_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('submitted_template', function (Blueprint $table) {
              $table->dropColumn('description');
        });
    }
};
