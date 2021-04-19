import * as React from "react";
import { Row, Col, Typography } from "refinejs";

const { Title } = Typography;

export const ReadyPage: React.FC = () => {
    return (
        <Row
            align="middle"
            justify="center"
            style={{
                height: "100vh",
                color: "#565656",
                background:
                    "linear-gradient(135deg, #D5D5A4 0%, #C6C6AD 50%, #D0D0CD 100%)",
            }}
        >
            <Col style={{ textAlign: "center" }}>
                <Title>readmin</Title>
                <Title level={2}>Welcome to readmin</Title>
                <p style={{ marginBottom: 0 }}>
                    Your application is properly configured.
                </p>
                <p>
                    Now you can add a &lt;Resource&gt; as child of
                    &lt;Admin&gt;.
                </p>
            </Col>
        </Row>
    );
};
