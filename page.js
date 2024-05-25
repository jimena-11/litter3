// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD06YK1SE8E0kmuHy9laV9Pji_0P5HUJI0",
  authDomain: "kwitter93-37229.firebaseapp.com",
  databaseURL: "https://kwitter93-37229-default-rtdb.firebaseio.com",
  projectId: "kwitter93-37229",
  storageBucket: "kwitter93-37229.appspot.com",
  messagingSenderId: "160195328483",
  appId: "1:160195328483:web:8f9bda3f36ba4915e408d6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });


      document.getElementById("msg").value = "";
}





function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey; message_data = childData;
                        //Inicia código termianr la fnción Get Data
                        console.log(firebase_message_id);
                        console.log(message_data);
                        //cambio name
                        nombre = message_data['name'];

                        message = message_data['message'];

                        like = message_data['like'];

                        name_with_tag = "<h4> " + nombre + "<img class='user_tick' src='https://images.vexels.com/media/users/3/299488/isolated/preview/8c8c1857cbcf222280a12a7f5a122abc-icono-de-tecnologa-a-de-burbujas-de-chat-de-mensaje.png'></h4>";

                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";

                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";

                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;

                        document.getElementById("output").innerHTML += row;


                  }
            });
      });
}
getData();


function updateLike(message_id) {
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
  
      firebase.database().ref(room_name).child(message_id).update({
          like: updated_likes
      });
  
  }

 

  function salir() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
  }
  
  

