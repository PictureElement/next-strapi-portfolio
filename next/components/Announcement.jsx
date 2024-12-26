import AnnouncementContent from "./AnnouncementContent";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { fetchData } from "@/lib/utils";

export default async function Announcement() {
  console.log("Hello from Announcement");

  const endpoint = "/api/global?populate[announcement][populate]=*";
  const data = await fetchData(endpoint);

  const fallbackAnnouncement = {
    content: 'Content'
  };

  const announcement = data?.announcement || fallbackAnnouncement;

  // Render nothing if no content
  if (!announcement?.content) {
    return null;
  }

  const content = (
    <div
      className="text-center max-w-none prose prose-sm prose-invert prose-a:no-underline prose-a:font-medium prose-a:border-b prose-a:border-primary-700 hover:prose-a:border-b-2"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(announcement.content)) }}
    />
  );

  return (<AnnouncementContent>{content}</AnnouncementContent>);
}
