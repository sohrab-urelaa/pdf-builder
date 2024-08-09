<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="cupcake">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link id="favicon" rel="icon" href="{{ mix('/favicon.ico') }}">
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

         <script>
        fetch('/site-settings')
            .then(response => response.json())
            .then(data => {
                const site_settings=data?.settings;
                window.SITE_SETTINGS=site_settings;
                window.SUPPORTED_LANGUAGES=data.languages || [];
                if (site_settings.favicon) {
                    document.getElementById('favicon').href = site_settings.favicon;
                }
                 if (site_settings.theme) {
                    document.documentElement.setAttribute('data-theme', site_settings.theme);
                }
            });
    </script>
    </body>
</html>
