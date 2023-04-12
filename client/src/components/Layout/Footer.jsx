import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <>
      <footer className="bg-dark py-3">
        <Container>
          <div className="text-center">
            <p className="mb-0 text-light">
              &copy; {new Date().getFullYear()} Made by Web Design Team. All
              rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
