export class User {
    idUtilisateur: number;
    username: string;
    password: string;
}

export const createUser = <T extends Partial<User>>(initialValues: T): User & T => {
    return Object.assign(emptyUser(), initialValues);
};

const emptyUser = (): User => ({
    idUtilisateur: null,
    username: '',
    password: ''
});
