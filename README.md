# Mini project - students managements

react-router-dom
@types/react-router-dom

/login
/admin/\*

/admin/
/admin/dashboard
/admin/students

auth/ authentication

- login
- sign in/ register
- forget password

CLICK LOGIN

- Call api login
- Success -> redirect ADMIN
- FAIL -> show error

login logout

authSaga

LOGIN

- call login API to get token + user infor
- set token to local storage
- redirect to amdin page
  LOGOUT
- clear token from local storage
- redirect to login page

ROUTINGS

- admin/students: listing
- /admin/students/add: add new student
- /admin/students/:studentId: update a student

LISTING

- Search by name
- Filter by city
- Sort by name, mark
- Pagination

student lice state:

- loading
- list
- pagination
- filter { page: 1, limit: 10, ...}

ADD/EDIT

- React Hook Form V7
- Yup
