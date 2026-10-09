// Add future portfolio pages here in the order the arrows should cycle through them.
const portfolioIndexes = [
    { file: "index.html", label: "Main portfolio" },
    { file: "indexv2.html", label: "Terminal portfolio" }
];

const currentFile = decodeURIComponent(window.location.pathname.split("/").pop()).toLowerCase();
const currentIndex = portfolioIndexes.findIndex((index) => index.file.toLowerCase() === currentFile);
const timeMachine = document.querySelector(".time-machine");

if (timeMachine && currentIndex !== -1) {
    const position = timeMachine.querySelector("[data-time-machine-position]");
    const previousButton = timeMachine.querySelector('[data-time-machine="previous"]');
    const nextButton = timeMachine.querySelector('[data-time-machine="next"]');

    position.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(portfolioIndexes.length).padStart(2, "0")}`;
    timeMachine.setAttribute("aria-label", `Portfolio version navigation. Current page: ${portfolioIndexes[currentIndex].label}`);

    previousButton.addEventListener("click", () => {
        const previousIndex = (currentIndex - 1 + portfolioIndexes.length) % portfolioIndexes.length;
        window.location.href = portfolioIndexes[previousIndex].file;
    });

    nextButton.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % portfolioIndexes.length;
        window.location.href = portfolioIndexes[nextIndex].file;
    });
}
