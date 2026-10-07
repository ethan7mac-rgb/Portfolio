const defaultEras = [
    ["modern", "Modern"],
    ["terminal", "Terminal"],
];

const eraButtons = Array.from(document.querySelectorAll("[data-set-era]"));
const eras = eraButtons.length
    ? Array.from(new Map(
        eraButtons
            .filter((button) => button.dataset.setEra)
            .map((button) => [
                button.dataset.setEra,
                button.dataset.eraLabel || button.dataset.setEra,
            ]),
      ).entries())
    : defaultEras;
const currentEraLabel = document.querySelector("[data-era-current]");
const eraCount = document.querySelector("[data-era-count]");

function setEra(era) {
    const eraIndex = eras.findIndex(([value]) => value === era);
    if (eraIndex === -1) {
        throw new Error(`Unsupported design era: ${era}`);
    }

    document.body.dataset.era = era;
    eraButtons.forEach((button) => {
        const isActive = button.dataset.setEra === era;
        button.setAttribute("aria-pressed", String(isActive));
        button.classList.toggle("is-active", isActive);
    });
    if (currentEraLabel) {
        currentEraLabel.textContent = eras[eraIndex][1];
    }
    if (eraCount) {
        eraCount.textContent = `${String(eraIndex + 1).padStart(2, "0")} / ${String(eras.length).padStart(2, "0")}`;
    }

    try {
        localStorage.setItem("portfolio-era", era);
    } catch {
        // The selected era still works when browser storage is unavailable.
    }
}

eraButtons.forEach((button) => {
    button.addEventListener("click", () => setEra(button.dataset.setEra));
});

document.querySelectorAll("[data-era-step]").forEach((button) => {
    button.addEventListener("click", () => {
        const currentIndex = eras.findIndex(([era]) => era === document.body.dataset.era);
        const direction = Number(button.dataset.eraStep);
        const nextIndex = (currentIndex + direction + eras.length) % eras.length;
        setEra(eras[nextIndex][0]);
    });
});

try {
    const savedEra = localStorage.getItem("portfolio-era");
    if (eras.some(([era]) => era === savedEra)) {
        setEra(savedEra);
    } else {
        setEra(document.body.dataset.era || eras[0][0]);
    }
} catch {
    setEra(document.body.dataset.era || eras[0][0]);
}
