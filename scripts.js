var lastPost = "";
var queued = false;
var sorting = decodeURIComponent(window.location.hash.slice(1)).split("?");

function evalPost(postData) {
    var link = document.createElement("a");
    link.href = "https://reddit.com" + postData.permalink;
    if(postData.url != "https://i.redd.it/n1oie6joe0vx.jpg") {
        if(postData.url.startsWith("https://v.redd.it/")) {
            var video = document.createElement("video");
            video.autoplay = "true";
            video.muted = "true";
            video.loop = "true";
            video.playsinline = "true";
            video.src = postData.media.reddit_video.fallback_url + 'mp4';
            link.appendChild(video);

        } else {
            var img = document.createElement("img");
            img.src = postData.url;
            img.alt = postData.title;
            link.appendChild(img);
        }
        lastPost = postData.name;
        document.getElementById("container").appendChild(link);
    }
} 

function createPosts(sort, time) {
    if(time != undefined) {
        reddit[sort]("upvoteexeggutor").t(time).limit(20).after(lastPost).fetch(function (res) { //suprisingly it does not care if you provide an empty string as last post
            for (var i = 0; i < res.data.children.length; i++) {
                evalPost(res.data.children[i].data);
            }
            queued = false;
        });
    } else {
        reddit[sort]("upvoteexeggutor").limit(20).after(lastPost).fetch(function (res) {
            for (var i = 0; i < res.data.children.length; i++) {
                evalPost(res.data.children[i].data);
            }
            queued = false;
        });
    }
}

function morePosts() {
    if(sorting[0] != "") {
        if(sorting[0] === "controversial" || sorting[0] === "top") {
            document.getElementById("time").style.display = "revert";
            if(sorting[1] != undefined) {
                createPosts(sorting[0], sorting[1]);
            } else {
                createPosts(sorting[0], document.getElementById("timeSelect").value);
            }
        } else {
            createPosts(sorting[0]);
        }
    } else {
        createPosts(document.getElementById("sort").value);
    }
}

(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    morePosts();
    Math.max(document.body.offsetHeight - (window.pageYOffset + window.innerHeight), 0);
    window.addEventListener("scroll",function(){
        if((Math.max(document.body.offsetHeight - (window.pageYOffset + window.innerHeight), 0) < 5000) && queued === false) {
            morePosts();
            queued = true;
        }
    });
})();

function chooseSort() {
    window.location.hash = document.getElementById("sort").value;
    location.reload();
}

function chooseTime() {
    window.location.hash = document.getElementById("sort").value + "?" + document.getElementById("timeSelect").value;
    location.reload();
}