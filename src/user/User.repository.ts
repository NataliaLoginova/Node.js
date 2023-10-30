import {UserModel} from "./User.model";
import {IExtendedUser, IUser, IUserDTO} from "./types";

export const makeUserDTO = ({email, id, role}: IUserDTO) => ({
    email, id, role
})
export const createUser = async (userData: IUser): Promise<IExtendedUser | null> => {
    try {
        const candidate = await UserModel.findOne({email: userData.email});
        if (candidate){
            return null;
        }
        const user = new UserModel(userData);

        return await user.save();
    } catch (err) {
        throw new Error(`cannot register user with email:${userData.email}`)
    }
}
