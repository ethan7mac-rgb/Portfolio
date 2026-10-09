let command = "";
function main() {
    let terminalInput = document.querySelector('.terminal-input');

    if (!terminalInput) return;
    terminalInput.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter') {
            return;
        }
        command = terminalInput.value.trim();
        if (!command) {
            return;
        }
        commands();
        console.log(command);
        terminalInput.value = '';
    });
}
document.addEventListener('DOMContentLoaded', main);

function commands(){
    switch (command) {
        case 'rm -rf /*':
            let main = document.querySelector(".terminal-body");
            main.innerHTML = '<div class="command-line"><span class="prompt"><span>ethan</span>@portfolio</span><span class="path">:~$</span><span></span><span>ERROR PORTFOLIO NOT FOUND</span></div>';
            break;
    
        default:
            break;
    }
}