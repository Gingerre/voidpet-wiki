import Link from "next/link";
import { ReactChild, useEffect, useState, useRef } from "react";
import { ChevronDownIcon, ChevronUpIcon, MenuAlt3Icon, SearchIcon, XIcon } from "@heroicons/react/solid";
import ClickOutside from "./clickOutside";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";


function Header() {
  const router = useRouter();
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const [open, setOpen] = useState(false);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  
  return (
    <>
      <div
        className={
          "flex justify-between my-8 z-30 items-center sticky top-0 " +
          (clientWindowHeight == 0 ? "" : " bg-[#E8E9F0]/50 backdrop-blur")
        }
      >
        <Link href="/">
          <a className="flex space-x-4 items-center">
            {" "}
            <svg
              className="w-12 h-12"
              viewBox="0 0 200 200"
              width="100%"
              height="100%"
            >
              <ellipse
                cx="90"
                cy="170"
                rx="61.0271"
                ry="14.5"
                fill="black"
                fillOpacity="0.1"
              ></ellipse>
              <path
                pointerEvents="none"
                d="M99.4582 59.2216C82.8942 72.1047 83.36322 103.8686 70.9313 116.275C53.70336 133.4803 36.98128 126.29515 24.04878 108.90316C33.89578 142.49816 70.75294 158.416 103.14984 142.502C129.37584 129.619 122.004 101.092 132.126 97.4108C142.249 93.7299 163.414 90.95846 169.395 84.51686C175.376 78.07526 181.818 54.60966 169.395 54.60966C156.972 54.60966 116.022 46.3385 99.4582 59.2216Z"
                fill="black"
                stroke="black"
              ></path>
              <path
                pointerEvents="none"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M123.50485 82.00421C129.85785 82.00421 135.00785 76.85431 135.00785 70.50151C135.00785 64.14871 129.85785 58.99871 123.50485 58.99871C117.15185 58.99871 112.00185 64.14871 112.00185 70.50151C112.00185 76.85431 117.15185 82.00421 123.50485 82.00421ZM123.50485 76.48291C126.80785 76.48291 129.48585 73.80501 129.48585 70.50151C129.48585 67.19801 126.80785 64.52011 123.50485 64.52011C120.20085 64.52011 117.52285 67.19801 117.52285 70.50151C117.52285 73.80501 120.20085 76.48291 123.50485 76.48291Z"
                fill="white"
              ></path>
            </svg>
            <h1 className="font-medium text-xl">Voidpet Wiki</h1>
          </a>
        </Link>
        {open ? <XIcon className="w-6 h-6 md:hidden " onClick={() => setOpen(false)} /> : <MenuAlt3Icon className="w-8 h-8 md:hidden " onClick={() => setOpen(true)} />}
        {/*@ts-ignore*/}
        <ClickOutside show={open} onClickOutside={() => setOpen(false)} className="absolute right-0 top-12">
          <div className="rounded-lg shadow-2xl bg-white p-4 space-y-4 flex flex-col">
          <a
            href="https://voidpet.io"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg mx-auto"
          >
           Voidpet Tools
          </a>
          <Link href="/search">
            <a
              className="rounded-lg mx-auto"
            >
              Search
            </a>
          </Link>
          <Link href="/contribute">
            <a
              
              
              className="inline-block text-center rounded-lg px-3 py-1  hover:-translate-y-0.5 duration-300 text-white bg-accent shadow-md shadow-accent/25"
            >
              Contribute 💖
            </a>
          </Link>
          </div>
        </ClickOutside>
        
        <div className="space-x-4 md:flex items-center hidden peer-focus:block">
          <Formik
          initialValues={{"search": ""}}
          onSubmit={(values) => {
            router.push(`/search?q=${values.search}`);

          }}
          >
            <Form>
              <div className="relative">
                <label htmlFor="search" className="sr-only">Search</label>
                 <Field name="search" type="search" className="rounded-lg text-sm border-none !py-1 shadow-md !pr-7" />
                 <button type="submit" name="Search" >
                 <SearchIcon className="absolute right-0 top-1 mr-2 w-5 h-5 text-gray-400" />
                 </button>
              </div>
             
            </Form>
          </Formik>
          <a
            href="https://voidpet.io"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg "
          >
           Voidpet Tools
          </a>
          <Link href="/contribute">
            <a
              
              
              className="inline-block text-center rounded-lg px-3 py-1  hover:-translate-y-0.5 duration-300 text-white bg-accent shadow-md shadow-accent/25"
            >
              Contribute 💖
            </a>
          </Link>
        
        </div>
      </div>
      <ul
        className={
          "flex flex-col sm:flex-row md:space-x-8 transition duration-500 mx-2 " +
          (clientWindowHeight < 20 ? "opacity-100" : "opacity-0")
        }
      >
        <Dropdown
          title="Explore"
          dropdown={[
            { name: "Home", to: "/" },
            { name: "All Pages", to: "/search" },
          ]}
        />
        <Dropdown
          title="Guide"
          dropdown={[
            { name: "Getting Started", to: "/getting-started" },
            { name: "Activities & Bond", to: "/bond-and-skills" },
            { name: "Attacking", to: "/attacking" },
          ]}
        />
        <Dropdown
          title="Resources"
          dropdown={[
            { name: "Contribute", to: "/contribute" },
          ]}
        />
      </ul>
    </>
  );
}

export default Header;

function Dropdown(props: {
  title: string;
  dropdown: Array<{ name: string; to: string }>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <li className="relative group py-4 md:py-0" key={props.title}>
      <span className="pr-10 invisible">{props.title}</span>
      <button
        className="absolute top-0 font-medium text-gray-900 focus:outline-none flex items-center z-10 md:bg-bg pr-10 my-4 md:my-0 py-3 md:py-0"
        onClick={() => setOpen(!open)}
      >
        <span className="mr-1">{props.title}</span>
        {props.dropdown ? (
          <>
            <ChevronDownIcon className="w-6 h-6 group-hover:hidden" />
          
            <ChevronUpIcon className="w-6 h-6 hidden group-hover:block" />
          </>
        ) : null}
      </button>
      {typeof window != "undefined" ? !open && window.innerWidth < 768 ? null : (
        <div className=" md:absolute md:invisible md:group-hover:visible md:group-hover:translate-y-0 -translate-y-4 md:-translate-y-8 transition duration-100 top-0 pt-8 ">
          <div className="rounded-lg shadow-xl bg-gray-100  text-sm px-4 py-2 flex flex-col ">
          {props.dropdown.map((v) => 
            (
              <Link href={v.to} key={v.name}>
                <a className="px-2 py-1 hover:bg-gray-200 rounded-lg mx-auto mt-1 z-0 text-center">{v.name}</a>
              </Link>
            )
          )}
          </div>
        </div>
      ) : ""}
      
    </li>
  );
}
