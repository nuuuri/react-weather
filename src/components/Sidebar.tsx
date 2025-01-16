import { RefObject, useEffect } from 'react';

import { useDebounce } from '@/utils/useDebounce';

import BookmarkItem from './BookmarkItem';
import BookmarkList from './BookmarkList';
import Input from './Input';
import SearchList from './SearchList';

import { useBookmarks } from '@/stores/useBookmarkStore';
import {
  useKeyItems,
  useKeyword,
  useKeywordActions,
} from '@/stores/useKeywordStore';
import { useCurrentRegion, useRegionActions } from '@/stores/useRegionStore';

interface SidebarProps {
  ref?: RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export default function Sidebar({ ref, onClose }: SidebarProps) {
  const currentRegion = useCurrentRegion();
  const { setRegion, removeSearchedRegion } = useRegionActions();

  const bookmarks = useBookmarks();

  const keyword = useKeyword();
  const keyItems = useKeyItems();
  const { setKeyword, fetchKeyItems } = useKeywordActions();

  const debouncedKeyword = useDebounce(keyword, 200);

  useEffect(() => {
    fetchKeyItems(debouncedKeyword).catch(() => {});
  }, [debouncedKeyword, fetchKeyItems]);

  return (
    <div
      ref={ref}
      className="absolute left-0 z-10 h-full px-5 py-10 md:relative md:w-1/5 bg-slate-300">
      <div className="relative flex gap-1 mb-5">
        <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        {keyItems.length > 0 && (
          <SearchList
            data={keyItems}
            onClickItem={(item) => {
              setRegion(item.lon, item.lat, 'searched').catch(() => {});
              setKeyword('');
            }}
          />
        )}
      </div>
      {currentRegion && (
        <BookmarkItem
          data={{
            ...currentRegion,
          }}
          onClick={removeSearchedRegion}>
          <p className="text-sm font-bold">현재 위치</p>
        </BookmarkItem>
      )}
      <BookmarkList
        data={bookmarks}
        onClickItem={(bookmark) => {
          setRegion(bookmark.longitude, bookmark.latitude, 'searched').catch(
            () => {}
          );

          if (window.innerWidth < 768) {
            onClose();
          }
        }}
      />
    </div>
  );
}
