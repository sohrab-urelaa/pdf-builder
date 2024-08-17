<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="mindcatchlight"
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

<body class="font-sans antialiased bg-base-200">
    @inertia

    <script>
        //load the fonts

        const loadDynamicFont = (font) => {
            const fontLink = window?.origin + "/storage/" + font?.font_family_file;
            const fontName = font?.font_name;
            const fontFace = new FontFace(fontName, `url(${fontLink})`);
            fontFace.load().then(function(loadedFont) {
                document.fonts.add(loadedFont);
                document.body.style.fontFamily = fontName;
            });
        }


        const fetchFooters = async () => {
            fetch("/site-navs")
                .then(res => res.json())
                .then(data => {
                    if (data.headers) {
                        window.HEADER_LIST = data.headers;
                    }
                    if (data.footers) {
                        window.FOOTER_LIST = data.footers;
                    }
                })
        }
        fetchFooters();

        fetch('/site-settings')
            .then(response => response.json())
            .then(data => {
                const site_settings = data?.settings;
                window.SITE_SETTINGS = site_settings;
                window.SUPPORTED_LANGUAGES = data.languages || [];
                if (site_settings.favicon) {
                    document.getElementById('favicon').href = site_settings.favicon;
                }
                if (site_settings.theme) {
                    // document.documentElement.setAttribute('data-theme', site_settings.theme);
                }

                //check font is setted from admin panel

                if (data?.font) {
                    loadDynamicFont(data?.font)
                }



            });
        const selectedTheme = localStorage.getItem("theme");
        const currentTheme = selectedTheme ? selectedTheme : "mindcatchlight";
        document.documentElement.setAttribute('data-theme', currentTheme);
        const isRTL = localStorage.getItem("isRTL") === "1";
        if (isRTL) {
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.documentElement.removeAttribute("dir");
        }
    </script>
</body>

</html>