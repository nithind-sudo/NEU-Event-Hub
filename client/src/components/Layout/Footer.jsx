import Container from "react-bootstrap/Container";

export default function Footer({ fixed }) {
  return (
    <>
      <footer className={`bg-dark py-3 ${fixed ? 'fixed-bottom' : ''}`}>
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
