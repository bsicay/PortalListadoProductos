const consts = {
  apiPath: '/api',
  roles: {
    admin: 'administrador',
    collaborator: 'colaborador'
  },
  token: {
    refresh: 'REFRESH',
    access: 'ACCESS',
    register: 'REGISTER',
    recover: 'RECOVER',
  },
  tokenExpiration: {
    refresh_days_expiration: 7,
    access_hours_expiration: 1,
    register_months_expiration: 6,
    recover_hours_expiration: 1,
  },
  resultsNumberPerPage: 7,
};

export default consts;
