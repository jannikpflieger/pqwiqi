import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getPostContent } from "@/app/components/server_utils";
import { applicationItems } from "@/app/components/applications/data";
import ApplicationClient from "./ApplicationClient";

const DIFFICULTIES = ["elementary", "highschool", "college"];

export default function Application({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const item = applicationItems.find((i) => i.key === params.slug);
  if (!item) notFound();

  // Same difficulty preference the Entries page uses
  const cookieDifficulty = cookies().get("difficulty")?.value;
  const difficulty = DIFFICULTIES.includes(cookieDifficulty ?? "")
    ? cookieDifficulty!
    : "elementary";

  const related = item.related.map((slug) => {
    const { data } = getPostContent(
      `${params.locale}/${difficulty}/entries`,
      slug,
    );
    return {
      slug,
      title: data.title as string,
      subtitle: (data.subtitle as string | undefined) ?? "",
    };
  });

  return (
    <ApplicationClient
      locale={params.locale}
      itemKey={item.key}
      categoryKey={item.category.key}
      number={item.number}
      url={item.url}
      difficulty={difficulty}
      related={related}
    />
  );
}
