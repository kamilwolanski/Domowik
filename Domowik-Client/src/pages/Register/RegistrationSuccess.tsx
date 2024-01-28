import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'reactstrap';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fromRegister = location.state?.from === 'register';
    if (!fromRegister) {
      navigate(-1);
    }
  }, [location.state?.from, navigate]);

  return (
    <Container>
      <Row>
        <Col xs="12" md={{ size: 8, offset: 2 }}>
          <div className="text-center">
            <h1>Gratulacje!</h1>
            <h2>
              Twoje konto zostało pomyślnie utworzone. Witamy w naszej
              społeczności! Teraz możesz zalogować się i cieszyć się wszystkimi
              funkcjonalnościami naszej platformy
            </h2>
            <Link to="/auth/login">
              <Button size="lg" color="primary" className="mt-5">
                Przejdz do logowania
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationSuccess;
