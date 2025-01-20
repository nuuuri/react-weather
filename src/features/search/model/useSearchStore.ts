import { create } from 'zustand';

import SearchAPI from '../api/SearchAPI';

import { SearchItem } from './types';

interface SearchStoreType {
  keyword: string;
  keyItems: SearchItem[];
  actions: {
    setKeyword: (keyword: string) => void;
    fetchKeyItems: (keyword: string) => Promise<void>;
  };
}

const useSearchStore = create<SearchStoreType>((set) => ({
  keyword: '',
  keyItems: [],

  actions: {
    setKeyword: (keyword: string) => {
      set({ keyword });
    },

    fetchKeyItems: async (keyword: string) => {
      if (keyword === '') {
        set({ keyItems: [] });
        return;
      }

      const { documents } = await SearchAPI.getRegionByKeyword({
        query: keyword,
      }).then((res) => res.data);

      const items = documents.map((doc: any) => ({
        addressName: doc.address_name,
        lon: doc.x,
        lat: doc.y,
      }));

      set({ keyItems: items });
    },
  },
}));

export const useKeyword = () => useSearchStore((state) => state.keyword);

export const useKeyItems = () => useSearchStore((state) => state.keyItems);

export const useKeywordActions = () => useSearchStore((state) => state.actions);
