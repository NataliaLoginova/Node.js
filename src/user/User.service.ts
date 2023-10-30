import {createUser, makeUserDTO} from "./User.repository";
import {IUser, IUserDTO} from "./types";
import {UserModel} from "./User.model";

export const registration = async (userData: IUser): Promise<IUserDTO | null> => {
    const result = await UserModel.findOne({email: userData.email});
    if (result) {
        throw new Error('user is registered')
    }

    const user = await createUser({role: userData.role, password: userData.password, email: userData.email});
    return null;
}

export const login = async ({email}: IUser): Promise<IUserDTO | null> => {
    const user = await UserModel.findOne({email});
    if (!user) {
        return null
    }
    const userDTO = makeUserDTO(user);

    return userDTO;
}
