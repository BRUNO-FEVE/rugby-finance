import * as React from "react";

interface EmailTemplateProps {
  name: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
}) => (
  <div className="text-red-500 font-thin text-5xl">
    Teste <br /> Tudo bem {name}??????
  </div>
);
