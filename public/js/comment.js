
// const uri = "/";
// var options ={
//     method:"POST"
//     // headers: {"Accept", "application/json"}
// }
var comment ;
window.onload = function(){
    
const uri = "/comment";

let h = new Headers();
h.append("Accept", "application/json");
let req = new Request(uri, {
    method: "GET",
    headers: h,
    mode: "cors"
});

fetch(req).then((res) => {
    if (res.ok) {
        return res.json();
    }
    else {
        new Error("not bad");
    }
}).then((jsondata) => {
    comment = jsondata;
    // console.log(JSON.stringify(comment));
    loadcomment();
     
}).catch((err) => {
    console.log(err);
}); 
}

// April 31, 2020, 4:42 am
var j ;
function loadcomment(){
    for(i=0; i<comment.length; i++){
        var eachcomment = `
        <div id="usercomment">
        <div id="comment${i}" class="comment">
                    <div class="comment-head">
                        <img src="/img/banner/futalogo.png" alt="user-img for futa pastquesions">
                        <div class="comment-head-right">
                            <div class="comment-username">${comment[i].name}</div>
                            <div class="time-commented"><span id="time-commented">${comment[i].time}</span></div>
                        </div>
                    </div>
                    <div class="comment-usertext"> ${comment[i].comment} </div></div> </div>`;

        document.getElementById("usercomments-div").innerHTML += eachcomment;
        document.getElementById("noofcomments").innerHTML = i +1;
        j=i;
    }
    

}


document.getElementById("comment-btn").addEventListener("click", createcomment);
function createcomment(){
    // alert("pls leave us a comment");
    var usersname = document.getElementById("usersname").value;
    var userscommentinput = document.getElementById("userscommentinput").value;
    if (usersname != "" && userscommentinput != "" && usersname.length <= 12 && userscommentinput.length<=380){
        var commenttime = moment().format("MMMM Do,YYYY, h:mm a");

        const uri2 = "/comment";
        var options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${usersname}`, time: commenttime, comment: userscommentinput
            })
        };

        fetch(uri2, options);
        // 
        var eachcomment = 
            '<div id="usercomment"> ' +
            '<div id="comment' + parseInt(j+2)+'" class="comment">'+
            '<div class="comment-head">'+
            '<img src="/img/banner/futalogo.png" alt="user-img for futa pastquesions">'+
            '<div class="comment-head-right">'+
            '<div class="comment-username">'+ usersname +'</div>'+
            '<div class="time-commented">' + '<span id="time-commented">' + commenttime + '</span>' + '</div>' +
            '</div > '+
            '</div>'+
            '<div class="comment-usertext">' + userscommentinput + ' </div>' + '</div>' + ' </div>' ;

        $("#usercomments-div").prepend(eachcomment);
        document.getElementById("noofcomments").innerHTML =  j + 2;

        document.getElementById("usersname").value= "";
        document.getElementById("userscommentinput").value= "";
    }
    else if (usersname == " " || userscommentinput == " "){
        alert("pls leave us a comment");
    }
    else if (usersname.length >= 15){
        alert("Sorry but your Name is too long")
    }
    else if (userscommentinput.length >= 380) {
        alert("comment is too long")
    }

    
    
}
