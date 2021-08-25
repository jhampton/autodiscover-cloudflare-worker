export default `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>HasRemovalPasscode</key>
	<false/>
	<key>PayloadContent</key>
	<array>{{ #imapOrPop }}
		<dict>
			<key>EmailAccountDescription</key>
			<string>{{info.name}} Email</string>
			<key>EmailAccountName</key>
			<string>{{email}}</string>
			<key>EmailAccountType</key>
			<string>{{#imap.host}}EmailTypeIMAP{{/imap.host}}{{^imap.host}}EmailTypePOP{{/imap.host}}</string>
			<key>EmailAddress</key>
			<string>{{email}}</string>
			<key>IncomingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>IncomingMailServerHostName</key>
			<string>{{ #imap.host }}{{ imap.host }}{{ /imap.host }}{{ ^imap.host }}{{ pop.host }}{{ /imap.host }}</string>
			<key>IncomingMailServerPortNumber</key>
			<integer>{{ #imap.host }}{{imap.port}}{{ /imap.host }}{{ ^imap.host }}{{pop.port}}{{ /imap.host }}</integer>
			<key>IncomingMailServerUseSSL</key>
			<{{ #imap.host }}{{imapssl}}{{ /imap.host}}{{ ^imap.host }}{{popssl}}{{ /imap.host}}/>
			<key>IncomingMailServerUsername</key>
			<string>{{email}}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<true/>
			<key>OutgoingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>OutgoingMailServerHostName</key>
			<string>{{smtp.host}}</string>
			<key>OutgoingMailServerPortNumber</key>
			<integer>{{smtp.port}}</integer>
			<key>OutgoingMailServerUseSSL</key>
			<{{smtpssl}}/>
			<key>OutgoingMailServerUsername</key>
			<string>{{email}}</string>
			<key>SMIMEEnabled</key>
			<false/>
			<key>SMIMEEnablePerMessageSwitch</key>
			<false/>
			<key>SMIMEEnableEncryptionPerMessageSwitch</key>
			<false/>
			<key>disableMailRecentsSyncing</key>
			<false/>
			<key>PayloadDescription</key>
			<string>{{info.name}} Email</string>
			<key>PayloadDisplayName</key>
			<string>{{email}}</string>
			<key>PayloadIdentifier</key>
			<string>{{mobile.identifier}}.com.apple.mail.managed.{{mobile.mail.uuid}}</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>{{mobile.mail.uuid}}</string>
			<key>PayloadVersion</key>
			<real>1</real>
		</dict>{{ /imapOrPop }}
		{{ #ldap.host }}
		<dict>
			<key>LDAPAccountDescription</key>
			<string>{{info.name}} LDAP</string>
			<key>LDAPAccountHostName</key>
			<string>{{ldap.host}}</string>
			<key>LDAPAccountUseSSL</key>
			<{{ldapssl}}/>
			<key>LDAPAccountUserName</key>
			<string>{{ldap.userfield}}={{username}},{{ldap.usersbase}}</string>
			<key>LDAPSearchSettings</key>
			<array>
				<dict>
					<key>LDAPSearchSettingDescription</key>
					<string>{{info.name}} Contacts</string>
					<key>LDAPSearchSettingSearchBase</key>
					<string>{{ldap.base}}</string>
					<key>LDAPSearchSettingScope</key>
					<string>LDAPSearchSettingScopeSubtree</string>
				</dict>
			</array>
			<key>PayloadDescription</key>
			<string>{{info.name}} LDAP</string>
			<key>PayloadDisplayName</key>
			<string>{{info.name}} Contacts</string>
			<key>PayloadIdentifier</key>
			<string>{{mobile.identifier}}.com.apple.ldap.account.{{mobile.ldap.uuid}}</string>
			<key>PayloadType</key>
			<string>com.apple.ldap.account</string>
			<key>PayloadUUID</key>
			<string>{{mobile.ldap.uuid}}</string>
			<key>PayloadVersion</key>
			<real>1</real>
		</dict>
{{/ldap.host}}
	</array>
	<key>PayloadDescription</key>
	<string>{{info.name}}</string>
	<key>PayloadDisplayName</key>
	<string>{{info.name}}</string>
	<key>PayloadIdentifier</key>
	<string>{{mobile.identifier}}</string>
	<key>PayloadOrganization</key>
	<string>{{domain}}</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>{{mobile.uuid}}</string>
	<key>PayloadVersion</key>
	<integer>2</integer>
</dict>
</plist>
`
