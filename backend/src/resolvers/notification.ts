import { ADMIN_EMAIL, DOMAIN_EMAIL, TITLE_EMAIL, TRANSPORTER } from '../constants/email';
import { Profile, User } from '../models';

const resolvers = {
  Mutation: {
    sendDebtNotification: async (_: void, { userId }: { userId: string }): Promise<void> => {
      try {
        const user = await User.findById(userId).populate('profile');

        if (user) {
          const mailOptions = {
            from: `${TITLE_EMAIL} ${DOMAIN_EMAIL}`,
            to: user.email,
            replyTo: user.email,
            subject: 'Задолжность по оплате школы иностранных языков CWLang',
            html: `<h2>Добрый день, ${user.name}! </h2>
                  <h3>Мы очень рады, что вы являетесь учеником нашей школы иностранных языков.</h3>
                  <p>У вас есть задолжность по оплате в размере ${user.profile.debt}$. Просим погасить долг в ближайшее время.</p>
                  <img src="https://speakt.com/wp-content/uploads/2018/09/top-10-languages-used-on-the-internet.png" alt="image">`,
          };

          TRANSPORTER.sendMail(mailOptions, (error: Error | null) => {
            if (error) {
              throw error;
            }
          });
        }
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    sendQuestionToAdmin: async (_: void, { userId, message }: { userId: string; message: string }): Promise<void> => {
      const user = await User.findById(userId).populate('profile');

      if (user) {
        const mailOptions = {
          from: `${TITLE_EMAIL} ${DOMAIN_EMAIL}`,
          to: ADMIN_EMAIL,
          replyTo: user.email,
          subject: 'Ответы на вопросы',
          html: `<h2>Добрый день!</h2>
                <p>Дайте ответ на вопрос ниже пользователя
                  <span style="font-weight: 700;">
                    ${user.name} ${user.surname}
                  </span>
                  ${user.email}
                </p>
                <br>
                <p style="font-style: italic;">${message}</p>
                <img src="https://www.fluentu.com/blog/chinese/wp-content/uploads/2017/08/chinese-question-words-1024x683.jpg" alt="image">`,
        };

        TRANSPORTER.sendMail(mailOptions, (error: Error | null) => {
          if (error) {
            throw error;
          }
        });
      }
    },
  },
};

export default resolvers;
