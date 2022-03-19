// Dom elements
const figure = document.querySelector('.video__figure')
const videoTitle = document.querySelector('.video__title')
const video = document.querySelector('video')
const progressBar = document.querySelector('.video__progress__bar')
const barInProgress = document.querySelector('.video__bar__in__progress')
const playBtnInFrame = document.querySelector('.play__btn__in__frame')
const resolutions = document.querySelector('.resolutions')
const resolutionsInPixel = document.querySelector('.resolution__in__px')

const controls = document.querySelector('.controls')
const volumeBtn = document.querySelector('.volume__btn')
const durationText = document.querySelector('.duration__text')
const counter = document.querySelector('.counter')
const playBtn = document.querySelector('.play__btn')
const prevBtn = document.querySelector('.prev__btn')
const nextBtn = document.querySelector('.next__btn')
const resolutionBtn = document.querySelector('.resolution__btn')
const fullScreenBtn = document.querySelector('.fullscreen__btn')
const repeatBtn = document.querySelector('.repeat__btn')

// I tags
const iPlayEl = playBtn.querySelector('i')
const iPInF = playBtnInFrame.querySelector('i')
const iTick = document.createElement('i')
const iVol = volumeBtn.querySelector('i')

// Var
let timer
let videoIndex = 0
let isRepeat = true

// Datas
const videos = [
  { id: 5, title: "Our satellite", path: "video/moon.mp4#t=0" }
]

// Functions
function loadVideo(vid) {
  video.src = vid.path
}

function play() {
  timer = setTimer()

  iPlayEl.classList.remove('fa-play')
  iPlayEl.classList.add('fa-pause')

  video.play()
}

function pause() {
  clearInterval(timer)

  iPlayEl.classList.add('fa-play')
  iPlayEl.classList.remove('fa-pause')

  video.pause()
}

function prevVideo() {
  videoIndex--

  if(videoIndex < 0) videoIndex = videos.length - 1

  loadVideo(videos[videoIndex])
  play()
}

function nextVideo() {
  videoIndex++

  if(videoIndex > videos.length - 1) videoIndex = 0

  loadVideo(videos[videoIndex])
  play()
}

function muted() {
  iVol.classList.remove('fa-volume-high')
  iVol.classList.add('fa-volume-xmark')
  video.muted = true
}

function unMuted() {
  iVol.classList.add('fa-volume-high')
  iVol.classList.remove('fa-volume-xmark')
  video.muted = false
}

function setProgress(e) {
  const width = this.clientWidth;
  const clicktX = e.offsetX;
  const duration = video.duration;
  video.currentTime = (clicktX / width) * duration;

  let temps = video.currentTime
  let minutes = parseInt(temps / 60)
  let secondes = parseInt(temps % 60)

  minutes = minutes < 10 ? "0" + minutes : minutes
  secondes = secondes < 10 ? "0" + secondes : secondes
  
  clearInterval(timer)
  play()
  counter.textContent = `/${minutes}:${secondes}`
}

function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100

  barInProgress.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  barInProgress.style.width = `${progressPercent}%`;
  barInProgress.style.height = "100%";
}

function handleKeydown() {
  if(iPlayEl.classList.contains('fa-play')) {
    play()

    playBtnInFrame.style.visibility = 'visible'
    iPInF.classList.add('fa-play')

    setTimeout(() => {
      iPInF.classList.remove('fa-play')
      playBtnInFrame.style.visibility = ''
    }, 400)
  } else {
    pause()

    playBtnInFrame.style.visibility = 'visible'
    iPInF.classList.add('fa-pause')

    setTimeout(() => {
      iPInF.classList.remove('fa-pause')
      playBtnInFrame.style.visibility = ''
    }, 400)
  }
}

// Events
document.onreadystatechange = () => {
  let duration = video.duration / 60
  let temps = duration * 60

  let minutes = parseInt(temps / 60)
  let secondes = parseInt(temps % 60)

  minutes = minutes < 10 ? "0" + minutes : minutes
  secondes = secondes < 10 ? "0" + secondes : secondes
  
  durationText.textContent = `${minutes}:${secondes}`
}

document.addEventListener('DOMContentLoaded', () => {
  loadVideo(videos[videoIndex])

  iTick.classList.add('fa-solid')
  iTick.classList.add('fa-check')

  prevBtn.addEventListener('click', prevVideo)
  nextBtn.addEventListener('click', nextVideo)
  progressBar.addEventListener('click', setProgress)
  video.addEventListener('timeupdate', updateProgressBar);
  video.addEventListener('click', () => handleKeydown())
  document.addEventListener('keydown', (e) => e.code === "Space" && handleKeydown())

  video.onended = () => {
    clearInterval(timer)
    iPlayEl.classList.add('fa-play')
    iPlayEl.classList.remove('fa-pause')
    counter.textContent = ''
  }

  playBtn.addEventListener('click', () => {    
    iPlayEl.classList.contains('fa-play') ?
    play() :
    pause()
  })

  volumeBtn.addEventListener('click', () => {
    iVol.classList.contains('fa-volume-high') ? 
    muted() :
    unMuted()
  })

  controls.addEventListener('mouseover', () => {
    resolutionsInPixel.textContent = `${video.videoHeight}p`;
  })

  figure.addEventListener('mouseover', () => {
    progressBar.classList.add('visible')
    videoTitle.textContent = videos[videoIndex].title
  })

  figure.addEventListener('mouseleave', () => {
    progressBar.classList.remove('visible')
    videoTitle.textContent = ''
  })

  resolutionBtn.addEventListener('click', () => {
    resolutions.classList.toggle('active')
  })  

  fullScreenBtn.addEventListener('click', () => {
    video.requestFullscreen && video.requestFullscreen()
  })

  repeatBtn.addEventListener('click', () => {
    if(isRepeat) {
      video.loop = true
      isRepeat = false
      repeatBtn.style.color = 'blueviolet'
    } else {
      video.loop = false
      isRepeat = true
      repeatBtn.style.color = ''
    }
  })
})

function setTimer() {
  let duration = video.duration / 60
  let timeInSeconds = duration * 60
  let currentVidTime = video.currentTime

  return setInterval(() => {
    let minutes = parseInt(currentVidTime / 60, 10)
    let secondes = parseInt(currentVidTime % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    counter.textContent = `/${minutes}:${secondes}`

    currentVidTime = currentVidTime >= timeInSeconds ? 0 : currentVidTime + 1
  }, 1000)
}
