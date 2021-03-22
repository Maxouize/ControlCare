export class Patient {
    idPatient: number;
    nomPatient: string;
    prenomPatient: string;
    sexe: 'M' | 'F';
    telephonePatient: string;
    dateNaissancePatient: Date;
    adressePatient: string;
    codeAssurance: string;
    nomPersPrevenir: string;
    telPersPrevenir: string;
}

export const createPatient = <T extends Partial<Patient>>(initialValues: T): Patient & T => {
    return Object.assign(emptyPatient(), initialValues);
};

export const emptyPatient = (): Patient => ({
    idPatient: null,
    nomPatient: '',
    prenomPatient: '',
    sexe: null,
    telephonePatient: '',
    dateNaissancePatient: null,
    adressePatient: '',
    codeAssurance: '',
    nomPersPrevenir: '',
    telPersPrevenir: ''
});

