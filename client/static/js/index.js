
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

    postContainer.append(postParent);
}

getAllPosts();