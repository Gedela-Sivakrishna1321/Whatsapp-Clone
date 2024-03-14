import { Alert, Button, Snackbar } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { register, reqUser } from '../../Redux/Auth/Action';

const Signup = () => {
    const [inputData, setInputData] = useState({full_name: "", email: "", password: "" });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth} = useSelector(store => store);
    const token = localStorage.getItem("token");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form values submitted ..");
        console.log("Values - ", inputData);
        dispatch(register(inputData))
        setOpenSnackbar(true);
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setInputData((values) => ({...values, [name] : value}));
    }

    function handleSnackbarClose() {
        setOpenSnackbar(false);
    }

    useEffect(()=>{
        if(token) 
            dispatch(reqUser(token))
    },[token])

    useEffect(()=>{
      //  console.log("Executed...!")
        if(auth.reqUser?.full_name) {
      //      console.log("Auth reqUser Full Name - ",auth.reqUser?.full_name);
            navigate("/")
        }
    },[auth.reqUser])

    return (
        <div>
            <div className='flex items-center justify-center h-screen w-screen'>
                <div className='shadow-md w-[30%] p-10 bg-white' >
                    <form onSubmit={handleSubmit} className='space-y-5' >

                       <div>
                            <p className='mb-2' >Full Name </p>
                            <input
                                type="text"
                                placeholder='Enter your full name'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                name='full_name'
                                value={inputData.full_name}
                                className='py-2 outline outline-green-600 w-full border rounded-md'
                            />
                        </div>

                        <div>
                            <p className='mb-2' >Email id </p>
                            <input
                                type="text"
                                placeholder='Enter your email address'
                                onChange={(e) => {
                                    handleChange(e)
                                }} 
                                name='email'
                                value={inputData.email}
                                className='py-2 outline outline-green-600 w-full border rounded-md'
                            />
                        </div>

                        <div>
                            <p className='mb-2'>Password </p>
                            <input
                                type="password"
                                placeholder='Enter your password'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                name='password'
                                value={inputData.password}
                                className='py-2 outline outline-green-600 w-full border rounded-md'
                            />
                        </div>

                        <div>
                            <Button type='submit' sx={{ bgcolor: green[700], padding: '0.5rem 0rem' }} className='w-full bg-green-600 ' variant='contained' >Sign In</Button>
                        </div>
                    </form>

                    <div className='flex items-center mt-5 space-x-3' >
                        <p className='m-0' >Already have Account</p>
                        <Button variant='text' onClick={() => navigate("/signin")} >Sign In</Button>
                    </div>

                </div>
            </div>

            {/* Snackbar  */}

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Your account created successfully !
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Signup