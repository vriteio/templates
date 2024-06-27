const PostCardLoader = () => {
  return (
    <div class="flex flex-col-reverse md:flex-row w-full gap-4 md:gap-20 relative z-10 group">
      <div class="flex-1">
        <div class="max-w-md flex flex-col gap-3">
          <div class="bg-gray-200 dark:bg-gray-700 h-5 w-24 animate-pulse rounded-xl"></div>
          <div class="bg-gray-200 dark:bg-gray-700 h-8 rounded-xl animate-pulse max-w-sm"></div>
          <div class="h-18 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"></div>
          <div class="flex justify-start items-center gap-2">
            {Array(3)
              .fill(0)
              .map(() => (
                <div class="inline-flex h-5 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl" />
              ))}
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-8 justify-center items-center w-full max-w-lg">
        <div class="w-full rounded-3xl relative">
          <div class="rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 h-60 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export { PostCardLoader };
