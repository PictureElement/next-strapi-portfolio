import Banner from "@/components/Banner";
import PostList from "@/components/PostList";
import { fetchBlogPage, fetchAllPosts, fetchLayout } from "@/lib/api";

export async function generateMetadata(_, parent) {
  let page;

  try {
    page = await fetchBlogPage();
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
  const url = new URL('/blog/', process.env.NEXT_PUBLIC_WEBSITE).href;
  const imageUrl = image ? new URL(image.url, process.env.NEXT_PUBLIC_STRAPI).href : p.openGraph.images[0];

  return {
    title: title ? title : `Blog | ${p.openGraph.siteName}`,
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
  const [page, posts, global] = await Promise.allSettled([fetchBlogPage(), fetchAllPosts(), fetchLayout()]);

  if (page.status === 'rejected') {
    return (
      <div className="mx-auto max-w-5xl p-4">
        <div className="text-red-600 text-center">Error: We encountered an issue while loading the &quot;Blog&quot; page.</div>
      </div>
    );
  }

  // Destructure the necessary properties
  const { metadata, banner } = page.value;
  const { title, description } = metadata;
  const { headline, supportiveText } = banner;

  let localeString = 'en-US';
  let jsonLd = null;

  if (global.status === 'fulfilled') {
    // Destructure the necessary properties
    const { siteRepresentation, miscellaneous } = global.value;
    const { siteImage, logo, knowsAbout, isOrganization, siteName, siteDescription, jobTitle, email, telephone, schedulingLink, socialChannels, addressLocality, areaServed } = siteRepresentation;
    const siteImageUrl = new URL(siteImage.url, process.env.NEXT_PUBLIC_STRAPI).href;
    const logoUrl = new URL(logo.url, process.env.NEXT_PUBLIC_STRAPI).href;
    const extractedSkills = knowsAbout.flatMap(category =>
      category.children.map(skill => skill.name)
    );
    const { htmlLanguageTag } = miscellaneous;
    localeString = miscellaneous.localeString

    // Construct the JSON-LD
    jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": new URL('/blog/', process.env.NEXT_PUBLIC_WEBSITE).href,
          name: title ? title : `Blog | ${siteName}`,
          description: description ? description : siteDescription,
          url: new URL('/blog/', process.env.NEXT_PUBLIC_WEBSITE).href,
          inLanguage: htmlLanguageTag,
          isPartOf: {
            "@id": new URL('/#website', process.env.NEXT_PUBLIC_WEBSITE).href,
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
            url: new URL('/contact/', process.env.NEXT_PUBLIC_WEBSITE).href,
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
    };
  }

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Banner headline={headline} supportiveText={supportiveText} />
      <section className="mx-auto max-w-5xl px-4 py-24">
        {posts.status === 'rejected' ? (
          <div className="text-red-600 text-center">Error: We encountered an issue while loading the blog posts.</div>
        ) : (
          posts.value.length > 0 ? (
            <PostList postList={posts.value} localeString={localeString} />
          ) : (
            <p className="text-center text-gray-500">
              No posts available at the moment. Please check back later!
            </p>
          )
        )}
      </section>
    </>
  );
}