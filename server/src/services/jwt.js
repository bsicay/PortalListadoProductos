import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from 'config';
import consts from '../utils/consts.js';

const key = config.get('jwtKey');

const signRefreshToken = async ({
  id, name, email, role,
}) => jwt.sign(
  {
    id,
    name,
    email,
    role,
    exp: moment().add(consts.tokenExpiration.refresh_days_expiration, 'day').unix(),
    type: consts.token.refresh,
  },
  key,
);

const signAccessToken = ({
  id, name, email, role,
}) => jwt.sign(
  {
    id,
    name,
    email,
    role,
    exp: moment().add(consts.tokenExpiration.access_hours_expiration, 'hour').unix(),
    type: consts.token.access,
  },
  key,
);

const signRegisterToken = ({
  id, name, email,
}) => jwt.sign(
  {
    id,
    name,
    email,
    exp: moment().add(consts.tokenExpiration.register_months_expiration, 'month').unix(),
    type: consts.token.register,
  },
  key,
);

const signRecoverPasswordToken = ({
  id, name, email,
}) => jwt.sign(
  {
    id,
    name,
    email,
    exp: moment().add(consts.tokenExpiration.recover_hours_expiration, 'hour').unix(),
    type: consts.token.recover,
  },
  key,
);

const validateToken = async (token) => jwt.verify(token, key);

export {
  signAccessToken, signRefreshToken, signRegisterToken, validateToken, signRecoverPasswordToken,
};
