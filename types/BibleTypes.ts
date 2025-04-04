// filepath: e:\RESOURCES\RESOURCES (FILES)\websites-learning\react_native_apps_2025\SimpleBible\types\BibleTypes.ts
export interface Verse {
    verse: number;
    text: string;
}

export interface Chapter {
    chapter: number;
    verses: Verse[];
}

export interface Book {
    name: string;
    chapters: Chapter[];
}