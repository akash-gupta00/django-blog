let token = "";

async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    token = data.access;

    alert("Login Successful");
}

async function loadPosts() {

    const response = await fetch("http://127.0.0.1:8000/posts/");

    const posts = await response.json();

    let html = "";

    posts.forEach(post => {

        html += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            </div>
        `;
    });

    document.getElementById("posts").innerHTML = html;
}

async function addPost() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch("http://127.0.0.1:8000/posts/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title,
            content
        })
    });

    if(response.ok){
        alert("Post Added");
        loadPosts();
    }
}