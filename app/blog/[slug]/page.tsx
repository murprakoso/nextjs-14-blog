import { IFullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface IParams {
  params: {
    slug: string;
  };
}

export const revalidate = 30; // revalidate at most every 30 seconds

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}'] { 
    "currentSlug": slug.content,
      title,
      content,
      titleImage
  }[0]`;

  return await client.fetch(query);
}

/**
 * This is the detail page for the blog
 */
export default async function BlogArticle({ params }: IParams) {
  const data: IFullBlog = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Murprakoso - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="Title Image"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
