

const publishButton = document.querySelector("#newPostForm");
publishButton.addEventListener("submit", (e) => newPost(e));


async function getAllPosts(){
    let posts = await fetch("http://localhost:3000/posts");
    let postData = await posts.json();
    console.log(postData.length);
    for (let index = 0; index< postData.length; index++){
        data = postData[index];
        renderPost(data);
    }

}


function renderPost(data){
    const {title, name, body}=data;
    let postParent = document.createElement('div');
    let postTitle = document.createElement("h2");
    let postName = document.createElement('p');
    let postBody = document.createElement('p');

    postTitle.textContent = title;
    postName.textContent= name;
    postBody.textContent=body;

    postTitle.setAttribute('class', "postTitle");
    postName.setAttribute('class', "postName");
    postBody.setAttribute('class', "postBody");

    postParent.append(postTitle,postName,postBody);

    let postContainer = document.querySelector("#postContainer");

    postContainer.prepend(postParent);
}

// getAllPosts();


async function newPost(e){
    e.preventDefault()
    console.log(e.target.title.value);
    let newTitle = e.target.title.value;
    let newName = e.target.name.value;
    let newBody = e.target.story.value;

    let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title:newTitle, name:newName, body: newBody})
    }
    let response = await fetch("http://localhost:3000/posts",options)

    const { id, err } = await response.json();

    console.log(id)

    document.querySelector("#title").value="";
    document.querySelector("#name").value="";
    document.querySelector("#story").value="";
    
    getPostById(id);

}

async function getPostById(id){
    let response = await fetch(`http://localhost:3000/posts/${id}`)
    let post = await response.json();
    console.log(post);
    let newPostForm = document.querySelector("#newPostForm")
    newPostForm.style.display = "none";
    renderPost(post)
}