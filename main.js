var SpacebookApp = function () {
    var posts = [
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]},
        // {text: "Hello world", id: 0, comments:[
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"},
        //   { text: "Man, this is a comment!"}
        // ]}
    ];

    // the current id to assign to a post
    var currentId = 0;
    var $posts = $('.posts');

    var _findPostById = function (id) {
        for (var i = 0; i < posts.length; i += 1) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
    }

    var createPost = function (text) {
        var comArray = []; ////////////////
        var post = {
            text: text,
            id: currentId,
            comments: comArray ////////////////
        }

        currentId += 1;

        posts.push(post);
    }

    var renderPosts = function () {
        $posts.empty();

        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var commentsContainer = '<div class="comments-container">' +
            // var commentsContainer = '<div class="show">' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button>' +
                '<ul class="listComments">Comments:';
          
            for (var c = 0; c < post.comments.length; c++) {
                var postCom = post.comments[c].text;
               commentsContainer += '<li>' + postCom + '</li>';
            }
            commentsContainer +=  ' </ul> </div>';
            console.log(commentsContainer); 
            $posts.append('<div class="post" data-id=' + post.id + '>'
                + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> '
                + post.text +
                commentsContainer + '</div>');
        }

    }

    var removePost = function (currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        var id = $clickedPost.data().id;
        var post = _findPostById(id);
        posts.splice(posts.indexOf(post), 1);
        $clickedPost.remove();
    }

    var createComment = function (current) {
        var comment2 = $(current).prev('.comment-name').val();
        var postId = $(current).closest('.post').data().id;

        console.log(postId);

        var commentObj = {
            text: comment2
        };

        var post = _findPostById(postId);
        posts[posts.indexOf(post)].comments.push(commentObj);

        console.log(posts);



        // $(current).closest('.comments-container').find('.listComments').append(
        //     '<li> ' + comment2 + '</li>'
        // );


        // for (var i in posts) {
        //     if (posts[i].id === postId) {
        //         var commentObj = { text: comment2 };
        //         var arr = posts[i].comments;
        //         arr.push(commentObj);

        //         console.log(posts);
        //         console.log(arr);

        //         $(current).closest('.comments-container').append(
        //             // '<p> ' + comment2 + '</p> <br>'
        //             // '<li> ' + comment2 + '</li>'
        //             '<li> ' + comment2 + '</li>'
        //         );
        //         break;
        //     }
        //}

        console.log(comment2);
    }

    var $comm = $('.listComments');
    var renderComments = function (current) {

        var $p = $(current).parent('.comments-container');
        // var $p= $(current).next('ul');
        // $p.empty();

        console.log("i'm in render comments");

        for (var i in posts) {
            $p.find('ul').empty();
            $p.append('<ul>');
            for (var c in posts[i].comments) {
                var postCom = posts[i].comments[c].text;
                $p.append('<li> ' + postCom + '</li>');

            }
            $p.append('</ul>');
        }
    }

    var toggleComments = function (currentPost) {

        var $clickedPost = $(currentPost).closest('.post');
        // var idd=$clickedPost.data().id;
        // var $clickedPost = $(currentPost).closest('.post[data-id='+idd+']');
        $clickedPost.find('.comments-container').toggleClass('show');
        // $clickedPost.find('.comments-container').toggleClass('comments-container');
    }

    return {
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,

        // TODO: Implement
        createComment: createComment,

        // TODO: Implement
        renderComments: renderComments,

        // TODO: Implement
        // removeComment: removeComment,
        toggleComments: toggleComments
    }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
    var text = $('#post-name').val();

    app.createPost(text);
    app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
    app.removePost(this);
});


$('.posts').on('click', '.add-comment', function () {
    // var comment = $(this).prev('comment-name').val();
    // app.createComment(comment);
    app.createComment(this);
     app.renderPosts();
    //  app.toggleComments('.show-comments');
    // app.toggleComments(this);
    //app.renderComments(this);
});


$('.posts').on('click', '.show-comments', function () {
    app.toggleComments(this);
});

