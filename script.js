let _posts = null;
let _currentPostId;
let _currentPostIdAux;
let defaultData = [
    {
        "id": "0",
        "title": "Lorem ipsum dolor sit amet",
        "author": "Qylfunt Lorqestrun",
        "date": "17/03/19",
        "content": "Curabitur sit amet leo dictum, molestie purus quis, dapibus urna. Nulla viverra, arcu vel sollicitudin scelerisque, sapien quam cursus felis, eu faucibus mi ante at ipsum. Nulla facilisi. Morbi at orci et nisl feugiat consequat. Nulla commodo magna quam, vitae efficitur elit pulvinar at. Vestibulum a felis ac odio tincidunt molestie id eu augue. Aenean vel hendrerit velit. Pellentesque a massa augue.",
        "image": "",
        "likes": "678",
        "comments": [{
            "author": "Fulano",
            "content": "Legal"
        },{
            "author": "Beltrano",
            "content": "Foda"
        }]
    }, {
        "id": "1",
        "title": "Nullam malesuada aliquam ultrices",
        "author": "Yathu Gentholl",
        "date": "15/04/2019",
        "content": "Suspendisse ac libero ac lorem pulvinar pharetra vitae nec odio. Donec euismod viverra turpis, id consectetur nisl ultrices a. Mauris aliquet tempus urna ut placerat. Nam hendrerit sem id lobortis egestas. Suspendisse tincidunt justo neque, ut fringilla metus mollis et. Integer efficitur tempor justo, at suscipit elit tempor in. Sed vitae lacus at augue consequat scelerisque id semper justo. Donec scelerisque, quam quis suscipit tincidunt, erat mauris ultrices risus, non elementum lectus metus nec velit. Etiam viverra aliquet libero, vel tincidunt lacus facilisis a. In nec pellentesque arcu, sed blandit dui. Duis vel arcu vel ante bibendum bibendum.",
        "image": "",
        "likes": "101",
        "comments": [{
            "author": "Beltrano",
            "content": "Foda"
        }]
    }, {
        "id": "2",
        "title": "Morbi sit amet justo quam",
        "author": "Somira Keenteeth",
        "date": "10/05/2019",
        "content": "Donec porta id dolor in lacinia. Nullam quis viverra velit, vitae sagittis tellus. Ut eget eros non odio vestibulum tempus. Mauris sed sapien non lorem pretium auctor sit amet id nisl. Mauris molestie sem nulla, nec pulvinar mauris volutpat sit amet. Donec nec faucibus risus.",
        "image": "",
        "likes": "666",
        "comments": [{
            "author": "",
            "content": ""
        }]
    }, {
        "id": "3",
        "title": "Integer enim augue, tristique nec ante ut",
        "author": "Ema Ironmaw",
        "date": "14/06/2019",
        "content": "iaculis faucibus ante. Fusce hendrerit dolor eget nibh porta, in finibus nibh efficitur. Sed turpis eros, interdum ut tincidunt vel, egestas non nunc. Nam ullamcorper erat in justo malesuada, vitae blandit lorem sagittis. Nunc varius neque mi, eu sollicitudin diam rhoncus sed. Donec eget dui ac augue sodales pulvinar eget sed odio. Nulla facilisi. Quisque convallis, metus ac sodales auctor, lacus eros vestibulum lectus, vitae lobortis tellus nulla at augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla venenatis non enim nec convallis. Proin ut pulvinar magna, sed hendrerit dolor. Donec nec nisl nisl. Morbi dolor turpis, pellentesque at elit ornare, consectetur eleifend diam.",
        "image": "",
        "likes": "34",
        "comments": [{
            "author": "",
            "content": ""
        }]
    }, {
        "id": "4",
        "title": "Praesent quis congue nibh",
        "author": "Monica Churchill",
        "date": "15/06/2019",
        "content": "Consectetur adipiscing elit. Cras mattis lacinia nulla, non viverra sem lacinia eu. Etiam pellentesque ut dui nec gravida. Aliquam gravida risus a tempus lacinia. Ut mattis, ante pulvinar interdum blandit, metus dui imperdiet mi, non elementum odio dui vitae augue. Phasellus eget diam ac elit cursus mattis. Duis non dui neque. Proin nisi ligula, volutpat sit amet mollis nec, congue eget dui. Praesent nec tincidunt odio. Aliquam dictum augue quam, sit amet pharetra urna finibus et. Vivamus tempor, nulla in dictum porta, ex augue posuere nunc, varius ultrices urna dolor sit amet lectus.",
        "image": "",
        "likes": "25",
        "comments": [{
            "author": "",
            "content": ""
        }]
    }
];

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
        _posts.reverse();
        _posts.forEach(post => {
            insertPostCard(post);
        });
        _posts.reverse();
    }else{
        _posts = defaultData;
        localStorage.setItem("posts", JSON.stringify(_posts));
        _posts.reverse();
        _posts.forEach(post => {
            insertPostCard(post);
        });
        _posts.reverse();
    }
}

function loadEventListeners() {
    $('#confirmAddPost').on('click', function () {
        savePost();
        imageConverterEvent();
        $('#addPost').modal('hide');
    });

    $('#confirmAddComment').on('click', function () {
        setComment();
        $('#addComment').modal('hide');
    });

    $('#comments').on('hidden.bs.modal', function (e) {
        $('#commentsPlace').empty();
    });

    imageConverterEvent();
}

// Converter Imagem para JSON
function imageConverterEvent() {
    let element = document.getElementById("imageFile");
    element.addEventListener('change', loadimage, false);
}
function loadimage(e1) {
    let filename = e1.target.files[0];
    let fr = new FileReader();
    fr.onload = imageHandler;
    fr.readAsDataURL(filename);
}
function imageHandler(e2) {
    var store = document.getElementById('image');
    store.value = e2.target.result;
}

function savePost() {
    let postToSave = createPost();
    _posts.push(postToSave);
    localStorage.setItem('posts', JSON.stringify(_posts));
    location.reload();
}

function createPost() {
    let id = _posts.length;
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let today = new Date();
    let date = today.getDate() + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getFullYear();
    let dateTime = date;
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
                    <img src="${post.image}" class="card-img-top img-fluid text-center "style=width:100%;height:auto;>
                </div>
                <div class="card-body bg-light">
                    <p id="id" style="visibility: hidden">${post.id}</p>
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Por: ${post.author} </h6>
                    <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
                    <p class="card-text">${post.content}</p>
                    <div class="row">
                        <div class="col-1">
                            <h6 class="card-subtitle mb-2 text-muted"><span><img src="img/baseline_thumb_up_black_18dp.png" alt="" style="height:100%;"></span> ${post.likes}</h6>
                        </div>
                        <div class="col-1">
                            <h6 class="card-subtitle mb-2 text-muted"><span><a id="commentsModal" data-toggle="modal" data-target="#comments" onClick="insertComments(${post.id});"><img src="img/baseline_chat_bubble_black_18dp.png" alt=""></a></span> ${post.comments.length}</h6>
                        </div>
                    </div>
                    <div class="btn-group" role="group">
                        <button onClick="setLike(${post.id})" type="button" class="btn btn-dark" style="margin: 1px;">Curtir</button>
                        <button type="button" class="btn btn-dark" style="margin: 1px;" data-toggle="modal" data-target="#addComment" id="newComment" onClick="_currentPostIdAux=${post.id}">Comentar</button>
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

function insertComments(id) {
    comments = _posts[id].comments;
    comments.forEach(function (comment) {
        $("#commentsPlace").append(`
            <div>
                <h5><b>${comment.author}</b></h6>
                <p>${comment.content}</p>
            </div>
            <hr>   
        `);
    });
}

function setLike(id) {
    _posts.forEach(function (post) {
        if(post.id == id){
            let likes = parseInt(post.likes, 10);
            likes = likes + 1;
            post.likes = likes.toString();
            localStorage.setItem('posts', JSON.stringify(_posts));
            location.reload();
        }
    });
}

function setComment() {
    let author = $("#authorComment").val();
    let content = $("#contentComment").val();
    let arr = new Object();
    arr["author"] = author;
    arr["content"]= content;
    _posts[parseInt(_currentPostIdAux,10)].comments.push(arr);
    localStorage.setItem('posts', JSON.stringify(_posts));
    location.reload();
}