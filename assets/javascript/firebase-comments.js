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
    

    // User Comments


    // Adds Unique ID to Comments
    var postComments = rootRef.child($("#movieInput").val().trim() || "postComments")
    var link = window.location.pathname
    var pathkey = decodeURI(link.replace(new RegExp('\\/|\\.', 'g'),"_"));
    var postRef = postComments.child(pathkey);

    // Controls Submit Button
    $("#comment").submit(function(e) {
        e.preventDefault();
        postRef.push({
            name: firebase.auth().currentUser.displayName,
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
        html += "<div class='profile-image'><img src='https://www.gravatar.com/avatar/" + newComment.md5Email + "?s=100&d=retro' width='100px'/></div>";
        html += "<p>" + newComment.message + "</p></div>";
        $("#comments-container").prepend(html);
    });


    // User DB


    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    // Hides User Creation and Comment Input Divs on Load
    $('#firebaseui-auth-container').hide();
    $("#comment").hide();

    // Initialize User Sign-Up/Sign-In Option
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            autoUpgradeAnonymousUsers: true
          }
        ]
      });

        var uiConfig = {
            callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                $('#loader').hide();
            }
        },
    };

    ui.start('#firebaseui-auth-container', uiConfig);

    // If/Else for Determining if User is Signed In and Which Actions to Take
    firebase.auth().onAuthStateChanged(function(user) {
        document.getElementById('createAccountButton').disabled = true;
        if (user) {
          // User is signed in.
          $('#createAccountButton').hide();
          $("#comment").show();
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;

        //==========================================
        // Extra User Info To Create/Pull From If We So Choose
        //   var photoURL = user.photoURL;
        //   var isAnonymous = user.isAnonymous;
        //   var uid = user.uid;
        //   var providerData = user.providerData;
        //==========================================
          if (!emailVerified) {
            document.getElementById('createAccountButton').disabled = false;
          }
        } else {
          // User is signed out.
          $('#comment').hide();
        }
    });

    // Controls Create Account Button Function
    $("#createAccountButton").on('click', function(event) {
        event.preventDefault();
        $('#firebaseui-auth-container').show();
    });

});