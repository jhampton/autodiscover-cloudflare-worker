export default `<?xml version="1.0" encoding="UTF-8"?>
<clientConfig version="1.1">
	<emailProvider id="{{domain}}">
	    <domain>{{domain}}</domain>
	    <displayName>{{info.name}} Email</displayName>
	    <displayShortName>%EMAILLOCALPART%</displayShortName>
		{{ #imap.host }}
	    <incomingServer type="imap">
			<hostname>{{imap.host}}</hostname>
			<port>{{imap.port}}</port>
			<socketType>{{imap.socket}}</socketType>
			<authentication>password-cleartext</authentication>
			<username>%EMAILADDRESS%</username>
		</incomingServer>
		{{ /imap.host }}
		{{ #pop.host }}
	    <incomingServer type="pop3">
			<hostname>{{pop.host}}</hostname>
			<port>{{pop.port}}</port>
			<socketType>{{pop.socket}}</socketType>
			<authentication>password-cleartext</authentication>
			<username>%EMAILADDRESS%</username>
		</incomingServer>
		{{ /pop.host }}
		{{ #smtp.host }}
	    <outgoingServer type="smtp">
			<hostname>{{smtp.host}}</hostname>
			<port>{{smtp.port}}</port>
			<socketType>{{smtp.socket}}</socketType>
			<authentication>password-cleartext</authentication>
			<username>%EMAILADDRESS%</username>
	    </outgoingServer>
		{{ /smtp.host }}
		<documentation url="{{info.url}}">
			<descr lang="en">Generic settings page</descr>
			<descr lang="fr">Paramètres généraux</descr>
			<descr lang="es">Configuraciones genéricas</descr>
			<descr lang="de">Allgemeine Beschreibung der Einstellungen</descr>
			<descr lang="ru">Страница общих настроек</descr>
		</documentation>
	</emailProvider>
</clientConfig>`
