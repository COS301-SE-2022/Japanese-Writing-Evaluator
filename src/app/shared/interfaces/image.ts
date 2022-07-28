export interface UploadedImage {
    id: string;
    image: string;
    imagechar: string;
    file: string;
    style: string;
}

export interface GuestUploadedImage {
    image: string;
    imagechar: string;
}

export interface CharacterImage {
    characterName: string;
    group: string;
    url: string;
}

