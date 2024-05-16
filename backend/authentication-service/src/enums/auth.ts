export enum Role {
    STUDENT = 0,
    ADMIN = 1,
    LECTURER = 2,
}

export namespace Role {
    export function getPermissions(role: Role): Permission[] {
        switch (role) {
            case Role.STUDENT:
                return [Permission.ENROLL_COURSE];
            case Role.ADMIN:
                return Object.values(Permission);
            case Role.LECTURER:
                return [Permission.UPDATE_COURSE];
            default:
                return [];
        }
    }

    export function getTitle(role: string | Role): string {
        const roleNo: Role = (typeof role === "string") ?  parseInt(role) : role;
        switch (roleNo) {
            case Role.STUDENT:
                return "Student";
            case Role.ADMIN:
                return "Admin";
            case Role.LECTURER:
                return "Lecturer";
            default:
                return "Invalid-Role";
        }
    }
}

export enum Permission {
    CREATE_COURSE = "CREATE_COURSE",
    UPDATE_COURSE = "UPDATE_COURSE",
    DELETE_COURSE = "DELETE_COURSE",
    ENROLL_COURSE = "ENROLL_COURSE",
}

export enum SignedUpAs {
    EMAIL = "EMAIL",
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
}
