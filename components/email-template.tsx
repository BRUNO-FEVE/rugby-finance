"use server";

import * as React from "react";

interface EmailTemplateProps {
  name: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
}) => (
  <div>
    Teste <br /> Tudo bem??? {name}
  </div>
);
