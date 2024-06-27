const detectScrollBoundary = (
  element: HTMLElement | null,
  callback: (boundary: "top" | "bottom") => void,
  options?: {
    debounce?: number;
    offset?: number;
  }
) => {
  const scrollContainer = element || window;
  const offset = options?.offset || 10;
  const debounce = options?.debounce || 50;

  let scrollPosition = "";
  let timeoutHandle = 0;

  const handleScroll = () => {
    const clientHeight = element ? element.clientHeight : window.innerHeight;
    const scrollHeight = element
      ? element.scrollHeight
      : document.body.scrollHeight;
    const scrollTop = element ? element.scrollTop : window.scrollY;

    if (clientHeight >= scrollHeight) {
      clearTimeout(timeoutHandle);
      scrollPosition = "";
    } else if (scrollTop < offset) {
      if (scrollPosition !== "top") {
        clearTimeout(timeoutHandle);
      }
      scrollPosition = "top";
      timeoutHandle = setTimeout(() => {
        callback("top");
      }, debounce);
    } else if (Math.abs(scrollTop + clientHeight - scrollHeight) < offset) {
      if (scrollPosition !== "bottom") {
        clearTimeout(timeoutHandle);
      }
      scrollPosition = "bottom";
      timeoutHandle = setTimeout(() => {
        callback("bottom");
      }, debounce);
    }
  };

  scrollContainer.addEventListener("scroll", handleScroll);

  return () => {
    scrollContainer.removeEventListener("scroll", handleScroll);
  };
};

export { detectScrollBoundary };
