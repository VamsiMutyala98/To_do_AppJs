var something={};
var get=new Promise( (resolve,reject) => {
    var xmlHttp=new XMLHttpRequest();
    xmlHttp.open( "GET","http://34.71.224.0:8080/api/tasks" , true);
    xmlHttp.setRequestHeader('Authorization',"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw");
    xmlHttp.withCredentials = "true";
    xmlHttp.onload = () => {
        var data = JSON.parse(xmlHttp.responseText);
        if(xmlHttp.status>=200 && xmlHttp.status<400){
            resolve(data);
        }
        else{
            reject("Error Occured");
        }
    }
    xmlHttp.send();
});
get.then( (msg) => {
    if(msg.length==0){
        document.getElementById("fun").innerHTML="NO Tasks are there! For Entering the Tasks Plz press add Task button.";
    }
    else{
        for(var i=0; i<msg.length; i++)
        {
            var Fun = document.getElementById("table_Id");
            var row = Fun.insertRow(0);
            var C1 = row.insertCell(0);
            var C2 = row.insertCell(1);
            var C3 = row.insertCell(2);
            var C4 = row.insertCell(3);
            var C5 = row.insertCell(4);
            C1.innerHTML = msg[i]['name'];
            C2.innerHTML = msg[i]['expiryDate'];
            C3.innerHTML = msg[i]['status'];
            // console.log(C3.value);
            C1.style.color="navy";
            C1.style.fontWeight="bold";
            C3.style.fontWeight="bold";
            var id = msg[i]["id"];
            var name = msg[i]["name"];
            var expiryDate = msg[i]["expiryDate"];
            var status = msg[i]["status"];
            // something[name]=id;


            var button_for_edit = document.createElement('button');
            button_for_edit.style.backgroundColor="#5bc0de";
            button_for_edit.style.color="black";
            button_for_edit.style.fontFamily="Arial";
            button_for_edit.style.fontWeight="bold";
            button_for_edit.style.fontSize="15px";
            button_for_edit.style.paddingLeft="20px";
            button_for_edit.style.paddingRight="20px";
            button_for_edit.style.border="1px solid gray";
            button_for_edit.style.boxShadow="1px 2px gray";
            button_for_edit.style.textAlign="center";
            button_for_edit.id=id;
            button_for_edit.name = name;
            button_for_edit.expiryDate = expiryDate;
            button_for_edit.status = status;
            var link = document.createTextNode("Edit");
            button_for_edit.appendChild(link);
            button_for_edit.onclick = function () {
                document.getElementById("vis1").style.visibility="visible";
                // documnet.getElementById("vis1").addClass("form-group mt-5 "+);
                document.getElementById("i1").value=this.name;
                document.getElementById("i2").value=this.expiryDate;
                document.getElementById("i3").value=this.status;
                document.getElementById("SC").value=this.id;
            }
            C4.appendChild(button_for_edit);



            var button_for_delete = document.createElement('button');
            button_for_delete.style.backgroundColor="#d9534f";
            button_for_delete.style.color="black";
            button_for_delete.style.fontFamily="Arial";
            button_for_delete.style.fontWeight="bold";
            button_for_delete.style.fontSize="15px";
            button_for_delete.style.paddingLeft="12px";
            button_for_delete.style.paddingRight="12px";
            button_for_delete.style.border="1px solid gray";
            button_for_delete.style.boxShadow="1px 2px gray";
            button_for_delete.id=id;
            var link1 = document.createTextNode("Delete");
            button_for_delete.appendChild(link1);
            button_for_delete.onclick=function (){
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open( "DELETE","http://34.71.224.0:8080/api/tasks/"+this.id,true);
                xmlHttp.setRequestHeader('Authorization',"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw");
                xmlHttp.setRequestHeader('Content-Type', 'application/json');
                xmlHttp.withCredentials = true;
                xmlHttp.onload = function () {
                    if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
                        window.location.replace("mini_project.html");
                        console.log("Success");
                    }
                    else {
                        console.log("Error");
                    }
                }
                xmlHttp.send();
                };
            C5.appendChild(button_for_delete);
        }
    }
}).catch(()=>{
    alert("error");
})





function addTask(){
    var taskName=document.getElementById("f1").value;
    var time=document.getElementById("f2").value;
    var status=document.getElementById("f3").value;
    console.log(taskName,time,status);
    var data={
        "name":taskName,
        "expiryDate":time,
        "status":status
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST","http://34.71.224.0:8080/api/tasks",true);
    xmlHttp.setRequestHeader('Authorization',"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw");
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.withCredentials = true;
    xmlHttp.send(JSON.stringify(data));
    xmlHttp.onload = function () {
    if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
            window.location.replace("mini_project.html");
            console.log("Success");
    }
    else {
        alert("error");
    }
    }
    
}
 





function editTask(){
    var taskName=document.getElementById("i1").value;
    var time=document.getElementById("i2").value;
    var status=document.getElementById("i3").value;
    var id=document.getElementById("SC").value;
    // console.log(taskName,time,status,id);
    // console.log(something);
    var data={
        "id":id,
        "name":taskName,
        "expiryDate":time,
        "status":status
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "PUT","http://34.71.224.0:8080/api/tasks",true);
    xmlHttp.setRequestHeader('Authorization',"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw");
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.withCredentials = true;
    xmlHttp.onload = function () {
    if (xmlHttp.status >= 200 && xmlHttp.status < 400) {
            window.location.replace("mini_project.html");   
            console.log("Success");
    }
    else {
        alert("error");
    }
    }
    xmlHttp.send(JSON.stringify(data));
    document.getElementById("vis1").style.visibility="hidden";
}










