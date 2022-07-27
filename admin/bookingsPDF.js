const frmData=$('#frmData');
const tblItems=$('#tblItems');


function addRec(doc){

    tblItems.append(`<tr id="${doc.id}">    
    <td>${doc.data().fname}</td>
    <td>${doc.data().cadd}</td>
    <td>${doc.data().bnum}</td>
    <td>${doc.data().rnum}</td>
    <td>${doc.data().contact}</td>  
    <td>${doc.data().email}</td>  
    <td>${doc.data().date}</td>  
    <td>${doc.data().time}</td>
    <td>${doc.data().service}</td>
    <td>${doc.data().area}</td>
    <td>${doc.data().price}</td>
    <td>${doc.data().mop}</td>
    <td>${doc.data().status}</td>

      </tr>`)     

}

db.collection('dbUserBookings').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            addRec(change.doc)
        }
    })
})
