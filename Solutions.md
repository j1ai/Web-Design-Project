Include names of your team members
Student 1: Shiyuan Lin (1002257853)
Student 2: Haotian Yin (1000669573)
Student 3: Jingwen Xu (1000956227)
Student 4: Lai Justin Ho Lam (1002213384)

# Features
- User register and User login (click the icons at the top right corner)
- You also act as system admin and post directly to /api/messages. if you log in as admin, you can navigate to "Admin Space" to manage the list of messages (delete existing system message, publish new system message, view system messages) Only admin users can post and delete any message at front-end.
- For normal access user, a notification message sent by system admins will be posted on the top right corner, and you can also view history system message by navigate to the "history system message" log.
- Search courses by Keyword
    - e.g.: csc
    - any course related to CSC will be returned, and you can add them into your favourite course list.
- Search textbooks by keyword
    - e.g.: computing
    - display the text book containing the keywork
- Favorite list: only when you logged in, you can navigate to favourite courses.
- Admin controller for admin user
	we can help you register an admin account.
	when you are logged in as admin, you will see an extra view "Admin Space", otherwise you would not see it.


# API
GET /api/messages
    - Get all messages send from admin

POST /api/messages
    - Post one message to the all the user

Delete /api/messages/id
    - Delete one message by giving a message id
