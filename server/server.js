express = require('express')
mysql = require('mysql')
cors = require('cors')

db = mysql.createConnection({host:'',user:'root',password:'',database:'Test_bank'})
const app = express()

app.use(express.json())
app.use(cors())

//route
app.get('/view',(req, res)=>{
	sql = "SELECT * FROM `users`"
	db.query(sql, (error, data) =>{
		if (error) {
	 		res.json({"error":"Erro Happened"})
		}else{
	 		return res.json({"data":data})
		}
	})
})

// delete user

app.post("/delete", (req, res) =>{
	sql = "DELETE FROM `users` WHERE id=?"
	db.query(sql, req.body.id,(error, data) =>{
		if (error) {
			res.json({'error':"Error While Removing Record"})
		}else{
			res.json({'data':"Successfully Remove Record"})
		}
	})
})

// add record

app.post("/add_record", (req,res) =>{
	sql = "INSERT INTO `users`( `name`, `email`, `phone`) VALUES (?,?,?)"
	values = ([req.body.values.name, req.body.values.email, req.body.values.phone])
	db.query(sql, values,(error, data) =>{
		if (error) {
			res.json({'error':"Eroor While Inserting your data"})
		}else{
			res.json({'data':"Successfully added Record"})
		}
	})
})

// Update record

app.post("/update_record", (req,res) =>{
	sql = "UPDATE `users` SET `name`=?,`email`=?,`phone`=? WHERE `id`=?"
	values = ([req.body.values.name, req.body.values.email, req.body.values.phone, req.body.id])
	db.query(sql, values,(error, data) =>{
		if (error) {
			res.json({'error':"error while updating your data"})
		}else{
			res.json({'data':"Successfully Update Record"})
		}
	})
})
app.listen(8080, ()=>{
	console.log("Server Is Runing Ready To ")
});



