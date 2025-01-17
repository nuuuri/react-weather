import { FaRegStar, FaStar } from 'react-icons/fa6';

interface BookmarkButtonProps {
  className?: string;
  isChecked: boolean;
  onSelect: () => void;
  onUnselect: () => void;
}

export default function BookmarkButton({
  className,
  isChecked,
  onSelect,
  onUnselect,
}: BookmarkButtonProps) {
  return (
    <div
      className={`p-1 rounded-full cursor-pointer [&_svg]:w-6 [&_svg]:h-6 ${className}`}>
      {isChecked ? (
        <FaStar onClick={onUnselect} />
      ) : (
        <FaRegStar onClick={onSelect} />
      )}
    </div>
  );
}
