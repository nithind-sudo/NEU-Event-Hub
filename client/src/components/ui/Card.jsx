import { Card, Container } from "react-bootstrap";

export default function MyCard({title, text, style, ...props}){
    return <>
        <Container>
            <Card style={style} {...props}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    </>
};