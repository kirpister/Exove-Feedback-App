<h1>Exove's Feedback Project</h1>

<p>Application is being built as part of Business College Helsinki Full Stack Developer program. App was ordered by our partner company Exove to help HR to collect employee feedback for yearly performance appraisals with the help of some automation. </p>

<br/>

<h2>User Store</h2>

1. [x] Project have login / register.
2. [x] Admin role can create feedback and send feedback request to selected other users.
3. [x] User (not admin) will receives feedback's anwers request, once Admin created and send it.
4. [x] User will see all feedback's answer request, once user logged in. 
5. [x] Admin wil see feedback's result.
6. [x] Admin will can request feedback request to users who have finished feedback's answer. 
7. [x] Admin can export and get feedback's graph analysis.
8. [x] Admin can set up other user roles to Admin.


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

<h2>Set up </h2>

1. Project need to set up all module from the begining:

```
npm run install:ALl
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
