import { useEffect, useState } from 'react';
import { MdMenu } from 'react-icons/md';

import BookmarkButton from '@/components/BookmarkButton';
import Sidebar from '@/components/Sidebar';

import { useOutsideClick } from '@/utils/useOutsideClick';

import { Forecast } from '@/features/forecast';
import { useBookmarkActions, useBookmarks } from '@/stores/useBookmarkStore';
import {
  useCurrentRegion,
  useRegionActions,
  useSearchedRegion,
} from '@/stores/useRegionStore';

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentRegion = useCurrentRegion();
  const searchedRegion = useSearchedRegion();
  const { setRegion } = useRegionActions();

  const region = searchedRegion.name ? searchedRegion : currentRegion;

  const bookmarks = useBookmarks();
  const { fetchBookmarks, addBookmark, removeBookmark } = useBookmarkActions();

  const menuRef = useOutsideClick(() => {
    if (isSidebarOpen && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setRegion(longitude, latitude).catch(() => {});
    });
  }, [setRegion]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <div className="flex justify-center w-screen h-screen overflow-hidden">
      {isSidebarOpen && (
        <Sidebar ref={menuRef} onClose={() => setIsSidebarOpen(false)} />
      )}
      <div
        className={`relative flex flex-col justify-center items-center w-4/5 gap-20 p-10 ${isSidebarOpen ? 'w-4/5' : 'w-full'}`}>
        <div className="absolute flex items-center gap-4 top-5 left-5">
          <MdMenu
            className="w-8 h-8 cursor-pointer"
            onClick={() => setIsSidebarOpen((state) => !state)}
          />
          {region !== currentRegion && (
            <BookmarkButton
              isChecked={
                !!bookmarks.find((bookmark) => bookmark.name === region.name)
              }
              onSelect={() => addBookmark(region)}
              onUnselect={() => removeBookmark(region.name)}
            />
          )}
        </div>
        <Forecast region={region} />
      </div>
    </div>
  );
}
