import { Fichier, emptyFichier } from './Fichier';
import { TypeConsultation, emptyTypeConsultation } from './TypeConsultation';
import { emptyPatient, Patient } from './Patient';

export class Consultation {
    idConsultation: number;
    dateConsultation: Date;
    motifConsultation: string;
    noteConsultation: string;
    typeConsultation: TypeConsultation;
    fichierConsultation: Fichier;
    patient: Patient;
}

export const createConsultation = <T extends Partial<Consultation>>(initialValues: T): Consultation & T => {
    return Object.assign(emptyConsultation(), initialValues);
};

export const emptyConsultation = (): Consultation => ({
    idConsultation: null,
    dateConsultation: null,
    motifConsultation: '',
    noteConsultation: '',
    typeConsultation: emptyTypeConsultation(),
    fichierConsultation: emptyFichier(),
    patient: emptyPatient()
});
