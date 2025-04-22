import React from "react";
import { Card, Row, Col, Button, Typography, Avatar } from "antd";
import IMG from '../../assets/mediconnectlogo.png'
const { Title, Paragraph } = Typography;

const services = [
  {
    title: "Orthopedics",
    description:
      "Monitor your child’s growth and development to ensure their health at every stage.",
  },
  {
    title: "Gastroenterology",
    description:
      "Evaluate your digestive system to manage and treat digestive conditions.",
  },
  {
    title: "Cardiology",
    description:
      "Analyze heart health and provide care to treat cardiovascular diseases.",
  },
];

const stats = [
  { label: "Satisfaction Rate", value: "98%" },
  { label: "Years Experience", value: "30+" },
  { label: "Patients Treated", value: "1.2k+" },
  { label: "Expert Doctor", value: "80" },
];

const experts = [
  { name: "Maxine Davis", specialty: "Dermatologist" },
  { name: "John Smith", specialty: "Cardiologist" },
  { name: "Rachel Lee", specialty: "Neurologist" },
  { name: "David Kim", specialty: "Pediatrician" },
  { name: "Sarah Johnson", specialty: "General Physician" },
];

const testimonials = [
  {
    name: "Maria Theresa",
    feedback:
      "Our experience with the pediatric team has been wonderful. They provide incredible support and always make my children feel comfortable during their visits. We couldn't be happier!",
    service: "Pediatric Care",
  },
];

export const Home = ()=> {
  return (
    <div className="" style={{ padding: "40px" }}>
      {/* Hero Section */}
      <Row gutter={32} align="middle">
        <Col xs={24} md={12}>  
          <Typography>
            <Paragraph type="secondary">Welcome to Healthcare</Paragraph>
            <Title>
              Get <span style={{ color: "#722ed1" }}>Premium Medical Care</span>{" "}
              For Your Health
            </Title>
            <Paragraph>
              Experience compassionate and personalized care tailored to your
              needs.
            </Paragraph>
            <Button type="primary" size="large">
              Make Schedule
            </Button>
          </Typography>
        </Col>
        <Col xs={20} md={8}>
          <img
            src={IMG}
            alt="Doctor"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Col>
      </Row>

      {/* Services Section */}
      <Title level={2} style={{ marginTop: "60px", textAlign: "center" }}>
        Quality Healthcare Services You Can Trust
      </Title>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {services.map((service, idx) => (
          <Col key={idx} xs={24} md={8}>
            <Card title={service.title} bordered={false}>
              <p>{service.description}</p>
              <a href="#">Learn More →</a>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Stats Section */}
      <Row gutter={16} justify="center" style={{ marginTop: "60px" }}>
        {stats.map((stat, idx) => (
          <Col key={idx} xs={12} md={6} style={{ textAlign: "center" }}>
            <Title level={3} style={{ color: "#722ed1" }}>
              {stat.value}
            </Title>
            <Paragraph>{stat.label}</Paragraph>
          </Col>
        ))}
      </Row>

      {/* Experts Section */}
      <Title level={2} style={{ marginTop: "60px", textAlign: "center" }}>
        Meet Our Expert Medical Team Of Dedicated Specialists
      </Title>
      <Row gutter={16} justify="center" style={{ marginTop: "20px" }}>
        {experts.map((expert, idx) => (
          <Col key={idx} xs={12} md={4}>
            <Card bordered={false} style={{ textAlign: "center" }}>
              <Avatar
                size={80}
                src="/doctor-avatar.png"
                style={{ marginBottom: "10px" }}
              />
              <Title level={4}>{expert.name}</Title>
              <Paragraph type="secondary">{expert.specialty}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Testimonials Section */}
      <div
        style={{
          background: "#f9f0ff",
          padding: "40px",
          marginTop: "60px",
          borderRadius: "12px",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Caring For 2,000+ Families Across The Country
        </Title>
        <Row gutter={24} align="middle" justify="center">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar size={100} src="/testimonial-avatar.png" />
          </Col>
          <Col xs={24} md={12}>
            {testimonials.map((t, idx) => (
              <div key={idx}>
                <Paragraph style={{ fontStyle: "italic", fontSize: "16px" }}>
                  “{t.feedback}”
                </Paragraph>
                <Title level={4}>{t.name}</Title>
                <Paragraph type="secondary">{t.service}</Paragraph>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}
