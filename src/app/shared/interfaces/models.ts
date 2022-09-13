export interface ModelsArray{
    data: {
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
    };

}

export interface Models {
    accuracy: string;
    date: Date;
    loss: string;
    version: string;
}

