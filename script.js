const SERVICE_WORKER_PATH = location.hostname === 'regbadminton.github.io' ? '/reservations/sw.js' : '/sw.js'
const button = document.createElement('a')
let deferredPrompt
let prompted = false
const url  = "https://cityofsurrey.perfectmind.com/23615/Store/BookMe4BookingPages/BookingCoursesPage?calendarId=052dfbe4-1178-4a47-afa6-5f2eb6aae9e3&widgetId=b4059e75-9755-401f-a7b5-d7c75361420d"

const promptUser = async e => {
    e.preventDefault()
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
        window.location = url
    } 
}

const convertPromptButton = () => {
    if (prompted) return
    button.textContent = 'Install App'
    button.addEventListener('click', promptUser)
    prompted = true
}

const registerServiceWorker = async () => {
    await navigator.serviceWorker.register(SERVICE_WORKER_PATH)
}

addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    deferredPrompt = e
    convertPromptButton()
})

if ('serviceWorker' in navigator) {
    button.textContent = 'Open App'
    document.title = 'Open App'
    button.href = './reservations.html'
    document.body.appendChild(button)

    registerServiceWorker()
}
else {
    alert('Sorry your browser is not compatible with this application.')
    window.location = url
}
