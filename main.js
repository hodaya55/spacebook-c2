var runId = 0 //1;
var posts = [];

/** function that creates a new post object and adds it to a posts array. **/
var CreateAddPost = function (input) {
    var post = {
        text: input,
        id: runId++
    };

    posts.push(post);
    console.log(post.id);
    // runId++;
};


var $postList = $('.posts');

/** function that adds all the posts in the posts array to the posts div.**/
var renderPosts = function () {
    $postList.empty(); //remove the div with all the posts
    // $(".posts").find("p").remove();
    for (var i in posts) {
        var postHTML = "<p class='post' data-id=" + posts[i].id + ">" +
            "<button type='button' class='remove'>REMOVE</button>" + " " + posts[i].text + "</p>";
        $postList.append(postHTML); // fill the div with the posts
    }
};

/**each post element also has a "remove" button
When the button gets clicked, remove the post from the array and consequently the page**/
$('.posts').on('click', '.remove', function () {
    var getId = $(this).parent().data().id;
    for (var i in posts)
        if (posts[i].id == getId) {
            posts.splice(i, 1); // remove from the array
            break;
        }
    $(this).parent().remove(); // remove from the page
});

$('.add-post').on('click', function () {
    var input = $('#post-name').val();
    CreateAddPost(input);
    renderPosts();
});












/*
$('.posts').on('click', '.remove', function () {
    // var getId= $(this).closest("p").data().id;
    // $('p[data-id='+ getId+']').remove(); // remove from the page

    var getId = $(this).parent().data().id;
    for (var i in posts)
        if (posts[i].id == getId)
            posts.splice(i, 1); // remove from the array

    $(this).parent().remove(); // remove from the page
    // renderPosts();
    console.log("after remove: ");
    console.log(posts);
});
*/

