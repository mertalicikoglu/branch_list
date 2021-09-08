# Branches information

Api that lists branches information

## How to run

Before anything else, you must have node installed on your machine.

### Running Dev Server

Run on your terminal `npm run watch:dev`, the server will restart everytime you make a change in your code.

### Running Production Server

For stuff like heroku deployment, aws elasticbeanstalk, run `npm run start`

### Other scripts

* `transpile` - convert es6 and beyond code to es5 to a folder named `dist-server`
* `clean` - delete transpiled folder
* `build` - clean and transpile

### CURL EXAMPLES

Users and roles are automatically created under the /server/data/seeder path
In addition, the first 3 branches were created for trial purposes.

//LOGIN

curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"admin",
    "password":"123456"
}'


Token in the incoming response will be used in other requests.


//BRANCH LIST
curl --location --request GET 'http://localhost:3000/api/branches' \
--header 'x-access-token: <<TOKEN>>'

All users can access the branch list.
Adding, updating and deleting can only be provided by those with owner authorization. Control is provided via the token.

//ADD BRANCH

curl --location --request POST 'http://localhost:3000/api/branches' \
--header 'x-access-token: <<TOKEN>>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "branch7",
    "latitude": "122",
    "longitude": "133",
    "full_address": "asdasd"
}'

//UPDATE BRANCH

curl --location --request PUT 'http://localhost:3000/api/branches/1' \
--header 'x-access-token: <<TOKEN>>' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "branch1",
        "latitude": "123123",
        "longitude": "123123",
        "full_address": "mert"
}'

//DELETE BRANCH

curl --location --request DELETE 'http://localhost:3000/api/branches/2' \
--header 'x-access-token: <<TOKEN>>'









