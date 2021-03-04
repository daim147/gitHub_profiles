const APIURL = 'https://api.github.com/users/'

const main = document.getElementById("main")
const form = document.getElementById("form")
const search = document.getElementById("search")

async function getUser(username){
    try{
        const {data} = await axios(APIURL + username)
        createUser(data)
        getRepos(username)
    }catch(err){
        if(err.response.status == 404){
            console.log(err)
            createErrorCard("No Profile with this username")
        }
       
    }

}
async function getRepos(username){
    try{
        const {data} = await axios(APIURL + username+ "/repos?sort=created")
        createRepos(data)
    }catch(err){
        if(err.response.status == 404){
            console.log(err)
            createErrorCard("No Repo found")
        }
       
    }

}

function createUser(user){
    main.innerHTML = ''
    const cardHtml = `
    <div class="card">
    <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos">
        </div>
    </div>
  
</div> 
`
 main.innerHTML = cardHtml
}

function createRepos(repos){
 const reposEl = document.getElementById("repos")

    repos.forEach(repo => {
        const repoLink = document.createElement('a')
        repoLink.classList.add("repos")
        repoLink.innerText = `${repo.name}`
        repoLink.href = `${repo.html_url}`
        repoLink.target = '_blank'
        reposEl.appendChild(repoLink)
    });
}


 function createErrorCard(msg){
    const cardHtml = `
    <div class="card">
    <h1>${msg}</h1>
    </div>
    
    `
    main.innerHTML = cardHtml
}

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const user = search.value
    if(user && user !== ''){
        getUser(user)
        search.value = ''
    }
})





// const res = await fetch(APIURL + username)
// const resdata = await res.json()
// console.log(resdata)