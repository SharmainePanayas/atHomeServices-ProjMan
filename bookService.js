const frmData=$('#frmData');
const tblItems=$('#tblItems');


function addRec(doc){

    tblItems.append(`<tr id="${doc.id}">    
      <td>${doc.data().fname}</td>
      <td>${doc.data().address}</td>
      <td>${doc.data().contact}</td>  
      <td>${doc.data().date}</td>  
      <td>${doc.data().time}</td>
      <td>${doc.data().service}</td>
      <td>${doc.data().area}</td>
      <td>${doc.data().price}</td>
      <td>${doc.data().mop}</td>
      <td>${doc.data().status}</td>

      <td align="center" width="100"><a href="javascript:void(0)" onclick="confirm('Are you sure you want to cancel your booking?') || event.stopImmediatePropagation()" class="delete" id="${doc.id}">DELETE</a></td>
      <td align="center" width="100"><a href="javascript:void(0)" onclick="confirm('Are you sure you want to edit your booking?') || event.stopImmediatePropagation()" class="edit" id="${doc.id}">EDIT</a></td>
      </tr>`)     

       
      $('.delete').click((e)=>{
        e.stopImmediatePropagation();
        var id=e.target.id;

        db.collection('dbBookings').doc(id).delete();
      })

      $('.edit').click((e)=>{
        e.stopImmediatePropagation();
        var id=e.target.id;

        db.collection('dbBookings').doc(id).get().then(doc=>{

            $('#fname').val(doc.data().fname);
            $('#address').val(doc.data().address);
            $('#contact').val(doc.data().contact);
            $('#date').val(doc.data().date);
            $('#time').val(doc.data().time);
            $('#service').val(doc.data().service);
            $('#area').val(doc.data().area);
            $('#price').val(doc.data().price);
            $('#mop').val(doc.data().mop);
            $('#status').val(doc.data().status);
            $('#document').val(doc.id);

        })
      })

}


$('#update').on('click',()=>{
    var id = $('#document').val();

    db.collection('dbBookings').doc(id).set({
        fname:$('#fname').val(),
        address:$('#address').val(),
        contact:$('#contact').val(),
        date:$('#date').val(),
        time:$('#time').val(),
        service:$('#service').val(),
        area:$('#area').val(),
        price:$('#price').val(),
        mop:$('#mop').val(),
        status:$('#status').val()

}, {merge:true})

$('#fname').val('');
$('#address').val('');
$('#contact').val('');
$('#date').val('');
$('#time').val('');
$('#service').val('');
$('#area').val('');
$('#price').val('');
$('#mop').val('');

})

frmData.on('submit',(e)=> {
   e.preventDefault();
   
   db.collection('dbBookings').add({
       fname:$('#fname').val(),
       address:$('#address').val(),
       contact:$('#contact').val(),
       date:$('#date').val(),
       time:$('#time').val(),
       service:$('#service').val(),
       area:$('#area').val(),
       price:$('#price').val(),
       mop:$('#mop').val(),
       status:$('#status').val()
    })

    $('#fname').val('');
    $('#address').val('');
    $('#contact').val('');
    $('#date').val('');
    $('#time').val('');
    $('#service').val('');
    $('#area').val('');
    $('#price').val('');
    $('#mop').val('');
})

db.collection('dbBookings').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=="added"){
            addRec(change.doc)
        }
        else if(change.type=="removed"){
            var id=change.doc.id;
            $('#'+id).remove();
        }

        else if(change.type=="modified"){
            var id=change.doc.id;
            $('#'+ id).remove();
            addRec(change.doc);
        }

    })
})
