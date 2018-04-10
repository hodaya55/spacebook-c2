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

        for (var i = 0; i < posts.length; i += 1) {
            var post = posts[i];

            var commentsContainer = '<div class="comments-container">' +
                '<input type="text" class="comment-name">' +
                '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

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

        for (var i in posts) {
            if (posts[i].id === postId) {
                var commentObj = { text: comment2 };
                var arr = posts[i].comments;
                arr.push(commentObj);

                console.log(posts);
                console.log(arr);

                $(current).closest('.comments-container').append(
                    // '<p> ' + comment2 + '</p> <br>'
                    // '<li> ' + comment2 + '</li>'
                    '<li> ' + comment2 + '</li>'
                );
                break;
            }

        }
        console.log(comment2);
    }

    var toggleComments = function (currentPost) {
        var $clickedPost = $(currentPost).closest('.post');
        $clickedPost.find('.comments-container').toggleClass('show');
    }

    return {
        createPost: createPost,
        renderPosts: renderPosts,
        removePost: removePost,

        // TODO: Implement
        createComment: createComment,

        // TODO: Implement
        // renderComments: renderComments,

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

////////////////////
$('.posts').on('click', '.add-comment', function () {
    // var comment = $(this).find('comment-name').val();
    // app.createComment(comment);
    app.createComment(this);
});
////////////////////

$('.posts').on('click', '.show-comments', function () {
    app.toggleComments(this);
});

