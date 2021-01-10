import React from 'react'
// import styles from './login.module.css'

export default class Login extends React.Component {
    handleSubmit = (e) => {
        let msg;
        console.log(this.state)
        e.preventDefault();
        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(res=> {
            console.log(res)
            const msg = res.message
            document.getElementById('login-msg').innerText = msg
        })
        .catch(function (err) { console.log(err) })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        return (
            <div className='container'>
                <h1 id='login-msg'>Login</h1>
                <div className='form'>
                    <form onSubmit={this.handleSubmit} id='form'>
                        {/* <label>Enter email</label><br></br> */}
                        <input type="text" id="email" placeholder="Enter email" onChange={this.handleChange} />
                        <br></br>
                        {/* <label>Enter password</label><br></br> */}
                        <input type="password" id="password" placeholder="Enter password" onChange={this.handleChange} />
                        <br></br>
                        <label id="labelRole">Enter role</label><br></br>
                        <input type="radio" id="role" value="student" onChange={this.handleChange} />
                        <label htmlFor="role">Student</label><br></br>
                        <input type="radio" id="role" value="teacher" onChange={this.handleChange} />
                        <label htmlFor="role">Teacher</label>
                        <br></br>
                        <button className='submit'>Submit</button>
                    </form>
                </div>
                < style jsx >
                    {`
                        .container{
                            margin: 20px auto;
                            border-radius: 7%;
                            box-shadow: 1px 1px 20px 2px #ccc;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            width: 20%;
                            padding-top: 20px;
                            padding-bottom: 40px;
                            margin-top: 150px;
                        }
                        
                        h1 {
                            text-align: center;
                        }
                        .form {
                            display: flex;
                            justify-content: center;
                        }

                        input {
                            border: 0.5px solid #ccc;
                            border-radius: 2px;
                            padding: 4px;
                            padding-left: 10px;
                            margin-bottom: 15px;
                            font-size: 1rem;
                        }

                        #labelRole {
                            text-align: center;
                        }

                        .submit {
                            margin-left: 30%;
                            padding: 10px;
                            border-radius: 1px;
                            text-decoration: none;
                            border: none;
                            box-shadow: 1px 1px 10px 2px #ccc;
                            background-color: #a5bfed
                        }
                        
                        
            `}
                </style>
            </div>
        )
    }
}