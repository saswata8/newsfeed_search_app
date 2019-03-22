# Introduction
This is a boiler plate project for FSD Certification Practice Check. Admin can search and blacklist a news analyst. A logged in user can search for news. For each user, the system maintains the historical list of keywords searched. In the home screen the news related to the search keywords are displayed under relevant headings. Users can view the topics searched and can delete the searched topics. Fork this project and create the below specified issues in the forked project.

| **Issue Title** | **Issue Description** |
|-----------|-------------------|
| 1. Implement the functionality of the application | Create a website for users to signup and search new articles in a lively manner. Refer detailed description below this table. |
| 2. Analysis and Design | Define Screen Layout, ER Diagram, Classes and Method signatures. Include the documentation in README.md section of the project. |
| 3. Implement Repository and Service Layer | Create database and implement Service Layer using Hibernate. Unit Testing of the service method should be done using Mockito. Document the steps to build, unit test and deploy in Wiki. |
| 4. Implement Rest Controller | Create the Restful Web Service Controller using Spring MVC and create end to end tests using MockMvc library available in Spring. Document the steps to build, unit test and deploy. |
| 5. Implement Authentication Service | Modify the test cases based on inclusion of Authentication. |
| 6. Implement CI/CD | Automate the deployment of WAR using Jenkins. |
| 7. Implement Front End and consume Rest Services | Implement front end using Angular with responsive web design. Implement Unit Testing using Karma. Implement end to end testing with Protractor. |
| 8. Document the steps for build and deployment | Create a subheading for this in README.md and include the steps to deploy. |
| 9. Create docker compose for this application | |

# Application Functionality in detail (Include this in issue description of forked project)

## Role: News Analyst
1. Signup
2. Login
3. Search news articles after login (use https://newsapi.org to retrieve live new data.)
4. View the news related to the topics in search topic
5. List the searched topics
6. Remove topics from the search list
7. Logout

## Role: Admin
1. Login
2. Search News Analyst
3. Blacklist News Analyst
4. Logout

## Softwares Required

1. JDK 1.8+
2. Tomcat v8+
3. Maven 3.5+
4. MySql 5+
5. Git

## Get the project using Git

1. Create a folder in D: drive in which you want to download the project.
2. Open Windows Explorer.
3. Go to the folder you created.
4. Right click on the right hand side blank area.
5. Select "Git Bash Here".
6. Run following commands one by one:

    `git clone https://code.cognizant.com/729712/newsfeed-search-app.git`
    
# Steps to build

## 1. Database
1. Inside db folder there will be a file named "newsfeed.sql"
2. Execute the command in the MySql terminal =>

    `source /<path>/newsfeed.sql`

## 2. For building war 
1. Inside Services folder, Execute the following command in terminal => 

    `mvn clean package`
2. Then copy the .war file from the target folder and paste into the tomcat/webapps directory

## 3. For building dist
1. Inside Angular folder, Execute the following command in terminal => 

    `npm install`
    
    `ng build --prod --base-href`
2. Then copy the contents from the /dist folder and paste into the tomcat/webapps directory

## 4. For running tests

1. For running unit tests of Karma=> 
    `ng test`

2. For running end to end testing of Protractor => 
    `ng e2e`

## 5. Tomcat Server

1. Open Tomcat server.
2. Go to http://localhost:8080/fsd-cert-check/.
3. For news analyst login,

        email : cts@gmail.com,
    
        password : Admin@123
4. For admin login,

        email : admin@gmail.com,
    
        password : Admin@123