import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

resend.domains.create({ name: "rugbymaua.com" });

export { resend };
