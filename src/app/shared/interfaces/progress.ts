export interface Progress {
    response: ImageProgress[];
}

interface ImageProgress{
    character: string;
    score: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    upload_date: string;
    url: string;
}
