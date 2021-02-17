export class Fichier {
    idFichier: number;
    nomFichier: string;
    fichier: Blob;
}

export const createFichier = <T extends Partial<Fichier>>(initialValues: T): Fichier & T => {
    return Object.assign(emptyFichier(), initialValues);
};

export const emptyFichier = (): Fichier => ({
    idFichier: null,
    nomFichier: '',
    fichier: null
});
