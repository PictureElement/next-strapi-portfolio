import {
  announcementSchema,
  headerSchema,
  heroSchema,
  aboutSchema,
  servicesSchema,
  featuredProjects1Schema,
  featuredProjects2Schema,
  skillsSchema,
  experienceSchema,
  testimonialsSchema,
  faqSchema,
  latestPosts1Schema,
  latestPosts2Schema,
  ctaSchema,
  footerSchema,
  homeSchema,
  projects1Schema,
  projects2Schema,
  blog1Schema,
  blog2Schema,
  contact1Schema,
  contact2Schema,
  privacySchema,
  notFoundSchema,
  project1Schema,
  project2Schema,
  post1Schema,
  post2Schema,
} from "./schemas";

async function fetchData(endpoint, options = {}) {
  const url = new URL(endpoint, process.env.STRAPI);

  const cacheStrategy = process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store';

  try {
    const res = await fetch(url.toString(), { cache: cacheStrategy, ...options });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

//
// Components
//

export const fetchAnnouncement = async () => {
  const endpoint = '/api/global?populate[announcement][populate]=*';
  const response = await fetchData(endpoint);

  const result = announcementSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.announcement;
};

export const fetchHeader = async () => {
  const endpoint = '/api/global?populate[header][populate]=*';
  const response = await fetchData(endpoint);

  const result = headerSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    logo: result.data.data.header.logo,
    navItems: result.data.data.header.navItems,
    cta: result.data.data.header.cta,
    logomark: result.data.data.header.logomark,
  }
};

export const fetchHero = async () => {
  const endpoint = '/api/homepage?populate[hero][populate]=*';
  const response = await fetchData(endpoint);

  const result = heroSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.hero;
};

export const fetchAbout = async () => {
  const endpoint = '/api/homepage?populate[about][populate]=*';
  const response = await fetchData(endpoint);

  const result = aboutSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.about;
};

export const fetchServices = async () => {
  const endpoint = '/api/homepage?populate[services][populate]=*';
  const response = await fetchData(endpoint);

  const result = servicesSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.services;
};

export const fetchFeaturedProjects = async () => {
  // Get all featured projects
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&filters[isFeatured][$eq]=true";
  // Get the headline and supportive text
  const endpoint2 = "/api/homepage?populate[featuredProjects][populate]=*";

  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const result1 = featuredProjects1Schema.safeParse(response1);
  const result2 = featuredProjects2Schema.safeParse(response2);

  if (!result1.success) {
    console.error(`Validation failed for ${endpoint1}:`, result1.error);
    throw new Error(`Invalid data received from ${endpoint1}`);
  }

  if (!result2.success) {
    console.error(`Validation failed for ${endpoint2}:`, result2.error);
    throw new Error(`Invalid data received from ${endpoint2}`);
  }

  return {
    headline: result2.data.data.featuredProjects.headline,
    supportiveText: result2.data.data.featuredProjects.supportiveText,
    featuredProjects: result1.data.data,
  }
};

export const fetchSkills = async () => {
  const endpoint = '/api/homepage?populate[skills][populate]=*';
  const response = await fetchData(endpoint);

  const result = skillsSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.skills;
};

export const fetchExperience = async () => {
  const endpoint = '/api/homepage?populate[experience][populate][0]=experienceList.companyLogo';
  const response = await fetchData(endpoint);

  const result = experienceSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.experience;
};

export const fetchTestimonials = async () => {
  const endpoint = '/api/homepage?populate[testimonials][populate]=*';
  const response = await fetchData(endpoint);

  const result = testimonialsSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.testimonials;
};

export const fetchFaq = async () => {
  const endpoint = '/api/homepage?populate[faq][populate]=*';
  const response = await fetchData(endpoint);

  const result = faqSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.faq;
};

export const fetchLatestPosts = async () => {
  // Get the latest three posts
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[start]=0&pagination[limit]=3";
  // Get the headline and supportive text
  const endpoint2 = "/api/homepage?populate[latestPosts][populate]=*";

  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const result1 = latestPosts1Schema.safeParse(response1);
  const result2 = latestPosts2Schema.safeParse(response2);

  if (!result1.success) {
    console.error(`Validation failed for ${endpoint1}:`, result1.error);
    throw new Error(`Invalid data received from ${endpoint1}`);
  }

  if (!result2.success) {
    console.error(`Validation failed for ${endpoint2}:`, result2.error);
    throw new Error(`Invalid data received from ${endpoint2}`);
  }

  return {
    headline: result2.data.data.latestPosts.headline,
    supportiveText: result2.data.data.latestPosts.supportiveText,
    latestPosts: result1.data.data,
  }
};

export const fetchCta = async () => {
  const endpoint = '/api/global?populate[cta][populate]=*';
  const response = await fetchData(endpoint);

  const result = ctaSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return result.data.data.cta;
};

export const fetchFooter = async () => {
  const endpoint = '/api/global?populate[footer][populate]=*&populate[contactInformation][populate]=*';
  const response = await fetchData(endpoint);

  const result = footerSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    statement: result.data.data.footer.statement,
    headingColumn1: result.data.data.footer.headingColumn1,
    headingColumn2: result.data.data.footer.headingColumn2,
    headingColumn3: result.data.data.footer.headingColumn3,
    copyright: result.data.data.footer.copyright,
    socialChannels: result.data.data.footer.socialChannels,
    linksColumn2: result.data.data.footer.linksColumn2,
    linksColumn3: result.data.data.footer.linksColumn3,
    email: result.data.data.contactInformation.email,
    schedulingLink: result.data.data.contactInformation.schedulingLink,
    workingHours: result.data.data.contactInformation.workingHours,
    phone: result.data.data.contactInformation.phone,
  }
};

//
// Pages
//

export const fetchHome = async () => {
  const endpoint = '/api/homepage?populate[metadata][populate]=*';
  const response = await fetchData(endpoint);

  const result = homeSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    title: result.data.data.metadata.title,
    description: result.data.data.metadata.description,
    openGraphImage: result.data.data.metadata.openGraphImage,
  }
};

export const fetchProjects = async () => {
  // Get the latest projects
  const endpoint1 = "/api/projects?fields[0]=title&fields[1]=slug&fields[2]=excerpt&populate[featuredImage][fields][0]=url&populate[featuredImage][fields][1]=alternativeText&populate[featuredImage][fields][2]=width&populate[featuredImage][fields][3]=height&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=100";
  // Get the banner and metadata
  const endpoint2 = "/api/projects-page?populate[banner]=*&populate[metadata][populate]=openGraphImage";

  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const result1 = projects1Schema.safeParse(response1);
  const result2 = projects2Schema.safeParse(response2);

  if (!result1.success) {
    console.error(`Validation failed for ${endpoint1}:`, result1.error);
    throw new Error(`Invalid data received from ${endpoint1}`);
  }

  if (!result2.success) {
    console.error(`Validation failed for ${endpoint2}:`, result2.error);
    throw new Error(`Invalid data received from ${endpoint2}`);
  }

  return {
    title: result2.data.data.metadata.title,
    description: result2.data.data.metadata.description,
    openGraphImage: result2.data.data.metadata.openGraphImage,
    headline: result2.data.data.banner.headline,
    supportiveText: result2.data.data.banner.supportiveText,
    projects: result1.data.data,
  }
};

export const fetchBlog = async () => {
  // Get the latest posts
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=100";
  // Get the banner and metadata
  const endpoint2 = "/api/blog-page?populate[banner]=*&populate[metadata][populate]=openGraphImage";

  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const result1 = blog1Schema.safeParse(response1);
  const result2 = blog2Schema.safeParse(response2);

  if (!result1.success) {
    console.error(`Validation failed for ${endpoint1}:`, result1.error);
    throw new Error(`Invalid data received from ${endpoint1}`);
  }

  if (!result2.success) {
    console.error(`Validation failed for ${endpoint2}:`, result2.error);
    throw new Error(`Invalid data received from ${endpoint2}`);
  }

  return {
    title: result2.data.data.metadata.title,
    description: result2.data.data.metadata.description,
    openGraphImage: result2.data.data.metadata.openGraphImage,
    headline: result2.data.data.banner.headline,
    supportiveText: result2.data.data.banner.supportiveText,
    posts: result1.data.data,
  }
};

export const fetchContact = async () => {
  // Get banner, metadata, and headings
  const endpoint1 = "/api/contact-page?populate[banner]=*&populate[metadata][populate]=openGraphImage";
  // Get contact information
  const endpoint2 = "/api/global?populate[contactInformation][populate]=*";

  const [response1, response2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const result1 = contact1Schema.safeParse(response1);
  const result2 = contact2Schema.safeParse(response2);

  if (!result1.success) {
    console.error(`Validation failed for ${endpoint1}:`, result1.error);
    throw new Error(`Invalid data received from ${endpoint1}`);
  }

  if (!result2.success) {
    console.error(`Validation failed for ${endpoint2}:`, result2.error);
    throw new Error(`Invalid data received from ${endpoint2}`);
  }

  return {
    title: result1.data.data.metadata.title,
    description: result1.data.data.metadata.description,
    openGraphImage: result1.data.data.metadata.openGraphImage,
    headline: result1.data.data.banner.headline,
    supportiveText: result1.data.data.banner.supportiveText,
    contactFormHeading: result1.data.data.contactFormHeading,
    otherContactOptionsHeading: result1.data.data.otherContactOptionsHeading,
    email: result2.data.data.contactInformation.email,
    schedulingLink: result2.data.data.contactInformation.schedulingLink,
    workingHours: result2.data.data.contactInformation.workingHours,
    phone: result2.data.data.contactInformation.phone,
  }
};

export const fetchPrivacy = async () => {
  const endpoint = '/api/privacy-policy?populate[banner]=*&populate[metadata][populate]=openGraphImage';
  const response = await fetchData(endpoint);

  const result = privacySchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    title: result.data.data.metadata.title,
    description: result.data.data.metadata.description,
    openGraphImage: result.data.data.metadata.openGraphImage,
    headline: result.data.data.banner.headline,
    supportiveText: result.data.data.banner.supportiveText,
    content: result.data.data.content,
  }
};

export const fetchNotFound = async () => {
  const endpoint = '/api/not-found?populate[banner]=*&populate[metadata][populate]=openGraphImage';
  const response = await fetchData(endpoint);

  const result = notFoundSchema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    title: result.data.data.metadata.title,
    description: result.data.data.metadata.description,
    openGraphImage: result.data.data.metadata.openGraphImage,
    headline: result.data.data.banner.headline,
    supportiveText: result.data.data.banner.supportiveText,
  }
};

export const fetchProjectSlugs = async () => {
  // Get all possible project slugs
  const endpoint = '/api/projects?fields=slug';
  const response = await fetchData(endpoint);

  const result = project1Schema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  const projects = result.data.data;

  return projects.map((project) => ({
    slug: project.slug,
  }));
};

export const fetchProject = async (slug) => {
  // Get project by slug
  const endpoint = `/api/projects?filters[slug]=${slug}&populate=*`;
  const response = await fetchData(endpoint);

  const result = project2Schema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    title: result.data.data[0].title,
    demoUrl: result.data.data[0].demoUrl,
    repoUrl: result.data.data[0].repoUrl,
    content: result.data.data[0].content,
    featuredImage: result.data.data[0].featuredImage,
    scopes: result.data.data[0].scopes,
    tools: result.data.data[0].tools,
    designFile: result.data.data[0].designFile,
  }
};

export const fetchPostSlugs = async () => {
  // Get all possible post slugs
  const endpoint = '/api/posts?fields=slug';
  const response = await fetchData(endpoint);

  const result = post1Schema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  const posts = result.data.data;

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const fetchPost = async (slug) => {
  // Get post by slug
  const endpoint = `/api/posts?filters[slug]=${slug}&populate=*`;
  const response = await fetchData(endpoint);

  const result = post2Schema.safeParse(response);

  if (!result.success) {
    console.error(`Validation failed for ${endpoint}:`, result.error);
    throw new Error(`Invalid data received from ${endpoint}`);
  }

  return {
    title: result.data.data[0].title,
    content: result.data.data[0].content,
    publishedAt: result.data.data[0].publishedAt,
    featuredImage: result.data.data[0].featuredImage,
  }
};
