// Add future portfolio pages here in the order the arrows should cycle through them.
const portfolioIndexes = [
    { file: "index.html", label: "Main portfolio" },
    { file: "indexv2.html", label: "Terminal portfolio" }
];

const pathSegments = window.location.pathname.split("/");
const lastPathSegment = pathSegments[pathSegments.length - 1];
const currentFile = /\.html?$/i.test(lastPathSegment)
    ? decodeURIComponent(lastPathSegment).toLowerCase()
    : "index.html";
const currentIndex = portfolioIndexes.findIndex((index) => index.file.toLowerCase() === currentFile);
const timeMachine = document.querySelector(".time-machine");
const position = timeMachine?.querySelector("[data-time-machine-position]");
const previousButton = timeMachine?.querySelector('[data-time-machine="previous"]');
const nextButton = timeMachine?.querySelector('[data-time-machine="next"]');
const portfolioDirectory = new URL(".", document.currentScript.src);

if (timeMachine && position && previousButton && nextButton && currentIndex !== -1) {
    position.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(portfolioIndexes.length).padStart(2, "0")}`;
    timeMachine.setAttribute("aria-label", `Portfolio version navigation. Current page: ${portfolioIndexes[currentIndex].label}`);

    previousButton.addEventListener("click", () => {
        const previousIndex = (currentIndex - 1 + portfolioIndexes.length) % portfolioIndexes.length;
        window.location.href = new URL(portfolioIndexes[previousIndex].file, portfolioDirectory).href;
    });

    nextButton.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % portfolioIndexes.length;
        window.location.href = new URL(portfolioIndexes[nextIndex].file, portfolioDirectory).href;
    });
}
