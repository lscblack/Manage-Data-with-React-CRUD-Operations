import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Modal({ data, check }){
	const goto = useNavigate()
	const [values, setValues] = useState({ 'name': '', 'email': '', 'phone': '' });
	useEffect(() => {
	    if (check !=2) {
	        setValues({ ...values, 'name': data.name, 'email': data.email, 'phone': data.phone });
	    }else{
	        setValues({ ...values, 'name': '', 'email': '', 'phone': '' });
	    }
	}, [data]); // Run this effect whenever 'data' changes
	const handleSubmit = (event) =>{
		event.preventDefault()
		if(check ==2){
			axios.post("http://localhost:8080/add_record", {values})
			.then(res =>{
				if(res.data.data == "Successfully added Record"){
					alert(res.data.data)
					window.location.reload()
				}else{
					console.log(res.data)
				}
			})
			.catch(error => console.log(error))
		}else{
			axios.post("http://localhost:8080/update_record", {values, id:data.id})
			.then(res =>{
				if(res.data.data == "Successfully Update Record"){
					alert(res.data.data)
					window.location.reload()
				}else{
					console.log(res.data)
				}
			})
			.catch(error => console.log(error))
		}
	}
	const handelInput = (event) =>{
		setValues({...values,[event.target.name]: event.target.value});
	}
	return (
		<div id="modal" Style="background:rgba(0,0,0,0.5);display:none;position:fixed;top:0;width:100%;height:100%;left:0">
			<form className="card w-50  p-3" Style="margin:100px auto" onSubmit={handleSubmit}>
			<div className="alert alert-info">
			{check !=2 ? 
				<h2>Update User</h2>
				:
				<h2>Register New User</h2>
			}
			</div>
			<div className="card-body p-3">
				<input placeholder="Enter Your Name" onChange={handelInput} value={values.name} name="name" className="form-control" required/>
			</div>
			<div className="card-body p-3">
				<input placeholder="Enter Your Email" onChange={handelInput} value={values.email} name="email" className="form-control" required/>
			</div>
			<div className="card-body p-3">
				<input placeholder="Enter Your Phone" onChange={handelInput} value={values.phone} name="phone" className="form-control" required/>
			</div>
			<div className="card-body p-3 d-flex justify-content-center gap-3">
			{check !=2 ? 				
				<button className="btn btn-success ">Update User <i className="fa fa-user-plus"></i></button>
			:
				<button className="btn btn-primary ">Add New User <i className="fa fa-user-plus"></i></button>
			}
				<button className="btn btn-danger" type="button" onClick={()=> document.querySelector('#modal').style.display = 'none'}>Close Modal <i className="fa fa-times"></i></button>
			</div>
			</form>
		</div>
		)
}
export default Modal