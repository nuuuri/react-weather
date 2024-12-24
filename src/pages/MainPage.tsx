import { useEffect } from 'react';

import BookmarkItem from '@/components/BookmarkItem';
import BookmarkList from '@/components/BookmarkList';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyWeather from '@/components/HourlyWeather';
import SearchList from '@/components/SearchList';

import { useDebounce } from '@/utils/useDebounce';

import { useBookmarkActions, useBookmarks } from '@/stores/useBookmarkStore';
import {
  useKeyItems,
  useKeyword,
  useKeywordActions,
} from '@/stores/useKeywordStore';
import {
  useCurrentRegion,
  useRegionActions,
  useSearchedRegion,
} from '@/stores/useRegionStore';

export default function MainPage() {
  const currentRegion = useCurrentRegion();
  const searchedRegion = useSearchedRegion();
  const { setRegion, removeSearchedRegion } = useRegionActions();

  const bookmarks = useBookmarks();
  const { fetchBookmarks, addBookmark, removeBookmark } = useBookmarkActions();

  const keyword = useKeyword();
  const keyItems = useKeyItems();
  const { setKeyword, fetchKeyItems } = useKeywordActions();

  const debouncedKeyword = useDebounce(keyword, 200);

  useEffect(() => {
    fetchKeyItems(debouncedKeyword).catch(() => {});
  }, [debouncedKeyword, fetchKeyItems]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;

      setRegion(longitude, latitude).catch(() => {});
    });
  }, [setRegion]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const region = searchedRegion ?? currentRegion;

  if (!region) return <div>loading...</div>;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <div className="w-1/5 h-full px-5 py-10 bg-slate-300">
        <div className="relative flex gap-1 mb-5">
          <input
            className="w-full"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
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
            setRegion(bookmark.lon, bookmark.lat, 'searched').catch(() => {});
          }}
        />
      </div>
      <div className="flex flex-col justify-center w-4/5 gap-20 p-10">
        {bookmarks.find((bookmark) => bookmark.name === region.name) ? (
          <button onClick={() => removeBookmark(region.name)}>
            즐겨찾기 해제
          </button>
        ) : (
          <button onClick={() => addBookmark(region)}>즐겨찾기</button>
        )}

        <CurrentWeather data={region} />
        <div className="flex w-full gap-5 p-5 overflow-x-auto">
          {region.forecast?.map((weather, idx) => (
            <HourlyWeather key={idx} data={weather} />
          ))}
        </div>
      </div>
    </div>
  );
}
