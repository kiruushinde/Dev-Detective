const darkModeOn = document.querySelector('.dark-mode');
const input = document.getElementById('input');
const searchBtn = document.querySelector('.btn');
const avatar = document.querySelector('#avatar');
const nameTitle = document.querySelector(".nameTitle");
const dateJoined = document.querySelector(".date");
const username = document.querySelector(".username");
const tagline = document.querySelector(".tagline");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#follower");
const following = document.querySelector("#following");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const city = document.querySelector("#location");
const websiteurl = document.querySelector("#website");
const twitter = document.querySelector("#twitter");
const Company = document.querySelector("#company");
const content = document.querySelector('.content');
const notFound = document.querySelector(".notfound");
const url = "https://api.github.com/users/";


darkModeOn.addEventListener("click", function() {
    darkModeProperties();
});

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    // modetext.innerText = "LIGHT";
    // modeicon.src = "./assets/images/sun-icon.svg";
    // root.setProperty("--lm-icon-bg", "brightness(1000%)");
    // darkMode = true;
    // localStorage.setItem("dark-mode", true);
}

async function getUserData(gitUrl) {
    try {
        const response = await fetch(gitUrl);
        const data = await response.json();
        if (data.message === "Not Found") {
            content.classList.add("active");
            notFound.classList.add("active");
            console.log("profile not found..");
        } else {
            updateProfile(data);
        }
        // console.log("data fetched successfully");
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

function updateProfile(info) {

    notFound.classList.remove("active");
    content.classList.remove("active");

    if (info.message == "Not Found") {
        input.value = " ";
        notFound.classList.add("active");
        content.classList.add('active');
        console.log("profile not found");
        return;
    }
    avatar.src = `${info.avatar_url}`;
    nameTitle.innerText = `${info.name}`;
    dateSegments = info.created_at.split("T").shift().split("-");
    dateJoined.innerText = `Joined ${dateSegments[2]} ${months[dateSegments[1] - 1]} ${dateSegments[0]}`;
    username.innerText = `@${info.login}`;
    tagline.innerText = `${info.bio}`;
    repos.innerText = `${info.public_repos}`;
    followers.innerText = `${info.followers}`;
    following.innerText = `${info.following}`;
    city.innerText = `${info.location}`;
    // website.innerText = checkNull(info.blog, website) ? info.blog : "Not Available";
    // website.href = checkNull(info.blog, website) ? info.blog : "#";
    websiteurl.href = info.blog;
    const weburl = document.getElementById("weburl");
    weburl.innerHTML = `${info.blog}`;
    console.log("url is ", info.blog);

    if (info.twitter_username == null) {
        twitter.innerText = "Not available..";
    } else {
        twitter.innerText = `${info.twitter_username}`;
    }

    console.log("your company is ", info.company);
    if (info.company == null) {
        Company.innerText = "Not shared..";
    } else {
        Company.innerText = `${info.company}`;
    }
}

getUserData(url + "kiruushinde");

searchBtn.addEventListener('click', function() {
    console.log("button clicked.");
    if (input.value !== "") {
        getUserData(url + input.value);
    }
});

input.addEventListener(
    "keydown",
    function(e) {
        if (!e) {
            var e = window.event;
        }
        if (e.key == "Enter") {
            if (input.value !== "") {
                getUserData(url + input.value);
            }
        }
    },
    false
);