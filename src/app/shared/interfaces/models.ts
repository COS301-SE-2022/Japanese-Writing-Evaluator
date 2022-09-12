export interface ModelsArray{
    hiragana: {
        characterRecognition: Models[];
        strokes: Models[];
    };

    katakana: {
        characterRecognition: Models[];
        strokes: Models[];
    };

    kanji: {
        characterRecognition: Models[];
        strokes: Models[];
    };

}

export interface Models {
    version: string;
    date: Date;
    accuracy: number;
    loss: number;
}

