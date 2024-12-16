import Link from "next/link";
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

export default function BackTo({
  label = 'Default label',
  url = '#',
  ...rest
}) {
  return (
    <div className="px-4 py-10">
      <Link
        href={url}
        {...rest}
        className="
              group
              flex
              font-semibold
              leading-none
            text-primary-700
            "
      >
        <ArrowLeftIcon className="relative size-4 me-1 group-hover:-translate-x-0.5 transition" />
        <span className="relative">
          {label}
        </span>
      </Link>
    </div>
  )
}
