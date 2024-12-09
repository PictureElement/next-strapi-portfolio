import SectionHeader from "./SectionHeader";
import PostList from "./PostList";
import BtnSecondary from "./BtnSecondary";
import { fetchData } from "@/lib/utils";
import ShapeDivider from "./ShapeDivider";

export default async function LatestPosts() {
  console.log("Hello from LatestPosts");

  // Post List (3 Latest Posts)
  const endpoint1 = "/api/posts?fields[0]=title&fields[1]=slug&fields[2]=excerpt&sort=publishedAt:desc&pagination[pageSize]=3";

  // Headline and Supportive Text
  const endpoint2 = "/api/homepage?populate[latestPosts][populate]=*";

  const [data1, data2] = await Promise.all([
    fetchData(endpoint1),
    fetchData(endpoint2),
  ]);

  const fallbackLatestPosts = {
    headline: 'LATEST POSTS',
    supportiveText: 'Supportive Text',
  }

  const postList = data1?.length > 0 ? data1 : null;
  const latestPosts = data2?.latestPosts || fallbackLatestPosts;

  return (
    <section className="bg-white py-24 relative">
      <ShapeDivider className="fill-gray-50" />
      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeader headline={latestPosts.headline} supportiveText={latestPosts.supportiveText} />
        {postList ? (
          <>
            <PostList postList={postList} />
            <div className="mt-6 md:mt-12 flex items-center justify-center gap-x-4">
              <BtnSecondary label="View all posts" url="#" />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">
            No posts available at the moment. Please check back later!
          </p>
        )}
      </div>
    </section>
  )
}