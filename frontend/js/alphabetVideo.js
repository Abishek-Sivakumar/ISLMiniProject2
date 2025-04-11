const card = document.querySelectorAll("#card");

// Show video and modal logic
let start = 0;
function fetchVideo(start) {
  // start loading
  document.getElementById("skeleton-cards").classList.remove("hidden");

  // Fetch data from local videos.json
  fetch("/app/alphabetSong/videos.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((vid) => {
        const markup = `
                <div id="card" url=${vid.URL} class="w-[80vw] md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                    <div>
                        <img url=${vid.URL} class="rounded-t-lg w-full" src=${vid.thumbnail} alt=${vid.title} />
                    </div>
                    <div class="p-5">
                        <div url=${vid.URL}>
                            <h5 url=${vid.URL} class="mb-2 text-2xl font-bold tracking-tight capitalize text-gray-900 dark:text-white">
                                ${vid.title}
                            </h5>
                        </div>
                        <p url=${vid.URL} class="mb-3 font-semi-bold text-gray-700 dark:text-gray-400">
                            ${vid.duration} sec
                        </p>
                    </div>
                </div>
                `;
        document
          .getElementById("paginated-video")
          .insertAdjacentHTML("beforeend", markup);

        // hide skeleton loading
        document.getElementById("skeleton-cards").classList.add("hidden");
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const modalClose = document.querySelector("#modal-close");
  if (modalClose) {
    modalClose.onclick = () => {
      document.querySelector("#vidModal").classList.add("hidden");
      document.querySelector("#video").src = "";
    };
  }
  fetchVideo(start);
});
