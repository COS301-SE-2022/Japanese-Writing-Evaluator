/* eslint-disable @typescript-eslint/naming-convention */
export interface Progress {
    response: UserProgress[];
}

export interface UserProgress { // interface for response from backend
    character: string;
    score: number;
    upload_Date: string;
    url: string;
    writing_Style: string;
}
