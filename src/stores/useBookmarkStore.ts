import { create } from 'zustand';

import { Bookmark } from '@/types/Bookmark';
import { Region } from '@/types/Region';

interface BookmarkStoreType {
  bookmarks: Bookmark[];
  actions: {
    fetchBookmarks: () => void;
    addBookmark: (region: Region) => void;
    removeBookmark: (name: string) => void;
  };
}
const useBookmarkStore = create<BookmarkStoreType>((set, get) => ({
  bookmarks: [],
  actions: {
    fetchBookmarks: () => {
      const bookmarks = localStorage.getItem('bookmarks');

      if (bookmarks) {
        set({ bookmarks: JSON.parse(bookmarks) });
      }
    },

    addBookmark: (region: Region) => {
      const { bookmarks } = get();

      const bookmarkData = {
        name: region.name,
        lon: region.lon,
        lat: region.lat,
      };

      set({
        bookmarks: [...bookmarks, bookmarkData],
      });

      localStorage.setItem(
        'bookmarks',
        JSON.stringify([...bookmarks, bookmarkData])
      );
    },

    removeBookmark: (name: string) => {
      const { bookmarks } = get();

      const filtered = bookmarks.filter((bookmark) => bookmark.name !== name);

      set({
        bookmarks: filtered,
      });

      localStorage.setItem('bookmarks', JSON.stringify(filtered));
    },
  },
}));

export const useBookmarks = () => useBookmarkStore((state) => state.bookmarks);

export const useBookmarkActions = () =>
  useBookmarkStore((state) => state.actions);
