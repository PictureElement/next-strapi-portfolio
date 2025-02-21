import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestPosts from "@/components/LatestPosts";
import { fetchHomePage, fetchFeaturedProjects, fetchLatestPosts, fetchLayout } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let page;

  try {
    page = await fetchHomePage();
  } catch (error) {
    console.error(error.message);
    // Return fallback metadata in case of validation or fetch errors
    return {}
  }

  // Access data from parent segment (i.e. layout)
  const p = await parent;

  // Destructure/Format the necessary properties
  const { metadata } = page;
  const { title, description, image } = metadata;
  const url = new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = image ? new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Home | ${p.openGraph.siteName}`,
    description: description ? description : p.description,
    openGraph: {
      ...p.openGraph,
      images: [imageUrl],
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    }
  }
}

export default async function Page() {
  let page, projects, posts, global = null;

  try {
    [page, projects, posts, global] = await Promise.all([fetchHomePage(), fetchFeaturedProjects(), fetchLatestPosts(), fetchLayout()]);
  } catch (error) {
    console.error(error.message);
    // Return fallback UI in case of validation or fetch errors
    return (
      <div>
        <div className="text-red-600 text-center">Unable to load data for the Home page</div>
      </div>
    );
  }

  // Destructure/Format the necessary properties
  const { metadata, hero, about, featuredProjects, skills, testimonials, faq, latestPosts, useCaseSpecificContent } = page;
  const dynamicData = useCaseSpecificContent[0];
  const showServices = dynamicData?.__component === 'sections.services';
  const { title, description } = metadata;
  const { siteRepresentation, miscellaneous } = global;
  const { siteImage, logo, knowsAbout, isOrganization, siteName, siteDescription, jobTitle, email, telephone, schedulingLink, socialChannels, addressLocality, areaServed } = siteRepresentation;
  const siteImageUrl = new URL(siteImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
  const extractedSkills = knowsAbout.flatMap(category =>
    category.children.map(skill => skill.name)
  );
  const { htmlLanguageTag, localeString } = miscellaneous;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: title ? title : `Home | ${siteName}`,
        description: description ? description : siteDescription,
        url: new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
        inLanguage: htmlLanguageTag,
        isPartOf: {
          "@id": new URL('/#website', process.env.NEXT_PUBLIC_WEBSITE).href,
        },
        about: {
          "@id": isOrganization ? new URL('/#organization', process.env.NEXT_PUBLIC_WEBSITE).href : new URL('/#person', process.env.NEXT_PUBLIC_WEBSITE).href,
        },
      },
      {
        "@type": "WebSite",
        "@id": new URL('/#website', process.env.NEXT_PUBLIC_WEBSITE).href,
        url: new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: siteName,
        description: siteDescription,
        inLanguage: htmlLanguageTag,
        publisher: {
          "@id": isOrganization ? new URL('/#organization', process.env.NEXT_PUBLIC_WEBSITE).href : new URL('/#person', process.env.NEXT_PUBLIC_WEBSITE).href,
        },
      },
      {
        "@type": isOrganization ? "Organization" : "Person",
        "@id": isOrganization ? new URL('/#organization', process.env.NEXT_PUBLIC_WEBSITE).href : new URL('/#person', process.env.NEXT_PUBLIC_WEBSITE).href,
        name: siteName,
        description: siteDescription,
        url: new URL('/', process.env.NEXT_PUBLIC_WEBSITE).href,
        contactPoint: {
          "@type": "ContactPoint",
          email: email,
          ...(telephone && { telephone: telephone })
        },
        ...(isOrganization && { logo: logoUrl }),
        image: siteImageUrl,
        ...(!isOrganization && { jobTitle: jobTitle }),
        ...(schedulingLink || socialChannels.length > 0 ? {
          sameAs: [
            ...(schedulingLink ? [schedulingLink] : []),
            ...socialChannels.map((item) => item.url)
          ]
        } : {}),
        knowsAbout: extractedSkills,
        address: {
          "@type": "PostalAddress",
          addressLocality: addressLocality,
        },
        ...(isOrganization && areaServed && { areaServed: areaServed }),
      }
    ]
  }

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="-mt-[77px]">
        <Hero data={hero} />
        <About data={about} />
        <Skills data={skills} skills={knowsAbout} />
        {showServices ? <Services data={dynamicData} /> : <Experience data={dynamicData} />}
        <FeaturedProjects data={featuredProjects} projects={projects} />
        <Testimonials data={testimonials} />
        <LatestPosts data={latestPosts} posts={posts} localeString={localeString} />
        <Faq data={faq} />
      </div>
    </>
  );
}
