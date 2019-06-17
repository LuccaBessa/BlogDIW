let _posts = null;
let _currentPostId;

class Post {
    constructor(id, title, author, date, content, image, likes, comments) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.content = content;
        this.image = image;
        this.likes = likes;
        this.comments = comments;
    }
}

$(document).ready(function ($) {
    loadData();
    loadEventListeners();
});

function loadData() {
    if (localStorage.posts) {
        _posts = JSON.parse(localStorage.posts);

        _posts.forEach(post => {
            insertPostCard(post);
        });
    } else
        _posts = new Array();

}

function loadEventListeners() {
    $('#addPost').on('shown.bs.modal', function () {
        $('#newPost').trigger('focus')
    });

    $('#addComment').on('shown.bs.modal', function () {
        $('#newComment').trigger('focus')
    });

    $('#confirmAddPost').on('click', function () {
        savePost();
        imageConverterEvent();
    });

}

// Converter Imagem para JSON
function imageConverterEvent() {
    var element = document.getElementById("imageFile");
    element.addEventListener('change', loadimage, false);
}
function loadimage(e1) {
    var filename = e1.target.files[0];
    var fr = new FileReader();
    fr.onload = imageHandler;
    fr.readAsDataURL(filename);
}
function imageHandler(e2) {
    var store = document.getElementById('image');
    store.value = e2.target.result;
}

function savePost() {
    postToSave = createPost();
    _posts.push(postToSave);
    localStorage.setItem('posts', JSON.stringify(_posts));
    insertPostCard(postToSave);
}

function createPost() {
    let id;
    if (_posts.length == 0) {
        id = _posts.length;
    }else{
        id = _posts.length + 1;
    }
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + ' ' + time;
    let content = document.getElementById("content").value;
    let image = document.getElementById("image").value;
    let likes = "0";
    let comments = new Array();

    return new Post(id.toString(10), title, author, dateTime.toString(), content, image, likes, comments);
}

function insertPostCard(post) {
    $("#postPlace").append(`
    <br>
    <div class="row">
        <div class="col-1" style="width:100%;height:auto;">
        </div>
        <div class="col-10">
            <div class="card" style="width:100%;">
                <div>
                    <img src="${post.image}" class="card-img-top img-fluid text-center "
                        style=width:100%;height:auto;>
                </div>
                <div class="card-body bg-light">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Por: ${post.author} </h6>
                    <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                    <p class="card-text>${post.content}</p>
                    <div class="row">
                        <div class="col-1">
                            <h6 class="card-subtitle mb-2 text-muted"><span><img src="img/baseline_thumb_up_black_18dp.png" alt="" style="height:100%;"></span>${post.likes}</h6>
                        </div>
                        <div class="col-1">
                            < h6 class = "card-subtitle mb-2 text-muted" > < span > < img src = "img/baseline_chat_bubble_black_18dp.png" alt = "" > < /span>${post.comments.length}</h6 >
                        </div>
                    </div>
                    <div class="btn-group" role="group">
                        <button href="#" type="button" class="btn btn-dark" style="margin: 1px;">Curtir</button>
                        <button href="#" type="button" class="btn btn-dark" style="margin: 1px;" data-toggle="modal" data-target="#addComment" id="newComment">Comentar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-1" style="width: 100%">
        </div>
    </div>
    <br>    
    `);
}