// filepath: e:\RESOURCES\RESOURCES (FILES)\websites-learning\react_native_apps_2025\SimpleBible\context\BookmarkContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { Verse } from '../types/BibleTypes';

interface BookmarkContextType {
    bookmarks: Verse[];
    addBookmark: (verse: Verse) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [bookmarks, setBookmarks] = useState<Verse[]>([]);

    const addBookmark = (verse: Verse) => {
        setBookmarks(prev => [...prev, verse]);
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) throw new Error('useBookmarks must be used within a BookmarkProvider');
    return context;
};