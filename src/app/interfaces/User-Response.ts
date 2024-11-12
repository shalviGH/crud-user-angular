export interface UsersResponse {
    data: User[];
}

export interface User {
    id:        number;
    firstname: string;
    lastname:  string;
    age:       number;
    address:   string;
}


export interface UserResponse {
    data:    User[];
}
