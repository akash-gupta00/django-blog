const API_URL = "https://3-215-236-156.sslip.io";

let token = "";

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/api/token/`, {
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

    if (response.ok) {
        token = data.access;
        alert("Login Successful");
    } else {
        alert("Login Failed");
        console.log(data);
    }
}

async function loadPosts() {
    const response = await fetch(`${API_URL}/posts/`);

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

    const response = await fetch(`${API_URL}/posts/`, {
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

    if (response.ok) {
        alert("Post Added Successfully");
        loadPosts();
    } else {
        alert("Failed to Add Post");
    }
}

window.onload = function () {
    if (document.getElementById("posts")) {
        loadPosts();
    }
};