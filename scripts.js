var lastPost = "";
var queued = false;
function createPosts(sort) {
    if(lastPost != "") {
        reddit[sort]("upvoteexeggutor").limit(20).after(lastPost).fetch(function (res) {
            for (var i = 0; i < res.data.children.length; i++) {
                var link = document.createElement("a");
                link.href = "https://reddit.com" + res.data.children[i].data.permalink;
                if(res.data.children[i].data.url != "https://i.redd.it/n1oie6joe0vx.jpg") {
                    if(res.data.children[i].data.url.startsWith("https://v.redd.it/")) {
                        // console.log(res.data.children[i].data.media.reddit_video.fallback_url);
                        var video = document.createElement("video");
                        video.autoplay = "true";
                        video.muted = "true";
                        video.loop = "true";
                        video.playsinline = "true";
                        video.src = res.data.children[i].data.media.reddit_video.fallback_url + 'mp4';
                        link.appendChild(video);

                    } else {
                        var img = document.createElement("img");
                        img.src = res.data.children[i].data.url;
                        img.alt = res.data.children[i].data.title;
                        link.appendChild(img);
                    }
                    lastPost = res.data.children[i].data.name;
                    document.getElementById("container").appendChild(link);
                }
            }
            // console.log(lastPost);
            queued = false;
        });
    } else {
        reddit[sort]("upvoteexeggutor").limit(20).fetch(function (res) {
            for (var i = 0; i < res.data.children.length; i++) {
                var link = document.createElement("a");
                if(res.data.children[i].data.url != "https://i.redd.it/n1oie6joe0vx.jpg") {
                    link.href = "https://reddit.com" + res.data.children[i].data.permalink;
                    if(res.data.children[i].data.url.startsWith("https://v.redd.it/")) {
                        // console.log(res.data.children[i].data.media.reddit_video.fallback_url);
                        var video = document.createElement("video");
                        video.autoplay = "true";
                        video.muted = "true";
                        video.loop = "true";
                        video.playsinline = "true";
                        video.src = res.data.children[i].data.media.reddit_video.fallback_url + 'mp4';
                        link.appendChild(video);

                    } else {
                        var img = document.createElement("img");
                        img.src = res.data.children[i].data.url;
                        img.alt = res.data.children[i].data.title;
                        link.appendChild(img);
                    }
                    lastPost = res.data.children[i].data.name;
                    document.getElementById("container").appendChild(link);
                }
            }
            // console.log(lastPost);
            queued = false;
        });
    }
}
function createTopPosts(sort, time) {
    if(lastPost != "") {
        reddit[sort]("upvoteexeggutor").t(time).limit(20).after(lastPost).fetch(function (res) {
            for (var i = 0; i < res.data.children.length; i++) {
                var link = document.createElement("a");
                if(res.data.children[i].data.url != "https://i.redd.it/n1oie6joe0vx.jpg") {
                    link.href = "https://reddit.com" + res.data.children[i].data.permalink;
                    if(res.data.children[i].data.url.startsWith("https://v.redd.it/")) {
                        // console.log(res.data.children[i].data.media.reddit_video.fallback_url);
                        var video = document.createElement("video");
                        video.autoplay = "true";
                        video.muted = "true";
                        video.loop = "true";
                        video.playsinline = "true";
                        video.src = res.data.children[i].data.media.reddit_video.fallback_url + 'mp4';
                        link.appendChild(video);

                    } else {
                        var img = document.createElement("img");
                        img.src = res.data.children[i].data.url;
                        img.alt = res.data.children[i].data.title;
                        link.appendChild(img);
                    }
                    lastPost = res.data.children[i].data.name;
                    document.getElementById("container").appendChild(link);
                }
            }
            // console.log(lastPost);
            queued = false;
        });
    } else {
        reddit[sort]("upvoteexeggutor").t(time).limit(20).after(lastPost).fetch(function (res) {
            for (var i = 0; i < res.data.children.length; i++) {
                var link = document.createElement("a");
                if(res.data.children[i].data.url != "https://i.redd.it/n1oie6joe0vx.jpg") {
                    link.href = "https://reddit.com" + res.data.children[i].data.permalink;
                    if(res.data.children[i].data.url.startsWith("https://v.redd.it/")) {
                        // console.log(res.data.children[i].data.media.reddit_video.fallback_url);
                        var video = document.createElement("video");
                        video.autoplay = "true";
                        video.muted = "true";
                        video.loop = "true";
                        video.playsinline = "true";
                        video.src = res.data.children[i].data.media.reddit_video.fallback_url + 'mp4';
                        link.appendChild(video);

                    } else {
                        var img = document.createElement("img");
                        img.src = res.data.children[i].data.url;
                        img.alt = res.data.children[i].data.title;
                        link.appendChild(img);
                    }
                    lastPost = res.data.children[i].data.name;
                    document.getElementById("container").appendChild(link);
                }
            }
            // console.log(lastPost);
            queued = false;
        });
    }
}

(function () {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    var sorting = decodeURIComponent(window.location.hash.slice(1)).split("?");
    if(sorting[0] != "") {
        // console.log(sorting[0]);
        if(sorting[0] === "controversial" || sorting[0] === "top") {
            document.getElementById("time").style.display = "revert";
            if(sorting[1] != undefined) {
                document.getElementById("sort").value = sorting[0];
                document.getElementById("timeSelect").value = sorting[1];
                createTopPosts(sorting[0], sorting[1]);
            } else {
                document.getElementById("sort").value = sorting[0];
                document.getElementById("timeSelect").value = "all";
                createTopPosts(sorting[0], document.getElementById("timeSelect").value);
            }
        } else {
            createPosts(sorting[0]);
            document.getElementById("sort").value = sorting[0];
        }
    } else {
        createPosts(document.getElementById("sort").value);
    }
    Math.max(document.body.offsetHeight - (window.pageYOffset + window.innerHeight), 0);
    window.addEventListener("scroll",function(){
        // console.log((Math.max(document.body.offsetHeight - (window.pageYOffset + window.innerHeight), 0)));
        if((Math.max(document.body.offsetHeight - (window.pageYOffset + window.innerHeight), 0) < 5000) && queued === false) {
            if(sorting[0] != "") {
                // console.log(sorting[0]);
                if(sorting[0] === "controversial" || sorting[0] === "top") {
                    document.getElementById("time").style.display = "revert";
                    if(sorting[1] != undefined) {
                        createTopPosts(sorting[0], sorting[1]);
                    } else {
                        createTopPosts(sorting[0], document.getElementById("timeSelect").value);
                    }
                } else {
                    createPosts(sorting[0]);
                }
            } else {
                createPosts(document.getElementById("sort").value);
            }
            queued = true;
        }
    });
    // reddit.new("upvoteexeggutor").limit(1).after(lastPost).fetch(function (res) {
    //     console.log(res.data.children[0].data.title);
    // });
})();

function chooseSort() {
    window.location.hash = document.getElementById("sort").value;
    location.reload();
}

function chooseTime() {
    window.location.hash = document.getElementById("sort").value + "?" + document.getElementById("timeSelect").value;
    location.reload();
}