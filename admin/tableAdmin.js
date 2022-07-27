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

      <td align="center" width="100"><a href="javascript:void(0)" onclick="confirm('Are you sure you want to cancel your booking?') || event.stopImmediatePropagation()" class="delete" id="${doc.id}">DELETE</a></td>
      <td align="center" width="100"><a href="javascript:void(0)" onclick="confirm('Are you sure you want to edit your booking?') || event.stopImmediatePropagation()" class="edit" id="${doc.id}">EDIT</a></td>
      </tr>`)     

       
      $('.delete').click((e)=>{
        e.stopImmediatePropagation();
        var id=e.target.id;

        db.collection('dbUserBookings').doc(id).delete();
      })

      $('.edit').click((e)=>{
        e.stopImmediatePropagation();
        var id=e.target.id;

        db.collection('dbUserBookings').doc(id).get().then(doc=>{

            $('#fname').val(doc.data().fname);
            $('#cadd').val(doc.data().cadd);
            $('#bnum').val(doc.data().bnum);
            $('#rnum').val(doc.data().rnum);
            $('#contact').val(doc.data().contact);
            $('#email').val(doc.data().email);
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

    db.collection('dbUserBookings').doc(id).set({
        fname:$('#fname').val(),
        cadd:$('#cadd').val(),
        bnum:$('#bnum').val(),
        rnum:$('#rnum').val(),
        contact:$('#contact').val(),
        email:$('#email').val(),
        date:$('#date').val(),
        time:$('#time').val(),
        service:$('#service').val(),
        area:$('#area').val(),
        price:$('#price').val(),
        mop:$('#mop').val(),
        status:$('#status').val()

}, {merge:true})

$('#fname').val('');
$('#cadd').val('');
$('#bnum').val('');
$('#rnum').val('');
$('#contact').val('');
$('#email').val('');
$('#date').val('');
$('#time').val('');
$('#service').val('');
$('#area').val('');
$('#price').val('');
$('#mop').val('');

})

frmData.on('submit',(e)=> {
   e.preventDefault();
   
   db.collection('dbUserBookings').add({
       fname:$('#fname').val(),
       cadd:$('#cadd').val(),
       bnum:$('#bnum').val(),
       rnum:$('#rnum').val(),
       contact:$('#contact').val(),
       email:$('#email').val(),
       date:$('#date').val(),
       time:$('#time').val(),
       service:$('#service').val(),
       area:$('#area').val(),
       price:$('#price').val(),
       mop:$('#mop').val(),
       status:$('#status').val()
    })

    $('#fname').val('');
    $('#cadd').val('');
    $('#bnum').val('');
    $('#rnum').val('');
    $('#contact').val('');
    $('#email').val('');
    $('#date').val('');
    $('#time').val('');
    $('#service').val('');
    $('#area').val('');
    $('#price').val('');
    $('#mop').val('');
})

db.collection('dbUserBookings').onSnapshot(snapshot=>{
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
