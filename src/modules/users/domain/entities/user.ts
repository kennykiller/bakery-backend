import { UserRole } from "../value-objects/user-role";

export class User {
    constructor(
        public readonly id: string,
        public email: string,
        public passwordHash: string,
        public role: UserRole,
        public isActive: boolean,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

    deactivate() {
        this.isActive = false;
    }
}