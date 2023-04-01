import Container from "react-bootstrap/Container";

export default function Footer(){
    return <>
        <footer className="bg-light py-3 fixed-bottom">
        <Container>
          <div className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Made by Nithin Bharadwaj. All rights
              reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
}