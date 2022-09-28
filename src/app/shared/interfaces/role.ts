export interface Role {
    id: string;
}

export interface UserRoles {
    response: Person[];
}

export interface Person {
    id: string;
    username: string;
    admin: boolean;
}
