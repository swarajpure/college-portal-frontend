const CreatePost = () => {
    return(
        <div className='container'>
            <input id='msgBody' type='text' placeholder='Enter your message here!'></input>
            <button type='submit'>Post</button>
            <style jsx>
                {`
                    .container {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;

                    }
                    
                    #msgBody {
                        width: 40%;
                        margin: 10% auto 5% auto;
                        height: 40vh;
                        border-radius: 15px;
                        box-shadow: 0 0 15px -7px rgba(0,0,0,.65);
                        padding: 100px;
                    }

                    button {
                        width: 10%;
                        margin: 0 auto;
                    }
                `}
            </style>
        </div>
    )
}

export default CreatePost