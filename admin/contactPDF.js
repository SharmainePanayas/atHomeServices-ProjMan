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

db.collection('dbContact').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            addRec(change.doc)
        }
    })
})
