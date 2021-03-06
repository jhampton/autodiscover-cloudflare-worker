export default `<?xml version="1.0" encoding="utf-8" ?>
<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
	<Response xmlns="{{{schema}}}">
		<User>
			<DisplayName>{{info.name}} Email</DisplayName>
		</User>
		{{ #imap.host }}
		<Account>
			<AccountType>email</AccountType>
			<Action>settings</Action>
			<ServiceHome>{{info.url}}</ServiceHome>

			<Protocol>
				<Type>IMAP</Type>
				<TTL>1</TTL>

				<Server>{{imap.host}}</Server>
				<Port>{{imap.port}}</Port>

				<LoginName>{{email}}</LoginName>

				<DomainRequired>on</DomainRequired>
				<DomainName>{{domain}}</DomainName>

				<SPA>off</SPA>
				<Encryption>{{imapenc}}</Encryption>
				<AuthRequired>on</AuthRequired>
			</Protocol>
		</Account>
		{{ /imap.host}}
		{{ #pop.host }}
		<Account>
			<AccountType>email</AccountType>
			<Action>settings</Action>
			<ServiceHome>{{info.url}}</ServiceHome>

			<Protocol>
				<Type>POP</Type>
				<TTL>1</TTL>

				<Server>{{pop.host}}</Server>
				<Port>{{pop.port}}</Port>

				<LoginName>{{email}}</LoginName>

				<DomainRequired>on</DomainRequired>
				<DomainName>{{domain}}</DomainName>

				<SPA>off</SPA>
				<Encryption>{{popenc}}</Encryption>
				<AuthRequired>on</AuthRequired>
			</Protocol>
		</Account>
		{{ /pop.host }}
		{{ #smtp.host }}
		<Account>
			<AccountType>email</AccountType>
			<Action>settings</Action>
			<ServiceHome>{{info.url}}</ServiceHome>

			<Protocol>
				<Type>SMTP</Type>
				<TTL>1</TTL>

				<Server>{{smtp.host}}</Server>
				<Port>{{smtp.port}}</Port>

				<LoginName>{{email}}</LoginName>

				<DomainRequired>on</DomainRequired>
				<DomainName>{{domain}}</DomainName>

				<SPA>off</SPA>
				<Encryption>{{smtpenc}}</Encryption>
				<AuthRequired>on</AuthRequired>
			</Protocol>
		</Account>
		{{ /smtp.host }}
		{{ #mobilesync.url }}
		<Action>
			<Settings>
				<Server>
					<Type>MobileSync</Type>
					<Url>{{mobilesync.url}}</Url>
					{{ #mobilesync.name }}
					<Name>{{mobilesync.name}}</Name>
					{{ /mobilesync.name }}
				</Server>
			</Settings>
		</Action>
		{{ /mobilesync.url }}
	</Response>
</Autodiscover>
`
