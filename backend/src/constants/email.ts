import nodemailer from 'nodemailer';

export const TITLE_EMAIL = 'Школа иностранных языков CWLang';

export const DOMAIN_EMAIL = 'evgeniya375447249020@gmail.com';
export const ADMIN_EMAIL = 'evgeniya.nice@mail.ru';

export const TRANSPORTER = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: DOMAIN_EMAIL,
    pass: 'mironicam',
  },
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  tls: { rejectUnauthorized: false },
});
