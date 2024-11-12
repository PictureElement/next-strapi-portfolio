import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/16/solid';
import PropTypes from 'prop-types';

export default function BtnToggle({
  isOpen,
  onToggle,
  openLabel = 'Hide description',
  closedLabel = 'Show description',
  className = '',
  ...rest
}) {
  return (
    <button
      onClick={onToggle}
      className={`
        inline-flex
        justify-center
        items-center
        transition
        px-4
        h-11
        font-semibold
        leading-none
        rounded-full
        border border-primary-100
        text-primary-700
        bg-primary-50
        hover:bg-primary-100
        active:bg-primary-200
        focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
        ${className}
      `}
      aria-expanded={isOpen}
      {...rest}
    >
      <span className="flex items-center">
        {isOpen ? openLabel : closedLabel}
        {isOpen ? (
          <ArrowUpIcon className="size-4 ms-1" />
        ) : (
          <ArrowDownIcon className="size-4 ms-1" />
        )}
      </span>
    </button >
  );
}