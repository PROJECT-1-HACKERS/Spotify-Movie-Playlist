$(document).ready(function () {
    
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCcySihpL5WwrQQxWdCvsPZzQ2F7GISI1w",
    authDomain: "group-project-1-comments.firebaseapp.com",
    databaseURL: "https://group-project-1-comments.firebaseio.com",
    projectId: "group-project-1-comments",
    storageBucket: "group-project-1-comments.appspot.com",
    messagingSenderId: "1030290662148"
    };

    firebase.initializeApp(config);

    // Set Firebase Ref as a Variable
    var rootRef = firebase.database().ref();

    // Adds Unique ID to Comments
    var postComments = rootRef.child('postComments');
    var link = window.location.pathname
    var pathkey = decodeURI(link.replace(new RegExp('\\/|\\.', 'g'),"_"));
    var postRef = postComments.child(pathkey);

    // Controls Submit Button
    $("#comment").submit(function(e) {
        e.preventDefault();
        postRef.push().set({
            name: $("#name").val(),
            message: $("#message").val(),
            md5Email: md5($("#email").val()),
            postedAt: firebase.database.ServerValue.TIMESTAMP
        });
        $("input[type=text], textarea").val("");
        return false;
    });   
    

    // Writes Messages to Page
    postRef.on("child_added", function(snapshot) {
        var newComment = snapshot.val();

        var html = "<div class='comment'>";
        html += "<h4>" + newComment.name + "</h4>";

        // The Next Line Adds an Avatar Photo That is Unique to User Submitted Email. Optional, will discuss with team.
        html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.md5Email + "?s=100&d=retro'/></div>";
        html += "<p>" + newComment.message + "</p></div>";
        $("#comments-container").prepend(html);
    });

});

