# Simple Email Autoconfig and Autodiscovery

[![Node.js CI](https://github.com/jhampton/autodiscover-cloudflare-worker/actions/workflows/basic_tests.yaml/badge.svg)](https://github.com/jhampton/autodiscover-cloudflare-worker/actions/workflows/basic_tests.yaml)

Based on https://github.com/Monogramm/autodiscover-email-settings

## Setup taken from Monogramm/autodiscover-email-settings

## DNS settings

    autoconfig              IN      AAAA   {{$PROXIED_DNS}}
    autodiscover            IN      AAAA   {{$PROXIED_DNS}}
    imap                    IN      CNAME  {{$MX_DOMAIN}}.
    smtp                    IN      CNAME  {{$MX_DOMAIN}}.
    @                       IN      MX 10  {{$MX_DOMAIN}}.
    @                       IN      TXT    "mailconf=https://autoconfig.{{$DOMAIN}}/mail/config-v1.1.xml"
    _imaps._tcp             IN      SRV    0 0 {{IMAP_PORT}} {{MX_DOMAIN}}.
    _pop3s._tcp             IN      SRV    0 0 {{POP_PORT}} {{MX_DOMAIN}}.
    _submission._tcp        IN      SRV    0 0 {{SMTP_PORT}} {{MX_DOMAIN}}.
    _autodiscover._tcp      IN      SRV    0 0 443 autodiscover.{{$DOMAIN}}.
    _ldap._tcp              IN      SRV    0 0 {{LDAP_PORT}} {{LDAP_HOST}}.

Replace above variables with data according to this table

| Variable        | Description                         |
| --------------- | ----------------------------------- |
| MX_DOMAIN       | The hostname name of your MX server |
| DOMAIN          | Your apex/bare/naked Domain         |
| PROXIED_DNS     | A placeholder `AAAA` record pointing to `100::`, which must be proxied through Cloudflare (orange-cloud in the DNS settings). This value specifically is the [reserved IPv6 discard prefix](https://tools.ietf.org/html/rfc6666) but is not the only value allowed. For example, you may also use an `A` record pointed to `192.0.2.1` or a `CNAME` pointed to any resolvable target. Whichever method you choose, your record must be proxied through Cloudflare (orange-clouded) and resolve successfully. |
| IMAP_PORT       | Port for your IMAP server           |
| POP_PORT        | Port for your POP server            |
| SMTP_PORT       | Port for your SMTP server           |
| LDAP_HOST       | The hostname of your LDAP server    |
| LDAP_PORT       | Port for your LDAP server           |

---

## Usage

- Clone this repo and make sure your have `wrangler` installed [Wrangler Docs](https://developers.cloudflare.com/workers/cli-wrangler/install-update#install)
- `npm i` (of course)
- Rename `wrangler.toml.example` to `wrangler.toml` and populate with variables. [Wrangler Docs](https://developers.cloudflare.com/workers/get-started/guide#6-preview-your-project)
- To test, use `wrangler dev`, to build use `wrangler build`
- Add the settings listed in `settings.ts` to your Cloudflare Worker Environment Variables
- Set up DNS records 
- Use `wrangler` to deploy your worker

## Credits

Inspired from <https://github.com/sylvaindumont/autodiscover.xml>, but without the few restrictions mentioned in the original project notes and with an optional simple support page to allow manual setup and iOS profile download.

The original project was inspired from <https://github.com/johansmitsnl/docker-email-autodiscover>, but with <https://github.com/Tiliq/autodiscover.xml> instead of <https://github.com/gronke/email-autodiscover> to allow a much lighter ([![](https://images.microbadger.com/badges/image/weboaks/autodiscover-email-settings.svg)](https://microbadger.com/images/weboaks/autodiscover-email-settings)) image based of node on alpine instead of apache on debian ([![](https://images.microbadger.com/badges/image/jsmitsnl/docker-email-autodiscover.svg)](https://microbadger.com/images/jsmitsnl/docker-email-autodiscover))

## Notes

The above autoconfiguration methods assume the following:

- If username does not contain `@`, full email address will be generated based on domain settings

## Links

- Mozilla [Autoconfig configuration](https://developer.mozilla.org/en-US/docs/Mozilla/Thunderbird/Autoconfiguration/FileFormat/HowTo)

- Microsoft [Exchange Command Reference](https://docs.microsoft.com/en-us/openspecs/exchange_server_protocols/ms-ascmd/1a3490f1-afe1-418a-aa92-6f630036d65a)

- Apple [ConfigurationProfile reference](https://developer.apple.com/library/archive/featuredarticles/iPhoneConfigurationProfileRef/index.html)

- [DNS SRV Records for LDAP](https://github.com/doctorjbeam/LDAPAutoDiscover)

- [Bootstrap](https://getbootstrap.com/), [jQuery](https://jquery.com/) and [Popper.js](https://popper.js.org/) used for default support page

## License

This project is distributed under the [MIT License](LICENSE)
