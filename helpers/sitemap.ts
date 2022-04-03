import fs from "fs";

const SITEMAP_PATH = "./public/sitemap.xml";
const EXTERNAL_DATA_URL = "https://wiki.voidpet.io";

export default async (posts: any) => {
  fs.writeFile(SITEMAP_PATH, "", async () => {
    const stream = fs.createWriteStream(SITEMAP_PATH, { flags: "a" });

    stream.write(await generateSiteMap(posts));
    stream.end();
  });
};

function generateSiteMap(
  posts: {
    slug: string;
    data: {
      [key: string]: any;
    };
  }[]
) {
  let newPosts: String[] = [];
  posts.map((post) => {
    newPosts.push(post.slug);
  });
  const pages = ["", "quests", "search"];
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${newPosts
       .concat(pages)
       .map((slug) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}
