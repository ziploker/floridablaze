const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${storyFromRails.slug}`,
  },
  description: `${storyFromRails.description}`,
  image: [`${storyFromRails.urls[0]}`],
  inLanguage: "en-US",

  dateCreated: `${storyFromRails.created_at}`,
  dateModified: `${storyFromRails.updated_at}`,
  author: {
    "@type": "Person",
    name: "FloridaBlaze Staff",
  },
  publisher: {
    "@type": "NewsMediaOrganization",
    name: "FloridaBlaze",
    logo: {
      "@type": "ImageObject",
      url: "https://weedblogimages.s3.amazonaws.com/company_logo.png",
      height: 35,
      width: 285,
    },
  },
};

export default articleStructuredData;
