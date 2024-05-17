import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  meses: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  meses,
}) => (
  <Html>
    <Head />
    <Preview>Pagamento da mensalidade do Rugby Mauá</Preview>
    <Tailwind>
      <Body className="w-full h-full p-0">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          className="bg-[#3a5a40] h-[100px] pl-24"
        >
          <Text className="text-white font-sans font-[700] text-[36px] my-auto">
            🏉 Rugby Mauá
          </Text>
        </div>
        <Container className="bg-white w-full h-full">
          <Section className="px-10">
            <Text>Olá {name}</Text>
            <Text>
              Estamos entrando em contato para lembrá-lo sobre o pagamento da
              mensalidade do Rugby Mauá. Notamos que você não efetuou o
              pagamento dos seguintes meses: <strong>{meses}</strong>
            </Text>
          </Section>
          <Hr />
          <Section className="px-10">
            <Text className="font-bold">Formas de Pagamento: </Text>
            <Text>
              Mesal: 30 R$ <br /> Semestral: 130 R$ <br /> Anual: 250 R$
            </Text>
          </Section>
          <Section className="px-10">
            <Text className="font-bold">Instruções: </Text>
            <Text>
              O pagamento deve ser feito via pix no pix: 11996019114 (número da
              Canada). Após o pagamento enviar compovante para via Whatzap para
              eles iram dar baixa no sistema: <br />
              <br /> - Fevs: (11) 95770-5558 <br /> - Canada: (11) 99601-9114{" "}
            </Text>
          </Section>
          <Hr />
          <Section className="px-10">
            <Text className="font-bold">Observação: </Text>
            <Text>
              O pagamento da mensalidade é de extrema importância para o nosso
              time. No entanto, se você estiver enfrentando dificuldades
              financeiras ou tiver alguma justificativa, por favor, nos informe
              para que possamos entender sua situação.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

{
  /* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            className="bg-[#3a5a40] h-[100px] pl-24"
          >
            <Text className="text-white font-sans font-[700] text-[36px] my-auto">
              🏉 Rugby Mauá
            </Text>
          </div> */

  {
    /* <Img
          src={`${baseUrl}/app/assets/rugby-maua-logo.png`}
          width="88"
          height="88"
        /> */
  }
}
