export default `<?xml version="1.0" encoding="UTF-8" ?>
<Autodiscover xmlns="http://schemas.microsoft.com/exchange/autodiscover/responseschema/2006">
	<Response xmlns="{{{schema}}}">
		<Account>
			<AccountType>email</AccountType>
			<Action>settings</Action>
			<ServiceHome>{{{info.url}}}</ServiceHome>
			{{ #imap.host }}
			<Protocol>
				<Type>IMAP</Type>
				<Server>{{imap.host}}</Server>
				<Port>{{imap.port}}</Port>
				<DomainRequired>on</DomainRequired>
				<SPA>off</SPA>
				<SSL>on</SSL>
				<AuthRequired>on</AuthRequired>
			</Protocol>
			{{ /imap.host}}
			{{ ^imap.host }}
			{{ #pop.host }}
			<Protocol>
				<Type>POP</Type>
				<Server>{{pop.host}}</Server>
				<Port>{{pop.port}}</Port>
				<DomainRequired>on</DomainRequired>
				<SPA>off</SPA>
				<SSL>on</SSL>
				<AuthRequired>on</AuthRequired>
			</Protocol>
			{{ /pop.host }}
			{{ /imap.host }}
		  {{ #smtp.host }}
			<Protocol>
				<Type>SMTP</Type>
				<Server>{{smtp.host}}</Server>
				<Port>{{smtp.port}}</Port>
				<DomainRequired>on</DomainRequired>
				<SPA>off</SPA>
				<SSL>on</SSL>
				<AuthRequired>on</AuthRequired>
			</Protocol>
			{{ /smtp.host }}
		</Account>
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
