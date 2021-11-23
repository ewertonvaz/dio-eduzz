import { getCustomRepository } from 'typeorm';
import { User } from '../entity/User';
import {UserRepository} from "../repositories/UserRepository"
import { checkTokenIsValid } from '../validators/validateToken';
import { Token } from '../helpers';

class UserService {

    constructor(private readonly userRepository: UserRepository){}

    public async getProfile (id: number): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        return user;
    }

    public async createUser (data: any): Promise<User> {
        const user: User = await this.userRepository.createUser(data);
        return user;
    }

    public async updatePassword (password: string, token: string): Promise<User> {
        const tokenDecoded = await checkTokenIsValid(token);
        const user: User = await this.userRepository.updatePassword(tokenDecoded.id, password);
        return user;
    }

    public async confirmEmail (user_token : string): Promise<boolean> {
        const decodedEmail = Token.validate(user_token);
        const user = await this.userRepository.getUserByEmail(decodedEmail);
        if (!!user && user.user_token === user_token) {
            user.email_validated = true;
            user.save();
            return true;
        }
        return false;
    }

}

export default new UserService(getCustomRepository(UserRepository));
