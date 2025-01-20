import { Bookmark } from '../model/types';

import BookmarkItem from './BookmarkItem';

interface BookmarkListProps {
  data: Bookmark[];
  onClickItem: (bookmark: Bookmark) => void;
}

export default function BookmarkList({ data, onClickItem }: BookmarkListProps) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <p className="mt-2 text-lg font-bold">즐겨찾기 목록</p>
      {data.length === 0 ? (
        <p className="text-sm text-center text-gray-600">
          즐겨찾는 항목이 없습니다.
        </p>
      ) : (
        data.map((bookmark) => (
          <BookmarkItem
            key={bookmark.name}
            data={bookmark}
            onClick={() => onClickItem(bookmark)}
          />
        ))
      )}
    </div>
  );
}
