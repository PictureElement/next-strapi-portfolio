"use client";

import { ArrowRightIcon } from '@heroicons/react/16/solid';

export default function PostEntry({ title, excerpt }) {
  return (
    <article class="relative p-4 py-6 group">
      <div class="absolute top-0 bottom-0 left-0 right-0 rounded-lg transition bg-slate-50 group-hover:bg-slate-100 border border-slate-100"></div>
      <h3 class="text-slate-900 font-semibold text-xl mb-2 relative">{title}</h3>
      <p className="line-clamp-2 mb-3 relative">{excerpt}</p>
      <a
        href="#"
        className="
          relative
          group
          flex
          font-semibold
          leading-none
        text-primary-700
          focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-400
        "
      >
        <span class="absolute top-0 bottom-0 left-0 right-0 rounded-lg"></span>
        <span className="relative">
          Read more
          <span class="sr-only">, about {title}</span>
        </span>
        <ArrowRightIcon className="relative size-4 ms-1 group-hover:translate-x-0.5 transition" />
      </a>
    </article>
  );
}
