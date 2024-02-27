import { Card, CardContent } from "@/components/ui/card";
import { ISimpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'blog' ] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage  
  }`;

  return await client.fetch(query);
}

export default async function Home() {
  const data: ISimpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            src={urlFor(post.titleImage).url()}
            alt="Image"
            width={500}
            height={500}
            className="rounded-t-lg w-[100%] h-[200px] object-cover"
          />
          <CardContent className="mt-5">
            <h3 className="text-lg font-bold line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Button asChild className="mt-5 w-full">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
