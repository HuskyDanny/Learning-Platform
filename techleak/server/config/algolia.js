const algoliasearch = require("algoliasearch");

const client = algoliasearch(
  process.env.APPLICATION_ID,
  process.env.SEARCH_ADMIN_API,
  {
    protocol: "https:"
  }
);

const index = client.initIndex("Test");
const algoliaSchema = ["title", "tags", "author", "likes", "datePosted"];

index.setSettings({
  searchableAttributes: ["title", "tags"]
});

module.exports.index = index;
module.exports.algoliaSchema = algoliaSchema;
