import React,{useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from "yup" 
import axios from "axios" 
import {useNavigate} from "react-router-dom"



function Signup() {
    const [message, setmessage] = useState('')
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            phonenumber:'',
            address:''
        },
        onSubmit:(values)=>{
            const url ='http://localhost:4000/users/signup'
            axios.post(url,values)
            .then((response)=>{
                setmessage(response.data)
                if(response.data.status){
                    navigate('/signin')
                }
                console.log(response)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('Required'),
            lastname: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Must be an email'),
            password: Yup.string().required('Required'),
            phonenumber: Yup.string().required('Required').matches(/^[\d]{11}$/,'Must be 11 Numbers'),
            password: Yup.string().required('Required'),

        })
    })
  return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-8 mx-auto shadow-sm mt-4">
                    <h1 className='text-center py-2'>Sign Up </h1>
                    <div className={message.status?'text-success text-center':'text-danger text-center'}>{message.message}</div>
                    <form onSubmit={formik.handleSubmit}>
                    <div className='form-floating'>
                        <input 
                            type="text" 
                            className={formik.errors.firstname && formik.touched.firstname?'form-control is-invalid my-2':'form-control my-2' }
                            placeholder='firstname'
                            name='firstname'
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div className='text-danger'>{formik.touched.firstname&&formik.errors.firstname}</div>
                        <label htmlFor="">First Name</label>
                    </div>
                    <div className='form-floating'>
                        <input 
                            type="text" 
                            className='form-control my-2' placeholder='lastname' 
                            name='lastname'
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div className='text-danger'>{formik.touched.lastname&&formik.errors.lastname}</div>
                            
                        <label htmlFor="">Last Name</label>
                    </div>
                    <div className='d-flex'>
                        <div className='form-floating w-100 me-1'>
                            <input 
                                type="text" 
                                className='form-control my-2 ' placeholder='email' 
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className='text-danger'>{formik.touched.email&&formik.errors.email}</div>
                            <label htmlFor="">Email</label>
                        </div>
                        <div className='form-floating w-100 ms-1'>
                            <input 
                                type="text" 
                                className='form-control my-2' placeholder='phonenumber' 
                                name='phonenumber'
                                value={formik.values.phonenumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className='text-danger'>{formik.touched.phonenumber&&formik.errors.phonenumber}</div>
                            <label htmlFor="">Phone Number</label>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div className='form-floating w-100 me-1'>
                            <input 
                                type="text" 
                                className='form-control my-2' placeholder='address' 
                                name='address'
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className='text-danger'>{formik.touched.address&&formik.errors.address}</div>
                            <label htmlFor="">Address</label>
                        </div>
                        <div className='form-floating  w-100 ms-1'>
                            <input 
                                type="text" 
                                className='form-control my-2' placeholder='password' 
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className='text-danger'>{formik.touched.password&&formik.errors.password}</div>
                            <label htmlFor="">Password</label>
                        </div>
                    </div>
                    <button  className='btn btn-info w-100 py-3 my-2' type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Signup