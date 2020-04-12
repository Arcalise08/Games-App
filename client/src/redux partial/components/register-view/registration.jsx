import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Animated from 'react-css-animated';

import "react-datepicker/dist/react-datepicker.css";

export function RegisterView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState(new Date());
    const [ validated, setValidated ] = useState(false);
    const [ show, setShow] = useState(false);
    const [ regError, setregError ] = useState('')

    const handleSubmit = (e) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        if (form.checkValidity() === true) {
            event.preventDefault();
            e.preventDefault();
            axios.post('https://opgamesapi.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                props.redirect('/login', 700, false); 
            })
            .catch(e => {
                console.log('error registering user')
                const listErr = e.response.data.errors.map((msg) => <li key={msg.value}>{msg.msg}</li>)
                console.log(e.response.data)
                setregError(listErr)
                setShow(true)
            });
        }
    };

        return (
            <Animated className='p-3 mt-5 pt-3 col-lg-6 mx-auto' animateOnMount animationIn="fadeInLeft" duration={{in:600}} animationOut="fadeOutRight" isVisible={props.animate}>
                <Form className='' noValidate validated={validated} onSubmit={handleSubmit}>
                    <Alert show={show} className='mt-2' variant="danger" onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>Registration Errors!</Alert.Heading>
                        <ul>{regError}</ul>
                    </Alert>
                    <h1 className='text-center mb-5'>Register</h1>
                <Form.Row>
                    <Form.Group as={Col} controlId="ValidationCustom01">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                            required
                            type="Text"
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid Username
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} controlId="ValidationCustom02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid Password
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                <Form.Group as={Col} controlId="ValidationCustom03">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                            required
                            type="Email"
                            placeholder="Enter email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid Email
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="ValidationCustom04">
                    <Form.Label className='mb-2 col'>Birthday</Form.Label>
                    <DatePicker
                        selected={birthday}
                        className='form-control'
                        onChange={date => setBirthday(date)}
                        popperClassName="some-custom-class"
                        popperPlacement="top-end"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        popperModifiers={{
                            offset: {
                            enabled: true,
                            offset: "-50px, 0"
                            },
                            preventOverflow: {
                            enabled: true,
                            escapeWithReference: false,
                            boundariesElement: "viewport"
                            }
                        }}
                        />

                    </Form.Group>
                </Form.Row>
                <small className='text-center d-block mt-4'>Basic validation implimented</small>
                <Button className='d-block mx-auto mt-2' variant="primary" type="submit">
                    Submit
                </Button>

                </Form>
            </Animated>
        );
    }
/*                   <DatePicker 
                        
                        selected={birthday}
                        onChange={date => setBirthday(date)}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        inline
                    />
                    */