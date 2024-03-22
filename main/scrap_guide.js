const getDetails = require("./fetch");
const { insertData } = require("../utils/insert_data");

async function fetchGuideDetails(url) {
  const details = await getDetails(url);
  const parts = url.split("/");
  const cityName = parts[3];
  const guideName = parts[5];

  const baseQueryPath = `postGuideCollection({\"limit\":1,\"where\":{\"canonicalPath\":\"/${cityName}\",\"slug\":{\"name\":\"${guideName}\"}}})`;
  const reviewItems =
    details.props.pageProps.initialApolloState.ROOT_QUERY[baseQueryPath]
      .items[0].content.links.entries.block;
  // console.log(reviewItems);

  function getFirstItemOrDefault(collection, propName, defaultValue = "") {
    return collection?.items[0]?.[propName] ?? defaultValue;
  }

  let guide_list = reviewItems.map((block) => {
    const overrideTarget = block.overrideTarget;
    const venue = overrideTarget?.venue ?? block?.venue;
    const priceSymbol = "$";
    const slug = overrideTarget?.slug?.name ?? block?.slug?.name ?? null;

    return {
      name: overrideTarget?.title ?? block?.title ?? overrideTarget?.name,
      cuisine:
        getFirstItemOrDefault(
          overrideTarget?.[`cuisineTagsCollection({"\limit\":1})`],
          "name"
        ) ??
        getFirstItemOrDefault(
          block?.[`cuisineTagsCollection({"\limit\":1})`],
          "name"
        ),
      streetAddress: venue?.street ?? overrideTarget?.street,
      neighborhood:
        getFirstItemOrDefault(
          overrideTarget?.[`neighborhoodTagsCollection({\"limit\":1})`],
          "displayName"
        ) ??
        getFirstItemOrDefault(
          block?.[`neighborhoodTagsCollection({"\limit\":1})`],
          "displayName"
        ),
      phoneNumber: venue?.phone ?? overrideTarget?.phone,
      country: venue?.country ?? overrideTarget?.country,
      source: "The Infatuation",
      city: venue?.city ?? overrideTarget?.city,
      rating: venue?.rating ?? overrideTarget?.rating ?? null,
      latitude: venue?.latlong.lat ?? overrideTarget?.latlong.lat,
      longitude: venue?.latlong.lon ?? overrideTarget?.latlong.lon,
      url: slug
        ? `https://www.theinfatuation.com/${cityName}/reviews/${slug}`
        : "",
      photos:
        "https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_3840,ar_4:3,g_center,f_auto/" +
        (overrideTarget?.headerImageV2?.[0].public_id ??
          overrideTarget?.imageV2?.[0].public_id ??
          venue?.headerImageV2?.[0].public_id ??
          venue?.imageV2?.[0].public_id ??
          block?.headerImageV2?.[0].public_id ??
          block?.imageV2?.[0].public_id),
      website: venue?.url ?? overrideTarget?.url ?? "",
      perfectFor:
        block?.[`perfectForCollection({\"limit\":6})`]?.items.map(
          (item) => item.name
        ) ??
        overrideTarget?.[`perfectForCollection({\"limit\":6})`]?.items.map(
          (item) => item.name ?? []
        ),
      price: priceSymbol.repeat(venue?.price ?? null),
    };
  });
  return guide_list;
}

async function guide_scraper(url, MONGODB_URI) {
  //   let restaurantGuides = [
  //     "https://www.theinfatuation.com/los-angeles/guides/best-venice-restaurants",
  //   ];
  console.log(url);

  //   for (let url of restaurantGuides) {
  let guide_list = await fetchGuideDetails(url);
  let identifier = url.split("/").pop();
  console.log(guide_list);
  console.log(identifier, "scrapping");
  console.log(guide_list.length, "guides scraped");

  await insertData(
    guide_list,
    MONGODB_URI,
    "theInfautationBestList",
    identifier
  );
  //   }
}

module.exports = {
  guide_scraper: guide_scraper,
};
