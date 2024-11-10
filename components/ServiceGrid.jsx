'use client';

import ServiceEntry from "./ServiceEntry";
import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/16/solid';

export default function ServiceGrid({ defaultOpen = false }) {

  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleServices = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      <div id="serviceGrid" className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transiton-[max-height] ${isOpen ? 'relative z-10 max-h-full' : 'max-h-[32rem] sm:max-h-[20rem] overflow-hidden'}`}>
        <ServiceEntry
          title="Web application development"
          description="Creating custom, scalable applications using modern technologies like Next.js and Supabase to deliver powerful business solutions."
        />
        <ServiceEntry
          title="Content management systems"
          description="Building high-performance websites with traditional and headless CMS architectures that make content management effortless."
        />
        <ServiceEntry
          title="Performance & Technical SEO"
          description="Enhancing website speed and search engine visibility through technical optimizations, caching, and proven SEO strategies."
        />
        <ServiceEntry
          title="Custom extensions & plugins"
          description="Crafting bespoke platform extensions and integrations that add powerful features to meet your specific business requirements."
        />
        <ServiceEntry
          title="Interactive experiences"
          description="Developing engaging maps and dynamic visualizations that transform static content into immersive user interactions."
        />
        <ServiceEntry
          title="Real estate solutions"
          description="Implementing specialized property websites with advanced search features and CRM integrations to maximize lead generation."
        />
        <ServiceEntry
          title="E-commerce development"
          description="Building secure online stores with seamless checkout flows, inventory management, and comprehensive business tools."
        />
        <ServiceEntry
          title="Site maintenance & support"
          description="Delivering continuous maintenance, security updates, and technical support to ensure your website performs at its best."
        />
      </div>
      <div className={`inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-slate-50 ${isOpen ? 'static pt-12' : 'absolute pt-64'}`}>
        <button
          onClick={toggleServices}
          className="
            inline-flex
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
          "
          aria-expanded={isOpen}
          aria-controls="serviceGrid"
        >
          {isOpen ? (
            <span className="flex items-center">
              Show fewer services
              <ArrowUpIcon className="size-4 ms-1" />
            </span>
          ) : (
            <span className="flex items-center">
              Show all services
              <ArrowDownIcon className="size-4 ms-1" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
