export interface Image {
    userId: string;
    uploadedImage: File;
    characterName: string;
    group: string;
}

export interface HomeImage {
    characterName: string;
    group: string;
    url: string;
}