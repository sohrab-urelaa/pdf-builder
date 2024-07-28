<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('submitted_template', function (Blueprint $table) {
            // Check and drop foreign key constraint if it exists
            $table->dropForeign(['user_id']);

            // Drop the user_id column if it exists
            if (Schema::hasColumn('submitted_template', 'user_id')) {
                $table->dropColumn('user_id');
            }

            // Add the submitted_user_name column if it does not exist
            if (!Schema::hasColumn('submitted_template', 'submitted_user_name')) {
                $table->string('submitted_user_name')->after('submitted_user_email');
            }
        });
    }

    public function down()
    {
        Schema::table('submitted_template', function (Blueprint $table) {
            // Re-add the user_id column
            if (!Schema::hasColumn('submitted_template', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable();
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            }

            // Drop the submitted_user_name column if it exists
            if (Schema::hasColumn('submitted_template', 'submitted_user_name')) {
                $table->dropColumn('submitted_user_name');
            }
        });
    }
};
