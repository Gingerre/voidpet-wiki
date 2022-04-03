import { SearchIcon } from "@heroicons/react/solid";
import { Formik, Form, Field, useFormik } from "formik";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import getPages from "../helpers/getPages";
import removeDupes from "../helpers/removeDupes";

//I love how I call the data from getStaticProps and after it's pared teh same thing (almost). Itr's super helpful!

export default function Search(props: { data: any }) {
  const router = useRouter();
  const { q } = router.query;
  
  const [data, setData] = useState(handler(props.data, (q == undefined ? "" : q as unknown as string)));
  const [search, setSearch] = useState(q as unknown as string)

  
  const formik = useFormik({
    initialValues: { filter: q as unknown as string},

    onSubmit: (values) => {
      setData(handler(props.data, values.filter));
      setSearch(values.filter)
    },
  });
  return (
    <>
    <Head>
        <title>Search | Voidpet Wiki</title>
        <meta name="title" content="Search | Voidpet Wiki" />
        <meta
          name="description"
          content="Search anything about voidpet!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiki.voidpet.io" />
        <meta property="og:title" content="Search | Voidpet Wiki" />
        <meta
          property="og:description"
          content="Search anything about voidpet!"
        />
        <meta property="twitter:url" content="https://wiki.voidpet.io" />
        <meta property="twitter:title" content="Search | Voidpet Wiki" />
        <meta
          property="twitter:description"
          content="Search anything about voidpet!"
        />
    </Head>
    <div className="">
      <h1 className="font-extrabold text-4xl mt-24 mb-4">
        {search ? `Search results for "${search}"` : "Search Anything!" }
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="relative w-min">
          <input
            id="filter"
            name="filter"
            type="search"
            onChange={(e) => {
              formik.handleChange(e);
              setData(handler(props.data, e.target.value));
              setSearch(e.target.value)
            }}
            onBlur={formik.handleBlur}
            value={formik.values.filter}
            className="rounded-lg text-base border-none w-96 shadow-lg !pr-10"
          />
          <button type="submit">
            <SearchIcon className="absolute right-0 top-2 mr-2 w-5 h-5 text-gray-400" />
          </button>
        </div>
      </form>
      
      <div className="mt-8 flex  divide-y divide-gray-900/20 flex-col">
        {data.data.map(
          (v: {
            title: string;
            description: string;
            slug: string;
            keywords: string[];
          }) => (
            <div className="py-6" key={v.slug}>
              <h2 className="font-extrabold text-2xl mb-2">{v.title}</h2>
              {v.keywords.slice(0, 6).map((keyword) => (
                <span
                  className="inline-block bg-gray-300 rounded-full px-3 py-0.5 text-sm font-semibold text-gray-700 mr-2"
                  key={keyword}
                >
                  {keyword}
                </span>
              ))}
              <p className="text-gray-600 max-w-xl mt-4 mb-6">
                {v.description}
              </p>
              <Link href={`/${v.slug}`}>
                <a>
                  <button className="inline-block text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
                    Read 📜
                  </button>
                </a>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
    
    
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pages = getPages();
  return {
    props: {
      data: pages,
    },
  };
}

interface Pages {
  slug: string;
  data: {
    [key: string]: any;
  };
}

export interface MainData {
  title: string;
  description: string;
  slug: string;
  category: string;
  sidebar: {
    type: string;
    name: string;
    length: string;
    location: string;
    starterNPC: string;
    reward: string;
  };
}

function handler(
  pages: Pages[],
  query: string
): {
  success: boolean;
  data: Array<{
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  }>;
} {
  pages.unshift({
    slug: "quests",
    data: {
      title: "Quests",
      description:
        "This article will help you understand the quests in the game.",
      keywords: ["quest", "questing", "missions"],
    },
  });
  const searchList: string[] = query
    .normalize()
    .replace("?", "")
    .toLowerCase()
    .split("-");

  //if (search.length > 20)

  let r: Array<{
    title: string;
    description: string;
    slug: string;
    keywords: string[];
  }> = [];
  try {
    pages.map((page) => {
      searchList.map((search: string) => {
        if (page.slug.toLowerCase().includes(search)) {
          r.push({
            title: page.data.title,
            description: page.data.description,
            slug: page.slug,
            keywords: page.data.keywords,
          });
        } else if (page.data.keywords) {
          page.data.keywords.map((keyword: string) => {
            if (keyword.toLowerCase().includes(search)) {
              r.push({
                title: page.data.title,
                description: page.data.description,
                slug: page.slug,
                keywords: page.data.keywords,
              });
            }
          });
        }
      });
    });
  } catch (e) {
    console.log(e);
  }

  return { success: r.length != 0, data: removeDupes(r) };
}
