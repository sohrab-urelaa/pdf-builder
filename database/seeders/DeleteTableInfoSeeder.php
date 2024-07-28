<?php

namespace Database\Seeders;

use App\Models\PdfTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeleteTableInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('submitted_template')->delete();
        DB::table('pdf_template')->delete();
        DB::table('users')->delete();
        DB::table('company')->delete();
        DB::table('plans')->delete();
        DB::table('ssl_certificates')->delete();
        DB::table('subscriptions')->delete();
    }
}
