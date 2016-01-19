function file(path){
    path = path.split('/');
    sendAndGet('files',{'path':path},finishfiles);
    }function finishfiles(reply){
    var name = reply.path.split("/").pop();
    var content='<h1 id="title" onclick="writeRenameFile();">'+name+'</h1>';
    if (reply.path === ''){
        name = '/';
        content='<h1 id="title">'+name+'</h1>';

    }
    document.title = name;
    if (reply.type == 'file'){
        content += '<a id="newfile" onclick="writeEditFile();">+</a>'+
                    '<div id="filecontents"><pre>'+reply.content+'</pre></div>';
    } else {
        content += '<a id="newfile" onclick="writeAddFile();">+</a><ul id="fileul">';
        for (var i=0;i<reply.files.length;i++){
            var url;
            if (reply.path === ''){url = '#files/'+reply.files[i];}
            else {url = '#files/'+reply.path+'/'+reply.files[i];}
            content += '<li><a href="'+url+'">'+reply.files[i]+'</a></li>';
       }
        content += '</ul>';
    }
    content += '<a onclick="removeFile();">-</a><ul id="fileul">';
    document.getElementById("actualcontent").innerHTML = content;
}

function filepath(){
    var path = window.location.hash.substring(1);
    path = path.split('/');
    path.splice(0,1);
    return path;
}

function writeAddFile(){
    var node = document.getElementById('fileul');
    var form =  "<li><input id=\"newName\">"+
                "<button onclick=\"addFile('file');\">File</button>"+
                "<button onclick=\"addFile('folder');\">Folder</button></li>";
    node.innerHTML = node.innerHTML + form;
}
function addFile(type){
    var name = document.getElementById("newName").value;
    var path = filepath();
    sendAndGet("addFile",{'path':path.concat(name),'type':type},finishaddFile);
    }function finishaddFile(reply){
    location.reload();
}

function removeFile(){
    if(confirm('Do you want to delete this?')){
        var path = filepath();
        sendAndGet("removeFile",{'path':path},finishremoveFile);
        }}function finishremoveFile(reply){
        window.history.back();
}

function writeRenameFile(){
    if(document.getElementById('title').childNodes.length == 1){
    var path = filepath();
    var filename = path.pop();
    document.getElementById('title').innerHTML = "<input id=\"name\"><br><button onclick='renameFile()'>Save</button>";
    document.getElementById('name').value =filename;
}}
function renameFile(){
    var path = filepath();
    var name = document.getElementById("name").value;
    sendAndGet("renameFile",{'path':path, 'newname':name},finishrenameFile);
    }function finishrenameFile(reply){
    window.location.hash = '#files/'+reply.path;
}

function writeEditFile(){
    var filedata = document.getElementById('filecontents').innerHTML.slice(5,-6);
    document.getElementById('filecontents').innerHTML = "<textarea id=\"filedata\"></textarea><br><button onclick=\"editFile()\">Save</button>";
    document.getElementById('filedata').value = filedata;
}
function editFile(){
    var path = filepath();
    filedata = document.getElementById('filedata').value;
    sendAndGet("editFile",{'path':path, 'data':filedata},finisheditFile);
    }function finisheditFile(reply){
    location.reload();
}