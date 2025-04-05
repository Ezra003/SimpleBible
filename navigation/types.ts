import { Book, Chapter } from "../types";

export type RootStackParamList = {
  Home: undefined;
  Chapter: { book: Book };
  Verses: { book: Book; chapter: Chapter; chapterNumber: number };
};