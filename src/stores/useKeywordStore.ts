import { create } from 'zustand';

import LocalService from '@/services/LocalService';

import { SearchItem } from '@/types/Search';

interface KeywordStoreType {
  keyword: string;
  keyItems: SearchItem[];
  actions: {
    setKeyword: (keyword: string) => void;
    fetchKeyItems: (keyword: string) => Promise<void>;
  };
}

const useKeywordStore = create<KeywordStoreType>((set) => ({
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

      const { documents } = await LocalService.getRegionByKeyword({
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

export const useKeyword = () => useKeywordStore((state) => state.keyword);

export const useKeyItems = () => useKeywordStore((state) => state.keyItems);

export const useKeywordActions = () =>
  useKeywordStore((state) => state.actions);
