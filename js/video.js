// Create a load catagories

const loadCatagories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json()
    displayCatagories(data.categories)
}

// Create a display
const displayCatagories = (categories) => {
    const categoriesButton = document.getElementById('categories-button')
    categories.map((item) => {
        // Create a button
        const button = document.createElement('button')
        button.classList = 'btn'
        button.innerText = item.category
        categoriesButton.appendChild(button)
    })
}

// Create load a videos
const loadVideos = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        const data = await res.json()
        displayVideos(data.videos)
    }
    catch (error) {
        console.log('Error:', error)
    }
}

// Create a display videos

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos')
    videos.map((video) => {
        const card = document.createElement('div')
        card.classList = ('card card-compact')
        // const card={
        //     "category_id": "1001",
        //     "video_id": "aaaa",
        //     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
        //     "title": "Shape of You",
        //     "authors": [
        //         {
        //             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
        //             "profile_name": "Olivia Mitchell",
        //             "verified": ""
        //         }
        //     ],
        //     "others": {
        //         "views": "100K",
        //         "posted_date": "16278"
        //     },
        //     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
        // }
        card.innerHTML = `
         <figure class="h-[200px] relative">
                <img class='rounded-md h-full w-full object-cover' src=${video.thumbnail}
                    alt="Shoes" />
                <span class="absolute right-2 bottom-2 bg-black rounded-lg text-white p-2">${video.others['posted_date']}</span>
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
    `
        videosContainer.append(card)
    })
}

// Function loading
loadCatagories();
loadVideos();