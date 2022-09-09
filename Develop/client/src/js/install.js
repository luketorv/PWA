
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const ev = window.deferredPrompt;
    if (ev) {
        ev.prompt();
        window.deferredPrompt = null;
        butInstall.classList.toggle('hidden', true);
    } else {
        return;
    }
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});