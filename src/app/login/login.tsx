import React, {Component} from 'react';
import {Container, InputAdornment, Slide, TextField, Button, IconButton} from '@material-ui/core';
import './login.scss';
import {Visibility, VisibilityOff} from  '@material-ui/icons';


// interface State {
//     username: string,
//     password: string,
//     showPassword: boolean
// }
export default class LoginScreen extends Component<any , any> {

    constructor(props: any){
        super(props);
        this.state= {
            showPassword: false, 
            password:'',
            username: ''
        }
    }

    handleChange = (field: string) =>(event: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({[field]: event.target.value})
    }

    onLogin = () => {
        if(this.state.username && this.state.password){
            const user = {
                username: this.state.username
            }
            localStorage.setItem('user', JSON.stringify(user));
            this.props.history.replace( '/' );
        }
    }

    render () {
        return (
            <Container className="login-screen">
                <form onSubmit= {(e)=>{this.onLogin()}}>
                    <TextField
                        id="outlined-username-input"
                        label="Username"
                        type="text"
                        name="username"
                        margin="normal"
                        variant="outlined"
                        value= {this.state.username}
                        onChange={this.handleChange('username')}
                        autoFocus
                        required
                    />
                    <TextField
                        id="outlined-adornment-password"
                        variant="outlined"
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={() => { this.setState({ showPassword: !this.state.showPassword }) }}>
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <span className="forget-password text-grey">Forgot Password?</span>
                    <Button variant="contained" color="primary"  type="submit">SIGN IN</Button>
                    </form>
            </Container>
        );
    }
}
