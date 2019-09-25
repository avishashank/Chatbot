import React, {Component} from 'react';
import {Container, InputAdornment, Slide, TextField, Button, IconButton, Box} from '@material-ui/core';
import './login.scss';
import {Visibility, VisibilityOff} from  '@material-ui/icons';
import ErrorDialog from '../common/error-dialog';


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
            username: '',
            errorDiaog: false
        }
    }

    handleChange = (field: string) =>(event: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({[field]: event.target.value})
    }

    onLogin = () => {
        this.setState({errorDiaog: false})
        if(this.state.username && this.state.password) {
            if(this.state.username === 'demo' && this.state.password == "demo") {
                const user = {
                    username: this.state.username
                }
                localStorage.setItem('user', JSON.stringify(user));
                this.props.history.replace( '/' );
            }
            else {
                this.setState({errorDiaog: true})
            }
        }
    }

    render () {
        return (
            <Box p={3}>
                {this.state.errorDiaog && <ErrorDialog  errorDiaog = {this.state.errorDiaog}/>}
            <Container className="login-screen">
                <form onSubmit= {(e)=>{
                    e.preventDefault();
                     this.onLogin()}}>
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
            </Box>
        );
    }
}
