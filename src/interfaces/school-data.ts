export interface Photo {
    image: string;
    legende: string;
}

export interface Article {
    id: number;
    titre: string;
    date: string;
    categorie: string;
    important: boolean;
    classe: number;
    texte: string;
    photos: Photo[];
    isFavorite?: boolean | false;
}

export interface Gallery {
    titre: string;
    date: string;
    classe: number;
    texte: string;
    photos: Photo[];
}

export interface ImportantDate {
    titre: string;
    date: string;
    classe: number;
    texte: string;
}

export interface DateImportante {
    titre: string;
    date: string;
    classe: number;
    texte: string;
}

export interface SchoolData {
    articles: Article[];
    galeries: Gallery[];
    dates: DateImportante[];
}

export interface ErrorResponse {
    erreur: string;
}
