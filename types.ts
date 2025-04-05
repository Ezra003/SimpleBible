export interface Book {
    id: string;
    name: string;
    chapters: Chapter[];
  }
  
  export interface Chapter {
    id: string;
    verses: any[]; // Define proper verse type
    description?: string;
  }
