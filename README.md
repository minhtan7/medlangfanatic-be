# Med Lang Fanatic | Back end 1 - Course/Blog
Med Lang Fanatic is an innovative medical English course platform designed for medical professionals and students looking to enhance their English skills in the medical field. The Vietnam-based start-up offers a wide range of engaging courses and valuable resources to help users elevate their medical English proficiency.

This comprehensive project consists of a frontend repository and two backend repositories (Backend 1 and Backend 2).

### Link Website: [medlangfanatic](https://www.medlangfanatic.com)

### Table of Content:
- [Repositories](#Repositories)
- [Features](#Features)
- [Tech Stack](#Tech-Stack)
- [Backend 1 - Course/Blog](#Backend-1)
- [Backend 2 - Quiz](#Backend-2)
- [Developing Features](#Developing-Features)

## Repositories
- **Frontend:** [Frontend Repository](https://github.com/minhtan7/medlangfanatic-fe-nextjs)
- **Backend 1 - Course/Blog:** [Backend Repository 1](https://github.com/minhtan7/medlangfanatic-be)
- **Backend 2 - Quiz:** [Backend Repository 2](https://github.com/minhtan7/mlf-quiz-app-be)


## Features
- **Course Browsing**: Browse and filter courses fetched from Thinkific API, allowing users to find the perfect course for their needs.
- **User Registration and Login**: Securely register and log in to access quizzes and track learning progress.
- **Blog**: Informative blog with filtering, pagination, and related blog suggestions to enhance the learning experience.
- **Search Feature**: Utilize MongoDB indexes to implement a search feature on the navbar, enabling users to quickly find relevant blogs.
- **Quizzes**: Engaging quizzes with multiple types, such as multiple choice, reading, listening, and fill in the blank.
- **Quiz Results**: View detailed results and answers for specific questions through modals, helping users understand their performance.
- **Course Recommendations**: Personalized course suggestions based on quiz test results, guiding users towards relevant learning content.
- **Quiz History**: Keep track of quiz attempts and monitor learning progress over time.
- **Document Access**: Complete a form to access useful documents for medical students, create new users through Pipedrive API, and redirect to a hidden document page.
- **SEO Optimization**: Improve site visibility on search engines by adding title, description, and meta tags for Open Graph and Google.
- **Responsive Design**: Ensure a seamless user experience on different devices and screen sizes with adaptable layouts.
## Tech Stack
Medlangfanatic is built using the following technologies:

- MongoDB, Express, Next.JS, Node.JS
- Bootstrap, React-Bootstrap, Context, Mongoose

## Backend 1 - Course/Blog
This backend repository is responsible for managing course data pulled from Thinkific and blog data.

**Link:** [Github](https://github.com/minhtan7/medlangfanatic-be)

### Data Models
- **Courses**: Store course information fetched from Thinkific, with details such as course title, description, and pricing
- **Chapters**: Store chapter information related to courses, including chapter titles and descriptions
- **Contents**: Store content information related to chapters, such as video URLs and text content
- **Blog**: Store blog data, including title, author, content, and tags
- **Topic**: Store topics related to blogs for easy filtering and organization

## Backend 2 - Quiz
This backend repository is responsible for managing the quiz app, user data, and related information, ensuring a seamless and engaging learning experience.

**Link:** [Github](https://github.com/minhtan7/mlf-quiz-app-be)

### Data Models
- **Lead**: Store login user data, including name, email, and quiz progress
- **Question**: Store all questions with different types using discriminator models, allowing for diverse quiz formats
- **Category**: Store categories for questions, enabling easy organization and filtering
- **Test**: Store all questions included in a test, with unique test IDs and related metadata
- **Attempt**: Store user attempts on quizzes, allowing for personalized feedback and progress tracking

## Developing Features
- **New quiz types**: Matching headings, drag and drop layout for questions, providing an even more engaging learning experience
- Collect **cookies** for user-oriented advertisement, enabling targeted marketing and personalized user experience


MedLangFanatic offers a comprehensive and engaging learning experience for medical professionals and students, providing an extensive range of courses, quizzes, and resources. The platform is continuously evolving, with new features and improvements being added to enhance the user experience and facilitate learning. The project showcases my ability to create dynamic, responsive, and user-centric applications that cater to the needs of a diverse audience.
