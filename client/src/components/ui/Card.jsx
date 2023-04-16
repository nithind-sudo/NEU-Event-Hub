import { Card, Container } from "react-bootstrap";
import Button from "./Button";
import { Children } from "react";
export default function MyCard({title, text, className, handleClick1, username, pnumber, Ctitle, children, ...props}){
 
    return <>
        <Container>
            <Card  className={className} {...props}>
                <Card.Body>
                   <Card.Title>{title}</Card.Title>
                    <hr/>
            <Card.Subtitle>
                Email Address : 
                {username}
            </Card.Subtitle>
            <hr/>
            <Card.Text>
                Phone No : {pnumber}
            </Card.Text>
            <hr/>
            
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
                {children}
            </Card>
        </Container>
    </>
};