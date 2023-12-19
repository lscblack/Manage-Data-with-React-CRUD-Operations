import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

function ViewTables() {
    const [users, setUser] = useState([]);
    const [which , update] = useState(2)
    const [data, setData] = useState({ name: '', email: '', phone: '' });
    useEffect(() => {
        axios.get("http://localhost:8080/view")
            .then(res => {
                setUser(res.data.data); // Assuming res.data.data is the array of users
            })
            .catch(error => console.log(error));

    }, []);
    const DeleteUser = (id) => {
        axios.post("http://localhost:8080/delete", {id})
        .then(res =>{
        	if(res.data.data == "Successfully Remove Record"){
        		setUser(users.filter(user => user.id != id))
        		alert(res.data.data)
        	}else{
        		alert(res.data.data)
        	}
        })
        .catch(error => console.log(error))
    }
    function show_modal(){
    	update(2)
    	document.querySelector('#modal').style.display = 'block';
    }
    
    function updateUser(id, name, email, phone){
    	 update({id, name, email, phone})
    	 setData({ ...data, id, name, email, phone });
    	 document.querySelector('#modal').style.display = 'block';
    }

    return (
        <>
        	{which == 2?<Modal check="2" data={false} />: <Modal check="false" data={data} />}
        	<div className="table-responsive">
        		<div className="d-flex justify-content-center align-items-center gap-3">
        			<h2>All Users In The System </h2>
        			<button className="btn btn-primary " onClick={()=> show_modal()}>Add New User <i className="fa fa-user-plus"></i></button>
        		</div>
        		<p></p>
        		<table  className="table table-striped table-hover table-bordered ">
        			<thead>
        				<tr>
        					<th>id</th>
        					<th>Name</th>
        					<th>Email</th>
        					<th>Phone</th>
        					<th colSpan="2">Actions</th>
        				</tr>
        			</thead>
        			<tbody>
        			    {users.map(user => (
        			        <tr key={user.id}>
        			        <td>{user.id}</td>
        			        <td>{user.name}</td>
        			        <td>{user.email}</td>
        			        <td>{user.phone}</td>
        			        <td><button className="btn btn-danger btn-sm" onClick={()=>DeleteUser(user.id)}>Delete <i className="fa fa-trash"></i></button></td>
        			        <td><button className="btn btn-success btn-sm" onClick={() => updateUser(user.id, user.name, user.email, user.phone)}>Update <i className="fa fa-edit"></i></button></td>
        			        </tr>
        			    ))}
        			</tbody>
        		</table>

        	</div>
		</>
    );
}

export default ViewTables;
