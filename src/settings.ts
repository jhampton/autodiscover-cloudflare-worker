export default {
  info: {
    name: __COMPANY_NAME__,
    url: __SUPPORT_URL__,
  },
  domain: __DOMAIN__,
  imap: {
    host: __IMAP_HOST__,
    port: __IMAP_PORT__,
    socket: __IMAP_SOCKET__,
  },
  pop: {
    host: __POP_HOST__,
    port: __POP_PORT__,
    socket: __POP_SOCKET__,
  },
  smtp: {
    host: __SMTP_HOST__,
    port: __SMTP_PORT__,
    socket: __SMTP_SOCKET__,
    socketOpt: __SMTP_SOCKET_OPT__,
  },
  mobilesync: {
    url: __MOBILESYNC_URL__,
    name: __MOBILESYNC_NAME__,
  },
  ldap: {
    host: __LDAP_HOST__,
    port: __LDAP_PORT__,
    socket: __LDAP_SOCKET__,
    base: __LDAP_BASE__,
    userfield: __LDAP_USER_FIELD__,
    usersbase: __LDAP_USER_BASE__,
    searchfilter: __LDAP_SEARCH__,
  },
  mobile: {
    identifier: __PROFILE_IDENTIFIER__,
    uuid: __PROFILE_UUID__,
    mail: {
      uuid: __MAIL_UUID__,
    },
    ldap: {
      uuid: __LDAP_UUID__,
    },
  },
}
