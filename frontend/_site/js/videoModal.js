const modalClose = document.querySelector("#modal-close");

const searchSection = document.querySelector("#search-section");
const searchInput = document.querySelector("#search-input");
const fuzzySearch = document.querySelector("#fuzzy-search");
const closeSearch = document.querySelector("#close-search");

let videoData = []; // We'll load this once
let start = 0;
const pageSize = 12;

// Load video data from local JSON
fetch("/videos.json")
  .then((res) => res.json())
  .then((data) => {
    videoData = data;
    fetchVideo(start);
  });

// Show paginated videos
function fetchVideo(start) {
  document.getElementById("skeleton-cards").classList.remove("hidden");
  const paginatedData = videoData.slice(start, start + pageSize);

  document.getElementById("paginated-video").innerHTML = "";

  paginatedData.forEach((vid) => {
    const markup = `
      <div url="${vid.URL}" class="video-card w-[80vw] md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <div>
              <img url="${vid.URL}" class="rounded-t-lg w-full" src="${vid.thumbnail}" alt="${vid.title}" />
          </div>
          <div class="p-5">
              <h5 url="${vid.URL}" class="mb-2 text-2xl font-bold tracking-tight capitalize text-gray-900 dark:text-white">
                  ${vid.title}
              </h5>
              <p url="${vid.URL}" class="mb-3 font-semi-bold text-gray-700 dark:text-gray-400">
                  ${vid.duration} sec
              </p>
          </div>
      </div>
    `;
    document
      .getElementById("paginated-video")
      .insertAdjacentHTML("beforeend", markup);
  });

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const url = e.currentTarget.getAttribute("url");
      const videoId = new URL(url).searchParams.get("v");
      document.querySelector("#vidModal").classList.remove("hidden");
      document.querySelector(
        "#video"
      ).src = `https://www.youtube.com/embed/${videoId}`;
      window.scrollTo(0, 0);
    });
  });

  document.getElementById("skeleton-cards").classList.add("hidden");
}

// Search Input logic
const fetchSearchAndDisplay = debounce((searchQuery) => {
  fuzzySearch.innerHTML = "";

  const results = videoData.filter((vid) =>
    vid.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  results.forEach((vid) => {
    const markup = `
      <div url="${vid.URL}" class="flex gap-4 cursor-pointer video-search-card">
        <div class="flex flex-col justify-center items-center p-2 w-40">
          <img width="150" src="${vid.thumbnail}" alt="${vid.title}" />
        </div>
        <div class="flex flex-col justify-center items-center py-2">
          <h5 class="mb-2 texl-sm md:text-2xl font-bold tracking-tight capitalize text-gray-900 dark:text-white">
            ${vid.title}
          </h5>
          <p class="mb-2 texl-sm tracking-tight capitalize text-gray-600 dark:text-white">
            Duration: ${vid.duration} sec
          </p>
        </div>
      </div>
    `;
    fuzzySearch.insertAdjacentHTML("beforeend", markup);
  });

  document.querySelectorAll(".video-search-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const url = card.getAttribute("url");
      const videoId = new URL(url).searchParams.get("v");
      document.querySelector("#vidModal").classList.remove("hidden");
      document.querySelector(
        "#video"
      ).src = `https://www.youtube.com/embed/${videoId}`;
      window.scrollTo(0, 0);
    });
  });
}, 500);

searchInput.addEventListener("focus", () => {
  searchSection.classList.add("absolute", "bg-black/40");
  fuzzySearch.classList.remove("hidden");
  closeSearch.classList.remove("hidden");
});

searchInput.addEventListener("input", (e) => {
  if (e.target.value) {
    fetchSearchAndDisplay(e.target.value);
  }
});

closeSearch.onclick = () => {
  searchSection.classList.remove("absolute", "bg-black/40");
  fuzzySearch.classList.add("hidden");
  closeSearch.classList.add("hidden");
};

// Pagination
document.getElementById("next-page").onclick = () => {
  if (start + pageSize < videoData.length) {
    start += pageSize;
    fetchVideo(start);
  }
};

document.getElementById("previous-page").onclick = () => {
  if (start >= pageSize) {
    start -= pageSize;
    fetchVideo(start);
  }
};

// Close modal
modalClose.onclick = () => {
  document.querySelector("#vidModal").classList.add("hidden");
  document.querySelector("#video").src = "";
};

// Debounce function
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
