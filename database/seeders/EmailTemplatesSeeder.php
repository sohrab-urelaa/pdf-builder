<?php

namespace Database\Seeders;

use App\Models\EmailTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmailTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         EmailTemplate::create([
            'name' => EmailTemplate::REGISTRATION_SUCCESS_EMAIL,
            'subject' => 'Welcome to Our Platform!',
            'body' => 'Hello {name}, welcome to our platform. Your registration was successful!',
            "status"=>EmailTemplate::STATUS_ACTIVE
        ]);

    }
}
