import swal from 'sweetalert';



function PopupError(message){
    swal("Something went wrong",message,"error");
}


export default PopupError;