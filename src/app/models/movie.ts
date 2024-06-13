export class Movie {
    id:number;
    name: string;
    description: string;
    imgPath: string;
    duration: number;
    genre: string[];
    language: string;
    mpaaRating: MppaRating;
    userRating: string;

    constructor (id:number, name:string, description:string, imgPath: string, duration: number, genre: string[], language: string, mpaaRating: MppaRating, userRating: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgPath = imgPath;
        this.duration = duration;
        this.genre = genre;
        this.language = language;
        this.mpaaRating = mpaaRating;
        this.userRating = userRating;
    }
}

export class MppaRating {
    type: string;
    label: string;
}