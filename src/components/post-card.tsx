import type { ContentPieceWithAdditionalData } from "@vrite/sdk/api";
import dayjs from "dayjs";
import { Show, type Component } from "solid-js";

interface PostCardProps {
  contentPiece: ContentPieceWithAdditionalData;
}

const PostCard: Component<PostCardProps> = (props) => {
  return (
    <a
      class="flex flex-col-reverse md:flex-row w-full gap-4 md:gap-20 relative z-10 group"
      href={`/${props.contentPiece.slug}/`}
    >
      <div class="flex-1">
        <div class="max-w-lg">
          <div class="flex-1 text-gray-500 dark:text-gray-400">
            {props.contentPiece.date &&
              dayjs(props.contentPiece.date).format("DD MMM YYYY")}
          </div>
          <h2 class="!font-bold text-3xl mb-1 group-hover:bg-gradient-to-tr group-hover:bg-clip-text group-hover:text-transparent">
            {props.contentPiece.title}
          </h2>
          <div
            class="font-normal text-lg mb-2 text-gray-500 dark:text-gray-400"
            innerHTML={props.contentPiece.description || undefined}
          />
          <div class="flex justify-start items-center gap-2 mb-1">
            {props.contentPiece.tags.map((tag) => (
              <div class="font-mono text-sm inline-flex">
                <span class="font-bold bg-gradient-to-tr bg-clip-text text-transparent">
                  #
                </span>
                <span class="opacity-80">{tag.label?.trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Show when={props.contentPiece.coverUrl}>
        <div class="flex flex-col gap-8 justify-center items-center w-full max-w-lg">
          <div class="w-full rounded-3xl relative">
            <div class="grid-background-3 -z-10"></div>
            <div class="transition-transform duration-300 ease-in-out group-hover:scale-95 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              {props.contentPiece.coverUrl && (
                <img
                  alt={props.contentPiece.coverAlt || undefined}
                  src={`${props.contentPiece.coverUrl}?w=600`}
                  class="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </Show>
    </a>
  );
};

export { PostCard };
