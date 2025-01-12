import { create } from 'zustand';

import LocalService from '@/services/LocalService';

import { Region } from '@/features/region/model/types';
import { convertLonLatToXY } from '@/features/region/utils/convertLonLatToXY';

interface RegionStoreType {
  currentRegion: Region;
  searchedRegion: Region;
  actions: {
    setRegion: (
      lon: number,
      lat: number,
      type?: 'current' | 'searched'
    ) => Promise<void>;
    removeSearchedRegion: () => void;
  };
}

const useRegionStore = create<RegionStoreType>((set) => ({
  currentRegion: { name: '', longitude: 0, latitude: 0, x: 0, y: 0 },
  searchedRegion: { name: '', longitude: 0, latitude: 0, x: 0, y: 0 },
  actions: {
    setRegion: async (
      longitude: number,
      latitude: number,
      type = 'current'
    ) => {
      const { x, y } = convertLonLatToXY(longitude, latitude);

      const currentRegionDoc = await LocalService.getRegionInfo({
        longitude,
        latitude,
      }).then((res) =>
        res.data.documents.find(
          (document: { region_type: 'H' | 'B' }) => document.region_type === 'B'
        )
      );

      const region = {
        name: currentRegionDoc.address_name,
        longitude,
        latitude,
        x,
        y,
      };

      if (type === 'current') {
        set({ currentRegion: region });
      } else {
        set({ searchedRegion: region });
      }
    },

    removeSearchedRegion: () => {
      set({ searchedRegion: undefined });
    },
  },
}));

export const useCurrentRegion = () =>
  useRegionStore((state) => state.currentRegion);

export const useSearchedRegion = () =>
  useRegionStore((state) => state.searchedRegion);

export const useRegionActions = () => useRegionStore((state) => state.actions);
