import { Tokens } from "@app/auth/types/tokens.type";
import { UserType } from "@app/auth/types/user.type";

export interface IUserResponse {
  user: {
    user: UserType
    tokens: Tokens
  }
}
