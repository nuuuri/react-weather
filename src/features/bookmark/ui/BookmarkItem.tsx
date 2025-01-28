import { ReactNode } from 'react';

import { Bookmark } from '../model/types';

interface BookmarkItemProps {
  data: Bookmark;
  onClick: (bookmark: Bookmark) => void;
  children?: ReactNode;
}

export default function BookmarkItem({
  data,
  onClick,
  children,
}: BookmarkItemProps) {
  return (
    <div
      key={data.name}
      className="p-2 border rounded-md cursor-pointer"
      onClick={() => onClick(data)}>
      {children}
      {data?.name}
    </div>
  );
}
