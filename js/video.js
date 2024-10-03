// Create a load catagories

const loadCatagories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json()
    displayCatagories(data.categories)
}

const displayRemoveColor=()=>{
    const removeColors=document.getElementsByClassName('btn-category')
    for(let removeColor of removeColors){
        removeColor.classList.remove('active')
    }
}

const loadCatagoriesVideos =(id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
    .then(data=>{
        displayRemoveColor()
        const btnActive=document.getElementById(`btn-${id}`)
        console.log(btnActive)
        btnActive.classList.add("active")
        displayVideos(data.category)
    })
}

const videoDetails=(videoId)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then(res=>res.json())
    .then(data=>displayDetails(data.video))
}

const displayDetails=(video)=>{
    const modalContainer=document.getElementById('modal-container')
    modalContainer.innerHTML=`
     <img class='w-full h-full' src="${video.thumbnail}" alt="">
     <p class='text-xs text-black font-medium'>${video.description}</p>
    `

    document.getElementById('my_modal_1').showModal()
}

// Create a display
const displayCatagories = (categories) => {
    const categoriesButton = document.getElementById('categories-button')
    categories.map((item) => {
        // Create a button
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCatagoriesVideos(${item.category_id})" class='btn btn-category'>${item.category}</button>
        `
        categoriesButton.appendChild(buttonContainer)
    })
}

// Create load a videos
const loadVideos = async (search='') => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
        const data = await res.json()
        displayVideos(data.videos)
    }
    catch (error) {
        console.log('Error:', error)
    }
}

// Create function in time manage
function getTime(time) {
    // const day=parseInt(time/86400)
    const hour = parseInt(time / 3600)
    const second = time % 3600
    const min = parseInt(second / 60)
    const remainingSecond = min % 60
    return `${hour} hour ${min} mint ${remainingSecond} second`
}

// Create a display videos

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    videosContainer.innerHTML = ''
    if (videos.length === 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
         <div class="flex flex-col items-center justify-center">
        <div>
            <img src="./Icon.png" alt="">
        </div>
        <h3 class="font-bold text-3xl">Oops!! Sorry, There is no content here</h3>
    </div>
        `
    }
    else{
        videosContainer.classList.add('grid')
    }
    videos.map((video) => {
        const card = document.createElement('div')
        card.classList = ('card card-compact')
        card.innerHTML = `
         <figure class="h-[200px] relative">
                <img class='rounded-md h-full w-full object-cover' src=${video.thumbnail}
                    alt="Shoes" />
                ${video.others.posted_date?.length === 0 ? '' : `<span class="absolute right-2 bottom-2 bg-black rounded-lg text-white p-2 text-xs">${getTime(video.others['posted_date'])}</span>`}
            </figure>
            <div class="py-2 flex gap-2">
                <div class="w-10 h-10">
                <img class="rounded-full object-cover w-full h-full" src="${video.authors[0].profile_picture}" alt="">
                </div>
                <div>
                <h2 class="card-title">${video.title}</h2>
                <p class="flex gap-1 items-center">
                <span class="text-gray-500 text-xs">${video.authors[0].profile_name}</span>
                <span>${video.authors[0].verified === true ? '<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">' : ""}</span>
                </p >
                <p class="text-gray-500 text-xs">${video.others.views} views</p>
                </div >
            </div >
            <p><button onclick="videoDetails('${video.video_id}')" class='btn btn-error text-xs btn-sm text-gray-50'>Details</button></p>
    `
        videosContainer.append(card)
    })
}

document.getElementById('search').addEventListener('keyup',(event)=>{
    loadVideos(event.target.value)
})
// Function loading
loadCatagories();
loadVideos();