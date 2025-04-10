const modalClose = document.querySelector("#modal-close");

// Show video and modal logic
let start = 0;
function fetchVideo(start) {
  // show loading
  document.getElementById("skeleton-cards").classList.remove("hidden");

  fetch("/videos.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((vid) => {
        const markup = `
          <div url="${vid.URL}" class="video-card w-[80vw] md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
              <div>
                  <img url="${vid.URL}" class="rounded-t-lg w-full" src="${vid.thumbnailss}" alt="${vid.title}" />
              </div>
              <div class="p-5">
                  <div url="${vid.URL}">
                      <h5 url="${vid.URL}" class="mb-2 text-2xl font-bold tracking-tight capitalize text-gray-900 dark:text-white">
                          ${vid.title}
                      </h5>
                  </div>
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

      // hide skeleton loading
      document.getElementById("skeleton-cards").classList.add("hidden");

      // Add click listeners AFTER cards are rendered
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
    });
}

fetchVideo(start);

// close video modal
modalClose.onclick = () => {
  document.querySelector("#vidModal").classList.add("hidden");
  document.querySelector("#video").src = "";
};
