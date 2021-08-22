export interface TemplateSettings {
  info: {
    name: string
    url: string
  }
  domain: string
  imap: {
    host: string
    port: number
    socket: string
  }
  pop: {
    host: string
    port: number
    socket: string
  }
  smtp: {
    host: string
    port: number
    socket: string
  }
  mobilesync: {
    url: string
    name: string
  }
  ldap: {
    host: string
    port: number
    socket: string
    base: string
    userfield: string
    usersbase: string
    searchfilter: string
  }
  mobile: {
    identifier: string
    uuid: string
    mail: {
      uuid: string
    }
    ldap: {
      uuid: string
    }
  }
}
