import dayjs from "dayjs";
import {
  For,
  Show,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  type Component,
} from "solid-js";
import { PostCard } from "./post-card";
import { PostCardLoader } from "./post-card-loader";
import { detectScrollBoundary } from "../lib/scroll";
import {
  createClient,
  type ContentPieceWithAdditionalData,
} from "@vrite/sdk/api";

interface HostConfig {
  contentGroupId: string;
  accessToken: string;
}
interface PostsListProps {
  contentPieces: ContentPieceWithAdditionalData[];
  hostConfig: HostConfig;
}

const PostsList: Component<PostsListProps> = (props) => {
  const postsPerPage = 20;
  const [loading, setLoading] = createSignal(false);
  const [page, setPage] = createSignal(2);
  const [moreToLoad, setMoreToLoad] = createSignal(
    props.contentPieces.length >= postsPerPage
  );
  const [contentPieces, setContentPieces] = createSignal([
    ...props.contentPieces,
  ]);

  const contentPiecesByMonth = createMemo(() => {
    return contentPieces().reduce((contentPiecesByMonth, contentPiece) => {
      const date = contentPiece.date ? new Date(contentPiece.date) : null;
      const month = date ? dayjs(date).format("MMMM YYYY") : "";

      if (!contentPiecesByMonth[month]) {
        contentPiecesByMonth[month] = [];
      }
      contentPiecesByMonth[month].push(contentPiece);

      return contentPiecesByMonth;
    }, {} as Record<string, ContentPieceWithAdditionalData[]>);
  });

  onMount(() => {
    if (typeof window === "undefined") return;

    const removeListener = detectScrollBoundary(
      null,
      async (boundary) => {
        if (boundary !== "bottom" || !moreToLoad() || loading()) return;

        setLoading(true);
        const client = createClient({
          token: props.hostConfig.accessToken,
        });
        const newContentPieces = await client.contentPieces.list({
          contentGroupId: props.hostConfig.contentGroupId,
          perPage: postsPerPage,
          page: page(),
        });
        setLoading(false);
        setPage(page() + 1);
        setMoreToLoad(newContentPieces.length >= postsPerPage);
        setContentPieces((contentPieces) => [
          ...contentPieces,
          ...newContentPieces,
        ]);
      },
      { offset: 200 }
    );

    onCleanup(() => {
      removeListener();
    });
  });

  return (
    <div class="flex flex-col gap-20 w-full">
      <For each={Object.entries(contentPiecesByMonth())}>
        {([month, contentPieces]) => {
          return (
            <div class="relative">
              <div class="absolute w-full opacity-10 text-black dark:text-white font-mono text-lg flex items-center justify-center gap-4 -top-13.5">
                <div class="h-2px bg-black dark:bg-white flex-1" />
                {month}
              </div>
              <div>
                <div class="flex flex-col gap-20 w-full">
                  {contentPieces.map((contentPiece) => (
                    <PostCard contentPiece={contentPiece} />
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </For>
      <Show when={loading()}>
        <PostCardLoader />
        <PostCardLoader />
      </Show>
    </div>
  );
};

export { PostsList };
