import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import PostCard from "../components/PostCard";
import getPages from "../helpers/getPages";
import genSitemap from "../helpers/sitemap"

export default function Home(props: { pages: [key: string] }) {
  return (
    <>
      <Head>
        <title>Voidpet Wiki</title>
        <meta name="title" content="Voidpet Wiki" />
        <meta
          name="description"
          content="The Voidpet wiki is THE place to learn about anything and all Voidpet related!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wiki.voidpet.io" />
        <meta property="og:title" content="Voidpet Wiki" />
        <meta
          property="og:description"
          content="The Voidpet wiki is THE place to learn about anything and all Voidpet related!"
        />
        <meta property="twitter:url" content="https://wiki.voidpet.io" />
        <meta property="twitter:title" content="Voidpet Wiki" />
        <meta
          property="twitter:description"
          content="The Voidpet wiki is THE place to learn about anything and all Voidpet related!"
        />
      </Head>
      <div className="mt-16 text-gray-800 flex-col md:flex-row flex">
        {/*Left Side*/}

        <div>
          {/**/}
          <h1 className="font-bold text-3xl text-gray-900 mb-2">Welcome</h1>
          <p>
            Welcome to the Voidpet Wiki! After many google docs, google docs
            linking to other google docs, and another{" "}
            <a
              className="link"
              target="_blank"
              href="https://docs.google.com/document/d/1jegHrtkwL5z7BnJm-T9Zbl3iNKi8p6qhoLWPMM0whUs/edit"
              rel="nooppener noreferrer"
            >
              google doc
            </a>{" "}
            linking to all of those google docs, I decided to make this wiki. If
            you have the time, please{" "}
            <Link href="/contribute">
              <a className="link">contribute</a>
            </Link>
            ! No coding experiance required. Voidpet is very new and this wiki
            will probably need constant updates, so all help is appreciated.{" "}
          </p>
          <h2 className="mt-8 font-bold text-3xl mb-2">What is Voidpet</h2>
          <p className="">
            Voidpet (otherwise known as the old name nightmares) is a
            Pokemon-inspired game that bases itself around emotions! Just like
            Pokemon, Voidpets evolve into bigger creatures. It&apos;s to help
            make people aware of others&apos; situations and how they deal with
            mental issues and trauma.
          </p>

          {/*Featured Pages! Feel free to insert your article here (make sure it's interesting!)
        
        You can copy one of the already added `Featured` components and rewrite it to bge your own. 
        Please keep descriptions short and to the point.
        */}

          <h2 className="mt-8 font-bold text-3xl mb-2">Featured Pages</h2>
          <div className="grid max-w-2xl w-full sm:grid-cols-2 md:grid-cols-3 mb-8 gap-6">
            <Featured
              title="Getting Started"
              description="Learn the basics of Voidpet"
              link="/getting-started"
            />
            <Featured
              title="Bond & Skills"
              description="Learn what they are and how to boost your bond and skills/stats"
              link="/bond-and-skills"
            />
            <Featured
              title="Attacking"
              description="Learn how to attack other Voidpets and win"
              link="/attacking"
            />
            <Featured
              title="Quests"
              description="Learn how to complete quests"
              link="/quests"
            />
            <Featured
              title="Leveling"
              description="Learn how to level up, wwhen your pet will evolve, and more"
              link="/leveling"
            />
            <Featured
              title="Vivds"
              description="Vivids, the Shiny's of Voidpet - differently colored voidpets."
              link="/vivids"
            />
            
          </div>
          {/*posts.map((post) => (
        <PostCard
          key={post.slug}
          title={post.data.title}
          date={post.data.date}
          description={post.data.description}
          slug={post.slug}
        />
      ))*/}
        </div>

        {/*Right side*/}

        <div className="max-w-xs w-full md:ml-10 space-y-10">
          {/*First Box*/}
          <div className="rounded-lg p-4 bg-gray-50 flex flex-col shadow-lg">
            <h2 className="text-2xl text-gray-800 text-center font-semibold">
              Latest Update
            </h2>
            <hr className="w-10 mx-auto mt-1 mb-4" />
            <ul className="list-disc list-inside mb-8 text-gray-700">
              <li>You can complete your first quest</li>
              <li>You can increase your skills</li>
              <li>
                You can obtain void matter by killing &gt;1 level opponents
              </li>
              <li>
                Giga is a way to support the devs and get ingame items such as
                wings, void matter, and boucing pets
              </li>
            </ul>
            <Link href="/updates">
              <a className="w-full">
                <button className="inline-block w-full text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
                  Learn More 📚
                </button>
              </a>
            </Link>
          </div>
          {/*Second Box*/}
          <div className="rounded-lg p-4 bg-gray-50 flex flex-col shadow-lg">
            <h2 className="text-2xl text-gray-800 text-center font-semibold">
              Starter Guide
            </h2>
            <hr className="w-10 mx-auto mt-1 mb-4" />
            <p className="mb-8 text-gray-700">
              Voidpet is full of mysteries and fun mechanics. While this guide
              won&apos;t divulge the details of the secret, it will give you a
              wealth of knowledge every earlygame player should know.
            </p>
            <Link href="/getting-started">
              <a className="w-full">
                <button className="inline-block w-full text-center rounded-lg px-5 py-2 -translate-y-1.5 hover:-translate-y-2.5 duration-300  text-white bg-accent shadow-md">
                Get Started 🚀
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const pages = getPages();
  genSitemap(pages)
  return {
    props: {
      pages,
    },
  };
};

function Featured(props: { title: string; description: string; link: string }) {
  return (
    <Link href={props.link}>
      <a className="rounded-lg bg-gray-50 shadow-md p-4 flex group cursor-pointer hover:shadow-xl transition duration-300">
        <div className="flex-1">
          <h3 className="font-semibold">{props.title}</h3>
          <p className="text-sm">{props.description}</p>
        </div>
        <div className="pl-1">
          <ChevronRightIcon className="h-6 w-6 text-gray-600 group-hover:text-gray-900 group-hover:translate-x-1 transition duration-300" />
        </div>
      </a>
    </Link>
  );
}
