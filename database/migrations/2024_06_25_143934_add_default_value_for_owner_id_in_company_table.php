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
        Schema::table('company', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['ownerId']);
            
            // Modify the ownerId column to be nullable and set default to null
            $table->unsignedBigInteger('ownerId')->nullable()->default(null)->change();
            
            // Add the foreign key constraint back with onDelete set to set null
            $table->foreign('ownerId')->references('id')->on('users')->onDelete('set null');
       });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company', function (Blueprint $table) {
               // Drop the modified foreign key constraint
            $table->dropForeign(['ownerId']);
            
            // Change the ownerId column back to non-nullable and remove default
            $table->unsignedBigInteger('ownerId')->nullable(false)->default(null)->change();
            
            // Add the original foreign key constraint back without onDelete
            $table->foreign('ownerId')->references('id')->on('users');
        });
    }
};
