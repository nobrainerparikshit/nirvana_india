const chapters = [
  {
    city: "Vadodara",
    main: true,
    point: [22.3072, 73.1812],
    heads: [
      [
        "Shubhranshu Jha",
        "https://www.linkedin.com/in/shubhranshu-jha-2a942b322/",
      ],
      ["Parikshitsinh Jadeja", "https://www.linkedin.com/in/parikshitsinh/"],
      ["Shubh Menon", "https://www.linkedin.com/in/shubh-menon/"],
    ],
  },
  {
    city: "Delhi",
    point: [28.6139, 77.209],
    heads: [["Tanjot Singh", "https://www.linkedin.com/in/tanjotsingh27/"]],
  },
  {
    city: "Mumbai",
    point: [19.076, 72.8777],
    heads: [
      ["Saher Sakhpara", "https://www.linkedin.com/in/sahersakhpara/"],
      ["Rishav Jha", "https://www.linkedin.com/in/rishav-jha-a81a3238a/"],
    ],
  },
  {
    city: "Chhatrapati Sambhajinagar",
    point: [19.8762, 75.3433],
    heads: [
      ["Rudra Suryavanshi", "https://www.linkedin.com/in/rudrasuryavanshi/"],
    ],
  },
];
const status = document.querySelector("#map-status");
if (!window.L) {
  status.textContent =
    "The map could not load. All chapter details and LinkedIn links are available below.";
  document
    .querySelectorAll(".chapter-locate,#reset-map")
    .forEach((b) => (b.hidden = true));
} else {
  const map = L.map("chapter-map", {
    scrollWheelZoom: false,
    minZoom: 3,
    maxZoom: 12,
  }).setView([22.8, 79], 4);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  status.textContent =
    "Drag to explore · Use + / − to zoom · Select a marker for chapter details";
  tiles.on("tileerror", () => {
    status.textContent =
      "Some map tiles could not load. City markers and the chapter directory remain available.";
  });
  const markers = chapters.map((c, i) => {
    const marker = L.marker(c.point, {
      title: c.city + " chapter",
      alt: c.city + " chapter",
      keyboard: true,
      icon: L.divIcon({
        className: "chapter-marker",
        html: "<span>" + String(i + 1).padStart(2, "0") + "</span>",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      }),
    }).addTo(map);
    marker.bindPopup(
      '<span class="section-label">' +
        (c.main ? "MAIN CHAPTER" : "PROJECT NIRVANA CHAPTER") +
        "</span><h3>" +
        c.city +
        "</h3><p>Led by " +
        c.heads.map((h) => h[0]).join(" and ") +
        ".</p>" +
        c.heads
          .map(
            (h) =>
              '<a href="' +
              h[1] +
              '" target="_blank" rel="noopener noreferrer">' +
              h[0] +
              " · LinkedIn ↗</a>",
          )
          .join(""),
      { maxWidth: 280, closeButton: true, autoPan: true },
    );
    marker.on("mouseover", () => marker.openPopup());
    marker.getElement().addEventListener("focus", () => marker.openPopup());
    marker.on("popupopen", () => {
      document
        .querySelectorAll(".chapter-card")
        .forEach((card, j) => card.classList.toggle("selected", i === j));
    });
    return marker;
  });
  document.querySelectorAll(".chapter-locate").forEach((b) =>
    b.addEventListener("click", () => {
      const i = Number(b.dataset.chapter);
      map.setView(chapters[i].point, 7, { animate: false });
      markers[i].openPopup();
      document
        .querySelector("#chapter-map")
        .scrollIntoView({ block: "center", behavior: "auto" });
    }),
  );
  document.querySelector("#reset-map").addEventListener("click", () => {
    map.closePopup();
    map.setView([22.8, 79], 4);
    document
      .querySelectorAll(".chapter-card")
      .forEach((c) => c.classList.remove("selected"));
  });
  map.getContainer().addEventListener("keydown", (e) => {
    if (e.key === "Escape") map.closePopup();
  });
}
