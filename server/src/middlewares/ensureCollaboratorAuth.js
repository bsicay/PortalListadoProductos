import consts from '../utils/consts.js';
import ensureRolesAuth from './ensureRolesAuth.js';

const ensureCollaboratorAuth = ensureRolesAuth(
  [consts.roles.admin, consts.roles.collaborator],
  'No se cuenta con los privilegios necesarios de colaborador o administrador.',
);

export default ensureCollaboratorAuth;
