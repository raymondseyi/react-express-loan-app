import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signin() {
 const [email, setemail] = useState('')
 const [password, setpassword] = useState('')
 const [message, setmessage] = useState({})
 const navigate = useNavigate()
 const signUp = ()=>{
     console.log(email,password)
     if(email&&password){
        let userDetails = {email,password}
        let url = 'http://localhost:4000/users/signin'
        axios.post(url,userDetails)
        .then((response)=>{
            setmessage(response.data)
            if(response.data.status){
                navigate('/dashboard')
            }

        })
        .catch((err)=>{
            console.log(err)
        })
     }
     else{
         alert(`Kindly fill in all details`)
     }
     

 }
  return (
    <>
    <div className="container-fluid">
        <div className="row">
            <div className="col-7 mx-auto shadow-sm">
                <h1 className='text-center'>Sign In</h1>

                <div className='form-floating my-2'>
                            <input 
                                type="text" 
                                className='form-control'
                                placeholder='email'
                                name='email'
                                onChange={(e)=>setemail(e.target.value)}
                            />
                            <label htmlFor="">Email</label>
                </div>
                <div className='form-floating my-2'>
                            <input 
                                type="password" 
                                className='form-control'
                                placeholder='password'
                                name='password'
                                onChange={(e)=>setpassword(e.target.value)}
                            />
                            <label htmlFor="">Password</label>
                </div>
                <button onClick={signUp} className='btn btn-info w-100 py-3'>Sign In</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Signin