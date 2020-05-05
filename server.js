var express = require("express");
var bodyparser = require("body-parser");
var fs = require("fs");

var app = express();
var urlencodedParser = bodyparser.urlencoded({extended: false});
var jsonparser = bodyparser.json();

app.use(express.static(__dirname + "/public"));
var port =process.env.PORT || 3000;

var {questions} = require(__dirname + "/questions.js");

// //console(JSON.stringify(questions));

// var {comment} = require(__dirname + "/comment.js");
// //console(hl);

// function myran(l,y){
//     let one= y + 1;
//     let two = Math.random()*one;
//     let result = Math.floor(two) + l;
//     return result;
// }



// function creatarray(start,end){
//     let agricquestion = [];
//     for(i=start;i<=end; i++){
//         agricquestion.push(questions.agric[i]);

//     }
//     return agricquestion;
// }

// let numarray = creatarray(1,11);

// var hl = [];
// for(i=0; i<=3; i++){
//     let randomindex = myran(0, numarray.length - 1);
//     let rannumber = numarray[randomindex];
//     numarray.splice(randomindex, 1);
//     // //console(rannumber);
//     hl.push(rannumber);
// }

// //console(hl);

// var hi = fs.createReadStream(__dirname + "/user.txt", "utf8");
// hi.on("data", (ggg) => {
//     //console(JSON.stringify(ggg));
// })
// var gg = {name:"hello"};
// fs.appendFileSync(comment.users , JSON.stringify(gg));

// read visits.json file to get number of vists for each page
var gp =JSON.parse(fs.readFileSync("visits.json"));
// //console(gp[1].visits);

// gp.splice(1,1);
// //console(gp)

app.get("/", urlencodedParser, (req, res) => {

    res.sendFile(__dirname + "/public/homepage.html");

    // res.end();

});
app.get("/post-utme", urlencodedParser, (req,res)=>{
    
    res.sendFile(__dirname + "/public/home.html");
    
    // res.end();
    
});
app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});
app.get("/homevisits", (req, res) => {
    var visits = gp[0].visits;
    visits++;
    // //console("visits:", visits);
    gp.splice(0, 1);
    gp.unshift({ "page": "home", "visits": visits });
    fs.writeFileSync("visits.json", JSON.stringify(gp, null, 2));
    res.json({ "page": "home", "visits": visits })
});
app.get("/pastquestions", (req , res)=>{

    res.sendFile(__dirname + "/public/comingsoon.html")
});
app.get("/online-tutorialvideo", (req, res) => {
  res.sendFile(__dirname + "/public/comingsoon.html");
});
app.get("/futa-cinema", (req, res) => {
  res.sendFile(__dirname + "/public/comingsoon.html");
});
app.get("/cgpa_cal", urlencodedParser, (req, res) => {

    res.sendFile(__dirname + "/public/cgpa_cal/cgpa.html");

    // res.end();

});
app.get("/getstarted", urlencodedParser, (req, res) => {
    var visits = gp[1].visits;
    visits++;
    // //console("visits:", visits);
    gp.splice(1,1);
    gp.push({ "page": "getstarted", "visits": visits });
    fs.writeFileSync("visits.json", JSON.stringify(gp, null, 2));
    res.sendFile(__dirname + "/public/free-mode.html");
});

var comm = JSON.parse(fs.readFileSync("comment.json"));
var hhh= [];
for(i=0;i<6; i++){
    hhh.push(comm[i]);
}
// //console(hhh);
app.get("/comment", (req,res)=>{
    res.json(hhh);
});

app.post("/comment", jsonparser, (req,res)=>{
    //console("hello" ,req.body);
    comm.unshift(req.body)
    fs.writeFile("comment.json", JSON.stringify(comm, null, 2), (err) => {
        //console("err: ", err);
    });
    res.end();
});

app.get("/favicon.ico",(req,res)=>{
    res.send("hi");
})
var hll = [];
var singlesubject;
app.get("/single/:name", (req,res)=>{
    // if(questions)
    // var subject;

    
    //console("one1", hll)
    // numarray = [];
    hll = [];
    // //console("req", req.query.subject);
    //console("subject", req.query.subject);
    singlesubject = req.query.subject;

    // //console(subject);
    // var hll = Object.keys(questions);
    // for(j=0; j<hll.length; j++){
    //     // if(hll.toString == subject.toString){
    //     //     //console(hll[i]);
    //     // }
    //     if (hll[j] == subject) {
            // //console(hll[j]);
            // //console(questions[hll[j]][1]);            
    function myran(l, y) {
        let one = y + 1;
        let two = Math.random() * one;
        let result = Math.floor(two) + l;
        // //console("result:", result);
        return result;

    }

            function creatarray(start, end) {
                let agricquestion = [];
                for (i = start; i <= end; i++) {
                    agricquestion.push(questions[singlesubject][i]);
                    //console("agricquestion", agricquestion, i)
                }
                return agricquestion;
            }
    
    let numarray = creatarray(0, questions[singlesubject].length-1);
    // //console( "numarray : ",numarray)

            ;
            for (i = 0; i <= 4; i++) {
                let randomindex = myran(0, numarray.length - 1);
                let rannumber = numarray[randomindex];
                numarray.splice(randomindex, 1);
                // //console("rannumber", rannumber);
                // //console("numarray", numarray)
                hll.push(rannumber);
                
            }
    //console("onre" ,hll);
    //     }
        
    // }
    
    // res.send("hi "+ req.params.name);
    res.sendFile(__dirname+"/public/"+req.params.name+".html");
    // //console("two", hl);
    
});
app.get("/question", (req, res) => {

    res.json({ subject: singlesubject, questiondata: hll });
    //console("three", hll);
    //console("sub", subject);
    // hll = [];
    // singlesubject = [];

    // subject = "";
});
var hhhy = JSON.parse(fs.readFileSync("single-user.json"));
app.post("/savenewuseroh", jsonparser,  (req,res)=>{
    //console(req.body);
    hhhy.unshift(req.body)
    fs.writeFile("single-user.json", JSON.stringify(hhhy, null ,2), (err)=>{
        //console(err);
    });


    // var hh = fs.readFileSync("user.json");
    // var words = JSON.parse(hh);
    // //console(words);

    res.end();
    
});
// //console(questions.agric.length)
var subject;
app.post("/multiple", urlencodedParser, (req,res)=>{
  
    
    // //console(req.query);
    
    subject = (req.body.multiple);
    // //console("$$$$$$$$$$$$$$$$$$");
    // //console(subject);
    res.sendFile(__dirname + "/public/multiple.html");                         
});

app.get("/multiplequestion", (req, res) => {
    var hl = [];
    // //console(subject);
    // var hll = Object.keys(questions);
    // for(j=0; j<hll.length; j++){
    //     // if(hll.toString == subject.toString){
    //     //     //console(hll[i]);
    //     // }
    //     if (hll[j] == subject) {
    // //console(hll[j]);
    // //console(questions[hll[j]][1]);            
    function myran(l, y) {
        let one = y + 1;
        let two = Math.random() * one;
        let result = Math.floor(two) + l;
        // //console("result:", result);
        return result;
    }
    function creatarray(start) {
        let agricquestion = [];
        for (j = 0; j < subject.length; j++) {
            var hello = [];
            for (i = start; i <= questions[subject[j]].length - 1; i++) {
                hello.push(questions[subject[j]][i]);
            }
            agricquestion.push(hello);

        }
        // //console(agricquestion);
        return agricquestion;
    }
    let numarray = creatarray(0);
    // //console( "numarray : ",numarray)
    ;
    for (j = 0; j < numarray.length; j++) {
        var hello = [];
        for (i = 0; i <= 4; i++) {
            let randomindex = myran(0, numarray[j].length - 1);
            let rannumber = numarray[j][randomindex];
            numarray[j].splice(randomindex, 1);
            // //console("rannumber", rannumber);
            // //console("numarray", numarray)
            hello.push(rannumber);
            // //console(hello);
        }
        hl.push(hello);
    }
// //console(hl);
    //     }
    // }
    // res.send("hi "+ req.params.name);

    // //console(hl , ":now")
    res.json({ subject: subject, questiondata: hl });
    hl = [];
    // //console(hl); //console("final subject:",subject);
});
// app.post("/multiple", urlencodedParser, (req, res) => {
//   //console(JSON.stringify(req.body));
//   if (req.body.physics){
//     res.sendFile(__dirname + "/public/multiple.html");
//     res.send(hl);
//   }
// //   next();
// });

app.get("/signup",(req,res)=>{
    res.sendFile(__dirname +"/public/comingsoon.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/comingsoon.html");
});
app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/public/about.html");
});
app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/public/contact.html");
});


app.get("/contact/:name", (req, res) => {
    // //console(req.params);
    var contactreason = req.params.name;
    res.sendFile(__dirname + "/public/complaint.html");
    app.get("/contactparam", (req, res) => {
        // //console(req.params);
        res.json({ name: contactreason });
    });
});
app.post("/contact", jsonparser,(req,res)=>{
    //console(req.body);
    var he = JSON.parse(fs.readFileSync(`${req.body.section}.json`));
    he.unshift(req.body)
    //console(he);
    fs.writeFileSync(`${req.body.section}.json`, JSON.stringify(he, null ,2));
    res.end();
})


app.listen(port, ()=>{
    console.log("server started")
});