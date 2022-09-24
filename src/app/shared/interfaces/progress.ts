/* eslint-disable @typescript-eslint/naming-convention */
export interface Progress {
    response: UserProgress[];
}

export interface UserProgress { // interface for response from backend
    character: string;
    score: number;
    uploadDate: string;
    url: string;
    writingStyle: string;
}
