export class TypeConsultation {
    idTypeConsult: number;
    nomTypeConsultation: string;
    prixTypeConsultation: number;
}

export const createTypeConsultation = <T extends Partial<TypeConsultation>>(initialValues: T): TypeConsultation & T => {
    return Object.assign(emptyTypeConsultation(), initialValues);
};

export const emptyTypeConsultation = (): TypeConsultation => ({
    idTypeConsult: null,
    nomTypeConsultation: '',
    prixTypeConsultation: null
});
