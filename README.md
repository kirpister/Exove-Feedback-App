<h1>Exove's Feedback Project</h1>

<p>Application is being built as part of Business College Helsinki Full Stack Developer program. App was ordered by our partner company Exove to help HR to collect employee feedback for yearly performance appraisals with the help of some automation. </p>

<br/>

<h2>App features</h2>

- Authentication
- Roles for Admin and User
- User create feedback's request to HR/Admin (list of other users, User want their feedback)
- Admin will send out assessment form to collect feedback for colleagues (base on userlist which was sent by User)
- Admin can send reminders to those who have yet to give feedback
- Admin can see assessment form results and convert them into graphs than can be turned into printable PDFs
- User will receive and fill out assessment forms about their coworkers
- User will see request to give feedback once logged in


<br/>
<h2>Contributors</h2>

| Name           | Github                                                    |
| -------------- | ---------------------------------------------------------- |
| Jenni          | 🇫🇮 👉(<a href='https://github.com/kirpister'>link</a>)     |
| Marina         | 🇷🇺 👉 (<a href='https://github.com/marinezh'>link</a>)     |
| Preeti Agrawal | 🇮🇳 👉(<a href='https://github.com/preetiag18'>link</a>)    |
| Tuan Dao       | 🇻🇳 👉 (<a href='https://github.com/TuanDao-0110'>link</a>) |

<br/>

<h2>Technologies Used</h2>

|                   |                            |
| ----------------- | -------------------------- |
| Front-End         | React with Typescript      |
| Back-End          | Node/Express in Typescript |
| UI                | Bootstrap, Module Css      |
| State managerment | Redux                      |
| Database          | MongoDB                    |

<br/>

<h2>Set up</h2>

1. Project needs to set up all modules from the beginning:

```
npm run install:All
```

2. Run Front-End independently

```
npm run start:front_end

```

3. Run Back-End independently

```

npm run start:back_end

```

4. Run All Project:

```
npm run start:All
```

5. Finnish Build UI:

```
npm run build:All

```

<br/>
<h2>Feedback data types: </h2>


1. question type:
```ts
type Question = {
  question: string;
  isFreeForm: boolean;
}
```
2. Section types:
```ts
type Section = {
  name: string;
  description?: string;
  questions: Question[]; 
}
```

3. Feedback questions type:

```ts

type FeedBackQuestions = {
  sections: Section[];
}
```
