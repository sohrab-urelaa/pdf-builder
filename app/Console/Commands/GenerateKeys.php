<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class GenerateKeys extends Command
{
    protected $signature = 'keys:generate';
    protected $description = 'Generate and store public/private keys for PDF signing';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Generate keys
        $privateKey = openssl_pkey_new([
            'digest_alg' => 'sha256',
            'private_key_bits' => 2048,
            'private_key_type' => OPENSSL_KEYTYPE_RSA,
        ]);

        // Export private key
        openssl_pkey_export($privateKey, $privateKeyOut);
        
        // Get public key
        $publicKey = openssl_pkey_get_details($privateKey)['key'];

        // Store keys securely
        Storage::disk('local')->put('private.key', $privateKeyOut);
        Storage::disk('local')->put('public.key', $publicKey);

        $this->info('Keys have been generated and stored successfully.');
    }
}
