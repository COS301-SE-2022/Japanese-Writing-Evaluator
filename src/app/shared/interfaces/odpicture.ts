export interface Odpicture {
    image: string;
}

export interface Odresponse {
    response: OdresponseElements[];
}

export interface OdresponseElements{
    characters: string[];
    object: string;
    pronunciation: string;
}
