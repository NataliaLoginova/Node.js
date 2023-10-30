export interface IUser {
    email: string,
    password: string,
    role: string,
}

export type IUserDTO = Omit<IUser, 'password'> & Pick<IExtendedUser, 'id'>

export interface IExtendedUser extends IUser{
    id?: string
    _id?: string
}
