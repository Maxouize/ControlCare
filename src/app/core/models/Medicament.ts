import { DetailOrdonnance } from "./DetailOrdonnance";

export class Medicament {
    idMedicament: number;
    detailOrdonnance: DetailOrdonnance;
    libelleMedicament: string;
    dosageMedicament: number;
    dciMedicament: string;
}

export const createMedicament = <T extends Partial<Medicament>>(initialValues: T): Medicament & T => {
    return Object.assign(emptyMedicament(), initialValues);
};

export const emptyMedicament = (): Medicament => ({
    idMedicament: null,
    detailOrdonnance: null,
    libelleMedicament: '',
    dosageMedicament: null,
    dciMedicament: ''
});
