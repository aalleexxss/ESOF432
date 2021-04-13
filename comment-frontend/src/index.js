import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import swal from 'sweetalert';
// import Swal from "emittery";
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
//
// const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger'
//     },
//     //buttonStyling: false
// })
//
// swalWithBootstrapButtons.fire({
//     title: 'Are you sure you want to delete your comment?',
//     showCancelButton: true,
//     confirmButtonText: 'Yes',
//     cancelButtonText: 'No',
//     reverseButtons: true
// }).then((result) => {
//     if (result.isConfirmed) {
//         swalWithBootstrapButtons.fire(
//             'Comment deleted!'
//         )
//     } else {
//         swalWithBootstrapButtons.fire(
//             'Comment not deleted!'
//         )
//     }
// })

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();