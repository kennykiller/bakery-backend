import { RequiredExcept } from "src/shared/utils/util-types"
import { User } from "../entities/user"

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    save(user: Partial<User>): Promise<User>
    create(createPayload: RequiredExcept<User, 'email' | 'passwordHash'>): Promise<User>
    findById(id: string): Promise<User | null>
}