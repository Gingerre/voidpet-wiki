import { MDXRemote } from "next-mdx-remote";
import getPage from "../helpers/getPage";
import getPages from "../helpers/getPages";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";
import { H2, H3 } from "../components/elements";
import Head from "next/head";

function Post(props: { data: {title: string, description: string, category?: string, sidebar?: { type: 'quest', name: 'proof-of-competence', length: 'short', location: "Atrium pool & Horto Area", starterNPC: "Invidere", reward: "200xp" }}, content: any, page: any }) {
  return (
    <>
    <Head>
      
    </Head>
    <div className="flex flex-col items-start md:flex-row justify-between mt-24">
      <div>
        <h1 className="font-extrabold text-4xl ">{props.data.title}</h1>
        <header className="text-gray-600 text-sm mb-12 max-w-xl mt-4">{props.data.description}</header>
        <p className={"prose dark:prose-invert mt-12 prose-a:underline prose-a:underline-offset-2 prose-a:decoration-blue-500 " +
        "hover:prose-a:decoration-2 prose-a:transition prose-a:cursor-pointer prose-img:rounded-xl prose-img:shadow-lg"}>
          <MDXRemote
          components={{
            h2: H2,
            h3: H3,
          }}
          {...props.content} 
          />
        </p>
        <a href={`https://github.com/quick007/voidpet-wiki/edit/main/posts/${props.page}.mdx/`} className="rounded-lg bg-gray-50 shadow-md inline-flex px-4 py-2 font-semibold text-gray-800 mt-8 hover:-translate-y-1.5 transition duration-300">Edit on Github</a>
        <div onClick={() => alert("Coming soon:tm:")} className="rounded-lg shadow-md inline-flex px-4 py-2 ml-4 font-semibold  mt-8 bg-accent text-white hover:-translate-y-1.5 transition duration-300">Random Article</div>
      </div>
      {props.data.sidebar ? (
        <div className="rounded-lg p-4 bg-gray-50 flex flex-col shadow-lg max-w-xs sticky top-20">
        <h2 className="text-2xl text-gray-800 text-center font-semibold">
          {props.data.sidebar.type.charAt(0).toUpperCase() + props.data.sidebar.type.slice(1) /*Uppercase it*/}
        </h2>
        <hr className="w-10 mx-auto mt-1 mb-4" />
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Length: <span className="font-semibold">{props.data.sidebar.length}</span></li>
          <li>Location: <span className="font-semibold">{props.data.sidebar.location}</span></li>
          <li>Reward: <span className="font-semibold">{props.data.sidebar.reward}</span></li>
          <li>Starter NPC: <span className="font-semibold">{props.data.sidebar.starterNPC}</span></li>
        </ul>
        
      </div>
      )
        : ""}
      
    </div>
    </>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getPages();
  const paths = pages.map((page) => ({ params: { slug: page.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (props: { params?: any }) => {
  const page = await getPage(props.params?.slug);
  const mdxSource = await serialize(page.content);
  return {
    props: {
      data: page.data,
      content: mdxSource,
      page: props.params?.slug
    },
  };
};
