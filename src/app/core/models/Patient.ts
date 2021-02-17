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

export const getPatientList: Patient[] = [
    {
        idPatient: 1, nomPatient: 'Dewez', prenomPatient: 'Maxime', sexe: 'M',
        telephonePatient: '06.99.99.99.99', adressePatient: '', dateNaissancePatient: new Date('1994-12-17'),
        codeAssurance: 'assurance 1', nomPersPrevenir: '', telPersPrevenir: ''
    },
    {
        idPatient: 2, nomPatient: 'Frou', prenomPatient: 'Michelle', sexe: 'F',
        telephonePatient: '06.88.88.88.88', adressePatient: '', dateNaissancePatient: new Date('1912-02-21'),
        codeAssurance: 'assurance 2', nomPersPrevenir: '', telPersPrevenir: ''
    }
];
