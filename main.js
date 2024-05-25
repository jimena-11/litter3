function adduser(){
    usuario=document.getElementById("user_name").value
    localStorage.setItem("user_name",usuario)
    window.location="room.html"
}