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
    accuracy: number;
    date: Date;
    loss: number;
    version: string;
}

