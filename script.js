const loadData = async () => {
    showSpinner("spinner", true);

    await new Promise(resolve => setTimeout(resolve, 2000)); /* Showing data after 2 seconds */

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const info = data.posts;
    showData(info)

}

/* Showing all the post to the website */
const showData = (data) => {

    const showPostArea = document.getElementById("show-post");

    data.map(info => {
        const { category, image, title, author, description, comment_count, view_count, posted_time, isActive } = info;

        let bgcolor = '';

        if (!isActive) {
            bgcolor = 'bg-red-500';
        }
        else {
            bgcolor = 'bg-green-500'
        }

        const postCard = document.createElement("div");

        postCard.classList = "hero bg-[#7D7DFC] bg-opacity-10 rounded-xl p-2 mt-4";

        postCard.innerHTML = `

                    <div class="hero-content flex-col lg:flex-row gap-6 lg:gap-12 w-full">
                            <div class="indicator ">
                                <span class="indicator-item badge ${bgcolor}"></span>
                                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${image}" alt=""></div>
                            </div>

                            <div class="space-y-4 w-3/4">
                                <div class="flex gap-6">
                                    <p><span>#</span>${category}</p>
                                    <p><span>Author :</span> ${author.name}</p>
                                </div>
                                <h1 class="text-xl font-bold">${title}</h1>
                                <p class="">${description}</p>

                                <hr style="border-top: 2px dashed gainsboro">

                                <div class="flex justify-between">
                                    <div class="flex gap-4">
                                        <img src="./images/Group 13.png" alt="">
                                        <p>${comment_count}</p>
                                        <img src="./images/tabler-icon-eye.png" alt="">
                                        <p>${view_count}</p>
                                        <img src="./images/tabler-icon-clock-hour-9.png" alt="">
                                        <p><span>${posted_time}</span> min</p> <!-- posted time -->
                                    </div>

                                    <div onclick='handleTitleAdd("${title.replace(/'/g, '-')}", ${view_count})' class="cursor-pointer">
                                        <img src="./images/Group 40106.png" alt="" >
                                    </div>
                                </div>
                            </div>

                        </div>
        
        `

        showPostArea.appendChild(postCard);
    })

    showSpinner("spinner", false);
}



/* Showing marked posts */

let count = 0;
const handleTitleAdd = (title, view_count) => {

    const markedReadPost = document.getElementById("marked-red-posts");

    const markedPostCount = document.getElementById("marked-post-count");

    const posts = document.createElement("div");

    posts.classList = "bg-white rounded-lg flex justify-between p-4 mt-6";

    posts.innerHTML = `
        <div>
            <p class="text-sm font-bold text-gray-600">${title}</p>
        </div>
        <div class="flex gap-2">
            <img class="size-6" src="./images/tabler-icon-eye.png" alt="">
            <p class="text-sm">${view_count}</p>
        </div>
    `

    count = count + 1;

    markedPostCount.innerText = count;

    markedReadPost.appendChild(posts);


}

/* Search functionality */

const handleSearchBtn = () => {
    const inputField = document.getElementById("search-input");
    const inputText = inputField.value;

    const showPostArea = document.getElementById("show-post");
    showPostArea.textContent = " ";

    loadSearchingData(inputText);
}

/* load and show searched information */

const loadSearchingData = async (data) => {
    
    showSpinner("spinner", true);

    await new Promise(resolve => setTimeout(resolve, 500)); /* Showing data after 2 seconds */

    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${data}`);
    const info = await res.json();
    const postInfo = info.posts;
    showSearchedData(postInfo)
}

const showSearchedData = (data) => {
    const showPostArea = document.getElementById("show-post");
    showPostArea.textContent = " ";


    data.map(info => {
        const { category, image, title, author, description, comment_count, view_count, posted_time, isActive } = info;

        let bgcolor = '';

        if (!isActive) {
            bgcolor = 'bg-red-500';
        }
        else {
            bgcolor = 'bg-green-500'
        }

        const postCard = document.createElement("div");

        postCard.classList = "hero bg-[#7D7DFC] bg-opacity-10 rounded-xl p-2 mt-4";

        postCard.innerHTML = `

                    <div class="hero-content flex-col lg:flex-row gap-6 lg:gap-12">
                            <div class="indicator ">
                                <span class="indicator-item badge ${bgcolor}"></span>
                                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${image}" alt=""></div>
                            </div>

                            <!-- Information -->
                            <div class="space-y-4 ">
                                <div class="flex gap-6">
                                    <p><span>#</span>${category}</p>
                                    <p><span>Author :</span> ${author.name}</p>
                                </div>
                                <h1 class="text-xl font-bold">${title}</h1>
                                <p class="">${description}</p>

                                <hr style="border-top: 2px dashed gainsboro">

                                <div class="flex justify-between">
                                    <div class="flex gap-4">
                                        <img src="./images/Group 13.png" alt="">
                                        <p>${comment_count}</p>
                                        <img src="./images/tabler-icon-eye.png" alt="">
                                        <p>${view_count}</p>
                                        <img src="./images/tabler-icon-clock-hour-9.png" alt="">
                                        <p><span>${posted_time}</span> min</p> <!-- posted time -->
                                    </div>

                                    <div onclick='handleTitleAdd("${title.replace(/'/g, '-')}", ${view_count})' class="cursor-pointer">
                                        <img src="./images/Group 40106.png" alt="">
                                    </div>
                                </div>
                            </div>

                        </div>
        
        `

        showPostArea.appendChild(postCard);
    })

    showSpinner("spinner", false);

}


/* Showing latest posts */

const loadLatestPost = async () => {

    showSpinner("spinner2", true);

    await new Promise(resolve => setTimeout(resolve, 2000)); /* Showing data after 2 seconds */
    
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const info = await res.json();
    showLatestPost(info);
}

const showLatestPost = (data) => {

    const showLatestPost = document.getElementById("show-latest-post");

    data.map(info => {
        const { cover_image, profile_image, title, description, author} = info;

        let postedDate = '';

        if(!author.posted_date){
             postedDate = 'No publish date';
        }
        else{
            postedDate = author.posted_date;
        }

        let postedDesignation = '';

        if(!author.designation){
            postedDesignation = 'Unknown';
        }
        else{
            postedDesignation = author.designation;
        }

        const cardDiv = document.createElement("div");

        cardDiv.classList = "card card-compact w-96 bg-base-100 shadow-xl space-y-6 p-6";

        cardDiv.innerHTML = `
                <figure><img src="${cover_image}"alt="" /></figure>
                                
                <div class="card-body space-y-2">
                    <div class="flex gap-4">
                        <img src="./images/calender.png" alt="">
                        <p>${postedDate}</p>
                    </div>
                    <h2 class="text-sm font-bold">${title}</h2>
                    <p>${description}</p>

                    <div class="card-actions flex gap-4">
                        <div class="avatar">
                            <div class="w-16 rounded-full">
                            <img src="${profile_image}" />
                            </div>
                        </div>

                        <div class="mt-2">
                            <h2 class="font-bold">${author.name}</h2>
                            <p>${postedDesignation}</p>
                        </div>

                    </div> <!-- card action -->
                </div>
        `

        showLatestPost.appendChild(cardDiv);

    })

    showSpinner("spinner2", false);

}


/* Spinner shows to while loading data */

const showSpinner = (id, isLoading) =>{
    const getSpinner =  document.getElementById(id);

    if(isLoading){
        getSpinner.classList.remove("hidden");

    }
    else{
        getSpinner.classList.add("hidden");

    }

}



loadData()
loadLatestPost()