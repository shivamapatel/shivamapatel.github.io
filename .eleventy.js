module.exports = function (eleventyConfig) {
  // Copy CSS and CNAME to output
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Date filter for writing posts
  eleventyConfig.addFilter("dateFilter", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // Writing collection — all .md files in writing/, sorted newest first
  eleventyConfig.addCollection("writing", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/writing/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
