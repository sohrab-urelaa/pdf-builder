<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
         Schema::table('subscriptions', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable()->default(null);
            $table->foreign('company_id')->references('id')->on('company')->onDelete('cascade');
        });
    }
    public function down(): void
    {
        Schema::table("subscriptions",function (Blueprint $table){
           $table->dropColumns('company_id');
        });
    }
};
