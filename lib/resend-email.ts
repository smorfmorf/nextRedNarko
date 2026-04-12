import { Resend } from 'resend';

const resend = new Resend('re_ZQUTvqb6_LxL9oTDdQS7E5C6UwVapNxat');

resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'malalamobilelegends@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});