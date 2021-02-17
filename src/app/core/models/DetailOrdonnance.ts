import { emptyOrdonnance, Ordonnance } from './Ordonnance';

export class DetailOrdonnance {
    idDetailOrdonnance: number;
    qteDetailOrdonnance: number;
    ordonnance: Ordonnance;
}

export const createDetailOrdonnance = <T extends Partial<DetailOrdonnance>>(initialValues: T): DetailOrdonnance & T => {
    return Object.assign(emptyDetailOrdonnance(), initialValues);
};

export const emptyDetailOrdonnance = (): DetailOrdonnance => ({
    idDetailOrdonnance: null,
    qteDetailOrdonnance: null,
    ordonnance: emptyOrdonnance()
});
