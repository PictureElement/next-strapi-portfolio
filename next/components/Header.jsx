'use client';

import Image from 'next/image';
import BtnPrimary from "./BtnPrimary";
import { Bars3Icon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useState, useCallback } from 'react';

export default function Header({ data, siteRepresentation }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  if (!data || !siteRepresentation) {
    // Return fallback UI in case of validation or fetch errors
    return (
      <div className="backdrop-blur-xl sticky top-0 z-[1000] border-b border-black/15">
        <div className="mx-auto max-w-5xl p-4">
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the "Header" component.</div>
        </div>
      </div>
    );
  }

  // Destructure/Format the necessary properties
  const { additionalNavigationItems, cta } = data;
  const { logo, logomark } = siteRepresentation;
  const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const logomarkUrl = new URL(logomark.url, process.env.NEXT_PUBLIC_STRAPI).href;


  return (
    <header className="backdrop-blur-xl sticky top-0 z-[1000] border-b border-black/15">
      <nav className="flex flex-wrap gap-4 md:gap-6 items-center justify-between p-4">
        {/* Brand */}
        <Link
          href="/"
          className="block text-primary-700"
        >
          <span className="sr-only">Home</span>
          <Image
            priority
            src={logoUrl}
            alt={logo.alternativeText}
            className="hidden md:block"
            width={Math.round((logo?.width ?? 36) / 2)}
            height={Math.round((logo?.height ?? 36) / 2)}
            sizes={`${Math.round((logo?.width ?? 36) / 2)}px`}
          />
          <Image
            priority
            src={logomarkUrl}
            alt={logomark.alternativeText}
            className="md:hidden"
            width={Math.round((logomark?.width ?? 36) / 2)}
            height={Math.round((logomark?.height ?? 36) / 2)}
            sizes={`${Math.round((logomark?.width ?? 36) / 2)}px`}
          />
        </Link>
        {/* CTA & Toggler  */}
        <div className="flex items-center gap-4 md:order-2">
          <BtnPrimary
            className="!h-9 !px-3 text-sm"
            target={cta.openLinkInNewTab ? "_blank" : undefined}
            rel={cta.sameHostLink ? undefined : "noopener noreferrer"}
            label={cta.label}
            url={cta.url}
          />
          <button
            className="
                block
                justify-items-center
                w-9 h-9
                rounded-full
                transition
                border border-primary-100
              text-primary-700
              bg-primary-50
              hover:bg-primary-100
              active:bg-primary-200
                md:hidden
              "
            aria-label="Toggle navigation"
            aria-expanded={isExpanded}
            aria-controls="header-navigation"
            onClick={handleClick}
          >
            <span className="sr-only">Toggle menu</span>
            <Bars3Icon className="size-5" />
          </button>
        </div>
        {/* Navigation */}
        <ul id="header-navigation" className={`header-navigation flex flex-col basis-full grow gap-2 text-sm md:flex-row md:basis-auto md:gap-6 ${isExpanded ? 'show' : ''}`}>
          <li><Link href="/projects/" className="text-gray-900 transition hover:text-gray-900/75">Projects</Link></li>
          <li><Link href="/blog/" className="text-gray-900 transition hover:text-gray-900/75">Blog</Link></li>
          {additionalNavigationItems.length > 0 &&
            additionalNavigationItems.map((item) => (
              <li key={item.id}>
                <Link target={item.openLinkInNewTab ? "_blank" : undefined} rel={item.sameHostLink ? undefined : "noopener noreferrer"} href={item.url} className="text-gray-900 transition hover:text-gray-900/75">
                  {item.label}
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  );
}
