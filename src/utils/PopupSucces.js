import swal from 'sweetalert';

const PopupSucces =() =>{
    const popupsuccess = document.querySelector("#popupGood");
    let popup;
    
    popup=`<div classs="container p-5">
	<div class="row no-gutters fixed-top">
		<div class="col-lg-5 col-md-12">
			<div class="alert alert-success fade show" role="alert">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    	<span aria-hidden="True">&times;</span>
			  	</button>
			 	<h4 class="alert-heading">Well done!</h4>
			  	<p>This is an alert within a column. The column can be made any size at different viewpoints.</p>
			</div>
		</div>
	</div>
    </div>`;
    //alert("Congratulation! You're sign in!");
	swal("Congratulation!", "You're sign in!", "warning");
	
   // popupsuccess.innerHTML = popup;
};




export default PopupSucces;
