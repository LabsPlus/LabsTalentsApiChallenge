import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt'
import { ErrorsHelpers } from '../helpers/error.helpers';
import {UserDALs} from '../database/repository/user.dals';
import {IUserLogin} from '../interfaces/user.interfaces'

class UserServices{

    private readonly userDals: UserDALs;
    
    constructor(){
        this.userDals = new UserDALs();
    }   

    async authLogin({ email, password }: IUserLogin) {
        const findLoginByEmail = await this.userDals.findUserByEmail(email);
        if (!findLoginByEmail) {
          throw new ErrorsHelpers({
            message: 'Invalid email',
            statusCode: 401,
          });
        }
    
        const passwordMatch = await compare(password, findLoginByEmail.password);
        if (!passwordMatch) {
          throw new ErrorsHelpers({
            message: 'Invalid password',
            statusCode: 401,
          });
        }
    
        let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
        if (!secretKey) {
          throw new ErrorsHelpers({
            message: 'There is no token key',
            statusCode: 401,
          });
        }
    
        let secretKeyRefresh: string | undefined =
          process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
        if (!secretKeyRefresh) {
          throw new ErrorsHelpers({
            message: 'There is no refresh token key',
            statusCode: 401,
          });
        }
    
        const token = sign({ email }, secretKey, {
          subject: findLoginByEmail.id.toString(),
          expiresIn: '60s',
        });
    
        const refreshToken = sign({ email }, secretKeyRefresh, {
          subject: findLoginByEmail.id.toString(),
          expiresIn: '7d',
        });
    
        return {
          token: { token, expiresIn: '60s' },
          refreshToken: { refreshToken, expiresIn: '7d' },
          user: {
            email: findLoginByEmail.email,
          },
        };
      }
    
      async refreshToken(refreshToken: string) {
        if (!refreshToken) {
          throw new ErrorsHelpers({
            message: 'Refresh token missing',
            statusCode: 401,
          });
        }
        let secretKeyRefresh: string | undefined =
          process.env.ACCESS_LOCAL_KEY_TOKEN_REFRESH;
        if (!secretKeyRefresh) {
          throw new ErrorsHelpers({
            message: 'There is no refresh token key',
            statusCode: 401,
          });
        }
    
        let secretKey: string | undefined = process.env.ACCESS_LOCAL_KEY_TOKEN;
        if (!secretKey) {
          throw new ErrorsHelpers({
            message: 'There is no refresh token key',
            statusCode: 401,
          });
        }
    
        const verifyRefreshToken = verify(refreshToken, secretKeyRefresh);
    
        const { sub } = verifyRefreshToken;
    
        const newToken = sign({ sub }, secretKey, {
          expiresIn: '1h',
        });
        const newRefreshToken = sign({ sub }, secretKeyRefresh, {
          expiresIn: '7d',
        });
        return {
          token: { token: newToken, expiresIn: '1h' },
          refreshToken: { refreshToken: newRefreshToken, expiresIn: '7d' },
        };
      }

    
    
}

export {UserServices}