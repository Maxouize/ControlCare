export class Service {
    idService: number;
    libelleService: string;
}

export const createService = <T extends Partial<Service>>(initialValues: T): Service & T => {
    return Object.assign(emptyService(), initialValues);
};

export const emptyService = (): Service => ({
    idService: null,
    libelleService: ''
});
