const frmData=$('#frmData');
const tblItems=$('#tblItems');


function addRec(doc){

    tblItems.append(`<tr id="${doc.id}">    
      <td>${doc.data().name}</td>
      <td>${doc.data().email}</td>
      <td>${doc.data().phone}</td>  
      <td>${doc.data().message}</td>  
      </tr>`)     
}

frmData.on('submit',(e)=> {
   e.preventDefault();
   
   db.collection('dbContact').add({
       name:$('#name').val(),
       email:$('#email').val(),
       phone:$('#phone').val(),
       message:$('#message').val()
    })

    $('#name').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#message').val('');
})

db.collection('dbContact').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            addRec(change.doc)
        }
    })
})
