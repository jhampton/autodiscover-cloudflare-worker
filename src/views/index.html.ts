export default `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="description" content="{{info.name}} Email Settings">
    <meta name="author" content="{{info.name}}">

    <title>{{info.name}}</title>

    <link rel="shortcut icon" href="favicon.ico" />

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous">

    <style>
        :root {
            --input-padding-x: .75rem;
            --input-padding-y: .75rem;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            padding-top: 3.5rem;
            position: relative;

            transition: background-color .1s ease-in-out, color .1s ease-in-out;
        }

        body.dark {
            background-color: #222;
            color: #fcfcfc;
        }

        .dark .card,
        .dark .jumbotron {
            background-color: #333;
            border-color: rgba(255, 255, 255, 0.13);
        }

        .dark hr {
            border-top: 1px solid rgba(255, 255, 255, 0.13);
        }

        .dark .text-dark {
            color: #fff !important;
        }

        .dark a.text-dark:focus,
        .dark a.text-dark:hover {
            color: #fff !important;
        }

        svg.theme-switch {
            fill: #fc0;
        }

        svg.theme-switch .shadow {
            fill: #343a4000;
            transition: fill .1s ease-in-out, content .1s ease-in-out;
        }

        .dark svg.theme-switch {
            fill: #cac9c5;
        }

        .dark svg.theme-switch .shadow {
            fill: #343a40;
        }

        .form-mobileconfig {
            max-width: 420px;
            padding: 15px;
        }

        .form-label-group {
            position: relative;
            margin-bottom: 1rem;
        }

        .form-label-group>input,
        .form-label-group>label {
            padding: var(--input-padding-y) var(--input-padding-x);
        }

        .form-label-group>label {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            margin-bottom: 0;
            /* Override default <label> margin */
            line-height: 1.5;
            color: #495057;
            border: 1px solid transparent;
            border-radius: .25rem;
            transition: all .1s ease-in-out;
        }

        .form-label-group input::-webkit-input-placeholder {
            color: transparent;
        }

        .form-label-group input:-ms-input-placeholder {
            color: transparent;
        }

        .form-label-group input::-ms-input-placeholder {
            color: transparent;
        }

        .form-label-group input::-moz-placeholder {
            color: transparent;
        }

        .form-label-group input::placeholder {
            color: transparent;
        }

        .form-label-group input:not(:placeholder-shown) {
            padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
            padding-bottom: calc(var(--input-padding-y) / 3);
        }

        .form-label-group input:not(:placeholder-shown)~label {
            padding-top: calc(var(--input-padding-y) / 3);
            padding-bottom: calc(var(--input-padding-y) / 3);
            font-size: 12px;
            color: #777;
        }

        .form-label-group input {
            cursor: text;
            transition: all .1s ease-in-out;
        }

        .form-label-group input:invalid {
            border: 1px solid #dc35469d;
        }

        .form-label-group input:focus:invalid {
            box-shadow: 0px 0px 3px 2px #dc35469d;
        }

        .form-label-group input:focus:valid {
            border: 1px solid #28a7459d;
            box-shadow: 0px 0px 3px 2px #28a7459d;
        }
    </style>

    <script>
        function fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Fallback: Copying text command was ' + msg);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }

            document.body.removeChild(textArea);
        }
        function copyTextToClipboard(text) {
            if (!navigator.clipboard) {
                fallbackCopyTextToClipboard(text);
                return;
            }
            navigator.clipboard.writeText(text).then(function () {
                console.log('Async: Copying to clipboard was successful!');
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
        }

        function copy(domId) {
            let dom = document.getElementById(domId);
            if (dom) {
                copyTextToClipboard(dom.innerText);
            }
        }

        function getCookie(cname) {
            var name = cname + '=';
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return null;
        }

        function setTheme(theme) {
            // One month duration
            const defaultDuration = 1000 * 60 * 60 * 24 * 31;
            const expiry = new Date(Date.now() + defaultDuration);
            const mainThemeCookie = "main_theme";
            document.cookie = mainThemeCookie + '=' + theme + '; expires=' + expiry.toGMTString();
            document.getElementById('body').className = theme;
        }

        function switchTheme() {
            var forceSide = document.getElementById('body').className;

            if (forceSide === 'light') {
                console.log('Come to the dark side! We have cookies!');
                forceSide = 'dark';
            } else {
                console.log('I find your lack of faith disturbing.');
                forceSide = 'light';
            }

            setTheme(forceSide);
        }
    </script>
</head>

<body id="body" data-spy="scroll" data-target="#navbar-main" class="light">
    <nav id="navbar-main" class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="#">{{info.name}}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault"
            aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsDefault">
            <ul class="navbar-nav mr-autonav-tabs mr-auto" role="tablist">
                <li class="nav-item">
                    <a class="nav-link" href="#automatic">Automatic</a>
                </li>
                {% if mobile.identifier %}<li class="nav-item">
                    <a class="nav-link" href="#mobileconfig">iOS</a>
                </li>{% endif %}
                <li class="nav-item">
                    <a class="nav-link" href="#manualconfig">Manual configuration</a>
                </li>
            </ul>

            <div class="mt-2 mt-md-0 align-items-center">
                <a class="text-muted" href="#" onclick="switchTheme();">
                    <svg xmlns="http://www.w3.org/2000/svg" class="theme-switch mx-3" width="30" height="30"
                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" role="img" viewBox="0 0 24 24" 
                        focusable="false">
                        <title>Switch theme</title>
                        <circle cx="12.5" cy="12.5" r="10"></circle>
                        <circle cx="5" cy="12.5" r="10" class="shadow"></circle>
                    </svg>
                </a>
            </div>
        </div>
    </nav>

    <main role="main">
        <div class="jumbotron">
            <div class="container">
                <h1 class="display-4">{{info.name}} generic settings</h1>
                <p class="lead">Generic settings support page</p>
                <p>This is a simple support page for email automatic configuration service.
                    It provides IMAP/POP/SMTP/LDAP Autodiscover capabilities on Microsoft Outlook/Apple Mail, Autoconfig
                    capabilities for Thunderbird, and Configuration Profiles for iOS/Apple Mail.
                </p>
                <p><a class="btn btn-primary btn-lg" href="https://github.com/Monogramm/autodiscover-email-settings"
                        target="_blank" role="button">Learn more &raquo</a></p>
            </div>
        </div>

        <div class="container">
            <h3 id="automatic" class="h3 font-weight-normal">Automatic settings</h3>

            <div class="mb-5">
                <p>Thanks to the <a href="/mail/config-v1.1.xml">autoconfig</a> and
                    <a href="/autodiscover/autodiscover.xml">autodiscover</a> services,
                    <strong>most of the recent mail clients</strong> (<em>Microsoft Outlook</em>, <em>Apple Mail</em>, 
                    <em>Mozilla Thunderbird</em>, ...) <strong>should automatically be configured</strong> with the
                    recommended settings for this email server just after entering your email address <code>@{{domain}}</code>.</p>

                <p>If you encounter some issues, depending on your situation, you can:</p>
                <ul>
                    {% if mobile.identifier %}<li>easily configure your Apple Mobile devices (<em>iPhone / iPad</em>) with
                        <a href="#mobileconfig">this simple form</a></li>{% endif %}
                    <li>setup your email application with the <a href="#manualconfig">manual configuration</a></li>
                </ul>
            </div>

            <hr>

        </div> <!-- /container -->

        {%- if mobile.identifier %}
        <div class="container">
            <h3 id="mobileconfig" class="h3 font-weight-normal">Apple Configuration Profile</h3>

            <div class="mb-5">
                <p>Enter your username or full email address and click the download button to setup your Apple mobile
                    device.</p>

                <form class="form-mobileconfig" action="/email.mobileconfig" method="get">

                    <div class="form-label-group">
                        <input type="text" name="email" id="inputId" class="form-control form-control-lg"
                            placeholder="Username or email" required />
                        <label for="inputId">Username or email</label>
                    </div>

                    <button class="btn btn-lg btn-primary btn-block" type="submit">Download</button>
                </form>
            </div>

            <hr>

        </div> <!-- /container -->
        {% endif -%}

        <div class="container">
            <h3 id="manualconfig" class="h3 font-weight-normal">Manual configuration</h3>

            <div class="mb-5">
                <p>Copy the following settings to your email application.</p>

                <div class="row">
                    {%- if imap.host %}
                    <div class="col-md-6">
                        <h5 id="manualconfig-imap">Incoming server (IMAP)</h5>
                        <dl>
                            <dt>Hostname <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy IMAP hostname"
                                onclick="copy('manualconfig-imap-hostname')">Copy</button></dt>
                            <dd id="manualconfig-imap-hostname">{{imap.host}}</dd>

                            <dt>Port <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy IMAP port"
                                onclick="copy('manualconfig-imap-port')">Copy</button></dt>
                            <dd id="manualconfig-imap-port">{{imap.port}}</dd>

                            <dt>Encryption <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy IMAP encryption"
                                onclick="copy('manualconfig-imap-socket')">Copy</button></dt>
                            <dd id="manualconfig-imap-socket">{{imap.socket}}</dd>
                        </dl>
                    </div>
                    {% endif -%}

                    {%- if pop.host %}
                    <div class="col-md-6">
                        <h5 id="manualconfig-pop">Incoming server (POP)</h5>
                        <dl>
                            <dt>Hostname <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy POP hostname"
                                onclick="copy('manualconfig-pop-hostname')">Copy</button></dt>
                            <dd id="manualconfig-pop-hostname">{{pop.host}}</dd>

                            <dt>Port <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy POP port"
                                onclick="copy('manualconfig-pop-port')">Copy</button></dt>
                            <dd id="manualconfig-pop-port">{{pop.port}}</dd>

                            <dt>Encryption <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy POP encryption"
                                onclick="copy('manualconfig-pop-socket')">Copy</button></dt>
                            <dd id="manualconfig-pop-socket">{{pop.socket}}</dd>
                        </dl>
                    </div>
                    {% endif -%}
                </div>

                <div class="row">
                    {%- if smtp.host %}
                    <div class="col-md-6">
                        <h5 id="manualconfig-smtp">Outgoing server (SMTP)</h5>
                        <dl>
                            <dt>Hostname <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy SMTP hostname"
                                onclick="copy('manualconfig-smtp-hostname')">Copy</button></dt>
                            <dd id="manualconfig-smtp-hostname">{{smtp.host}}</dd>

                            <dt>Port <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy SMTP port"
                                onclick="copy('manualconfig-smtp-port')">Copy</button></dt>
                            <dd id="manualconfig-smtp-port">{{smtp.port}}</dd>

                            <dt>Encryption <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy SMTP encryption"
                                onclick="copy('manualconfig-smtp-socket')">Copy</button></dt>
                            <dd id="manualconfig-smtp-socket">{{smtp.socket}}</dd>
                        </dl>
                    </div>
                    {% endif -%}
                </div>

                {%- if mobilesync.url %}
                <p>If you want to connect using ActiveSync on your mobile, you can connect to the following host.</p>
                <div class="row">
                    <div class="col-md-12">
                        <h5 id="manualconfig-mobilesync">ActiveSync (Mobile)</h5>
                        <dl>
                            <dt>URL <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy ActiveSync URL"
                                onclick="copy('manualconfig-mobilesync-url')">Copy</button></dt>
                            <dd id="manualconfig-mobilesync-url">{{mobilesync.url}}</dd>
                        </dl>
                    </div>
                </div>
                {% endif -%}
                {%- if ldap.host %}
                <p>If your email application supports LDAP contacts, copy the following settings.</p>

                <div class="row">
                    <div class="col-md-12">
                        <h5 id="manualconfig-ldap">Contacts (LDAP)</h5>
                        <dl>
                            <dt>Hostname <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy LDAP hostname"
                                onclick="copy('manualconfig-ldap-hostname')">Copy</button></dt>
                            <dd id="manualconfig-ldap-hostname">{{ldap.host}}</dd>

                            <dt>Port <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy LDAP port"
                                onclick="copy('manualconfig-ldap-port')">Copy</button></dt>
                            <dd id="manualconfig-ldap-port">{{ldap.port}}</dd>

                            <dt>Encryption <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy LDAP encryption"
                                onclick="copy('manualconfig-ldap-socket')">Copy</button></dt>
                            <dd id="manualconfig-ldap-socket">{{ldap.socket}}</dd>

                            <dt>Base <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy LDAP base"
                                onclick="copy('manualconfig-ldap-base')">Copy</button></dt>
                            <dd id="manualconfig-ldap-base">{{ldap.base}}</dd>

                            <dt>Username (replace <code>your.username</code> with your actual username) <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy LDAP template username"
                                onclick="copy('manualconfig-ldap-username')">Copy</button></dt>
                            <dd id="manualconfig-ldap-username">{{ldap.userfield}}=<code>your.username</code>,{{ldap.usersbase}}</dd>

                            <dt>Search Filter <button type="button"
                                class="btn btn-outline-secondary btn-sm"
                                title="Copy LDAP search filter"
                                onclick="copy('manualconfig-ldap-searchfilter')">Copy</button></dt>
                            <dd id="manualconfig-ldap-searchfilter">{{ldap.searchfilter}}</dd>
                        </dl>
                    </div>
                </div>
                {% endif -%}
            </div>

            <hr>

        </div> <!-- /container -->

    </main>

    <footer class="container">
        <p class="mt-5 mb-3 text-muted text-center">&copy; {{info.name}}</p>
    </footer>

    <!-- Bootstrap core JavaScript ================================================== -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>

    <!-- Custom JavaScript ================================================== -->
    <script>
        const mainThemeCookie = "main_theme";
        let bodyClass;
        if (document.cookie) {
            bodyClass = getCookie(mainThemeCookie);
        }
        if (!!!bodyClass) {
            bodyClass = "light";
        }
        document.getElementById('body').className = bodyClass;
    </script>
</body>

</html>
`
