import { UserEntity } from "@app/auth/user.entity";

export type UserType = Omit<UserEntity, 'hashedRt' | 'hashPassword'>
