import Image from "next/image";
import Link from "next/link";
import { ClassAttributes, AnchorHTMLAttributes } from "react";

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

export function H2(props: { children: any }) {
  const anchor = getAnchor(props.children);
  const link = `#${anchor}`;
  return (
    <div className="">
      <span id={anchor} className="invisible pt-20 -mt-20 absolute "></span>
      <h2 id={anchor} className="group -translate-x-6 font-bold">
        <Link href={link}>
          <a className="!no-underline relative font-bold">
            <span className="opacity-0 group-hover:opacity-100 transition duration-300 font-bold">
              #
            </span>{" "}
            {props.children}
          </a>
        </Link>
      </h2>
    </div>
  );
}

export function H3(props: { children: any }) {
  const anchor = getAnchor(props.children);
  const link = `#${anchor}`;
  return (
    <div className="">
      <span id={anchor} className="invisible pt-20 -mt-20 absolute "></span>
      <h3 className="group -translate-x-5 ">
        <Link href={link}>
          <a className="!no-underline relative font-bold">
            <span className="opacity-0 group-hover:opacity-100 transition duration-300 font-bold">
              #
            </span>{" "}
            {props.children}
          </a>
        </Link>
      </h3>
    </div>
  );
}

export function TABLE(props: { children: any }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className=" ">{props.children}</table>
      </div>
    </>
  );
}

export const CustomLink = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLAnchorElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>
) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const IMG = (props: {
  src: string;
  alt: string;
  height: number;
  width: number;
}) => {
  const imageProps = {
    src: props.src,
    alt: props.alt,
    height: props.height,
    width: props.width,
  };
  return (
    <div className="img-shadow-cause-nextjs-is-stupid">
      <Image {...imageProps} className="shadow-xl" />
    </div>
  );
};
