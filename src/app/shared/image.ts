export interface UploadedImage {
    userId: string;
    uploadedImage: File;
    characterName: string;
    group: string;
}

export interface CharacterImage {
    characterName: string;
    group: string;
    url: string;
}

export interface CharacterGroup {
    characters: CharacterImage[];
}

export interface CharacterStyle {
    groups: CharacterGroup[];
}
