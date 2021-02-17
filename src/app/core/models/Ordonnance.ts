import { Patient, emptyPatient } from './Patient';
export class Ordonnance {
    idOrdonnance: number;
    dateOrdonnance: string;
    patient: Patient
}

export const createOrdonnance = <T extends Partial<Ordonnance>>(initialValues: T): Ordonnance & T => {
    return Object.assign(emptyOrdonnance(), initialValues);
};

export const emptyOrdonnance = (): Ordonnance => ({
    idOrdonnance: null,
    dateOrdonnance: null,
    patient: emptyPatient()
});
