<h1>THESE ARE MY NOTES FROM <br/>
  https://www.youtube.com/watch?v=w-QJiQwlZzU&t=615s <br/>
  Thank you JustDjango </h1>
  
  
**1. SETTING UP DJANGO W/ REST-FRAMEWORK**


SETUP YOUR [VIRTUAL ENVIRONMENT](https://realpython.com/python-virtual-environments-a-primer/)

- Create a project folder, and create a frontend and backend folders within it
- Create a virtual environment within your backend folder
  - _cd backend_
  - _virtualenv env_
  - _source env/bin/activate_

INSTALL [DJANGO](https://docs.djangoproject.com/en/2.1/), REST, CORS-HEADERS

- _pip install django_
- _pip install djangorestframework_
- _pip install django-cors-headers_

EDIT SETTINGS TO INCLUDE [REST FRAMEWORK](https://www.django-rest-framework.org/#installation)+ [CORS-HEADERS](https://pypi.org/project/django-cors-headers/)

- Instantiate your Django project
  - _django-admin startproject ${projectname}_
- Edit main settings.py INSTALLED\_APPS to include
  - &quot;corsheaders&quot;
  - &quot;Rest\_framework&quot;
- Edit main settings.py MIDDLEWARE to include
  - &#39;corsheaders.middleware.CorsMiddleware&#39;,
- Edit main settings.py to add [this](https://www.django-rest-framework.org/#example) code

SETUP AND TEST SERVER

- Apply initial migrations
  - cd to src directory
  - _python manage.py migrate_
- Run the server
  - _python manage.py runserver_

CREATE A &#39;SUPERUSER&#39; TO LOGIN TO [ADMIN](https://docs.djangoproject.com/en/2.1/ref/contrib/admin/)

- _python manage.py createsuperuser_

CREATE THE FIRST DATABASE [MODEL](https://docs.djangoproject.com/en/2.1/topics/db/models/)

- _python manage.py startapp ${modelname)_
- Edit models.py to include a model as per the link
- [Field Types Reference](https://docs.djangoproject.com/en/2.1/ref/models/fields/#field-types)

SETUP [API](https://www.django-rest-framework.org/#example)FOR THIS MODEL

- Create api folder within your new ${model} folder
- Create an empty \_\_init\_\_.py in the folder
- Create a serializers.py in this folder

SETUP [SERIALIZER](https://www.django-rest-framework.org/api-guide/serializers/) WITHIN API FOLDER

- Use a name that corresponds with the ${modelname}
- If you add a new field to model, make sure to add to serializer

SETUP [VIEWS](https://docs.djangoproject.com/en/2.1/topics/http/views/) FROM [REST FRAMEWORK](https://www.django-rest-framework.org/api-guide/generic-views/#generic-views) USING [VIEWSETS](https://www.django-rest-framework.org/api-guide/viewsets/)

- Copy the viewset import into urls.py
- Copy the models views into views.py
- Some use cases require individual views to be made



**2. CREATE-REACT-APP, AXIOS TO HANDLE REST VIEWS**



[CREATE-REACT-APP](https://github.com/facebook/create-react-app)IN THE FRONTEND FOLDER

- Working in a separate terminal
  - _npx create-react-app appname_
- Good practice:
  - Within src create _components_ and _containers_ folders
- _npm start_ to test app at localhost:3000

INSTALL [AXIOS](https://www.npmjs.com/package/axios) AND [REACT ROUTER](https://reacttraining.com/react-router/web/guides/philosophy)

- Sort of like AJAX, you can make requests [(ie. GET, POST) from servers](https://www.w3schools.com/tags/ref_httpmethods.asp)
- _npm install react-router-dom_ (in base frontend folder)
- Remember to _import axios from &#39;axios&#39;_ wherever you&#39;re using



SET UP A COMPONENT TO MAKE AXIOS REQUEST

- Advisable to use a container component and then pass the state as props to its child
- Import axios into component
- Set component&#39;s state value equal to an empty array
- In componentDidMount()
  - axios.get(&#39;http//apiurl.com&#39;).then( res =\&gt; setState({stuff})
- When grabbing param from URL:
  - const thing = this.props.match.params.thing

A NOTE ON AXIOS.GET

- It returns an instance of a javascript class called promise
- We use .then() to pass data into a setState() function

PASS STATE INTO PROPS THAT RENDER DATA

- Good practice for readability:
  - [Destructur](https://medium.freecodecamp.org/the-basics-of-destructuring-props-in-react-a196696f5477)e props for readability





**3. SENDING POSTS**

CREATE A [FORM](https://reactjs.org/docs/forms.html) COMPONENT

- This tutorial uses a component library, otherwise you need to remember [two-way binding](https://stackoverflow.com/a/42217730/11052358) on your input fields
- All input fields need names so they can be accessed through [event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- Recieves props such as requestType, userID, etc.
- Should contain a Button that will take [an anonymous function](https://tylermcginnis.com/arrow-functions/)
  - _onSubmit = {event =\&gt; {this.submitHandler(params)}}_

CREATE A HANDLER FUNCTION FOR THE FORM SUBMIT

- Create an arrow syntax submit handler function
  - _submitHandler = (params) =\&gt; { }_
- Assign variables
  - _const thing = event.target.elements.thing.value_
- Use conditional logic to handle multiple potential request types
- Make [your axios call,](https://alligator.io/react/axios-react/) for ex, POST:
  - _axios.post( &#39;url&#39;, data )_
  - You may want to include .then().catch()









**4.** [**AUTHENTICATION**](https://www.hackterms.com/authentication) **WITH** [**REDUX**](https://redux.js.org/)

- Actions are executed by dispatches and contain objects
- Reducer reads action type and returns method that updates state

**PART 1 - CREATE ACTIONS FOLDER**

- [Actions](https://redux.js.org/basics/actions#actionsjs) (define what action to handle). In this ex we use:
  - js
  - js
- Define action constants in actionTypes.js
  - AUTH\_START, AUTH\_SUCCESS, AUTH\_FAIL, AUTH\_LOGOUT
- Import them into auth.js where you write methods

WRITE YOUR LOGIN AUTHORIZATION METHOD

- Takes username and password as parameters
- Return an arrow function with [dispatch](https://redux.js.org/basics/actions) parameter
- Dispatch your AUTH\_START
  - dispatch(authStart());
- Call axios post to the login url, passing through an object containing values for username and password
- Call .then to take the response and run a function
- Assign a variable to the token from response.data.key
- Create a variable for the expiration date of said token using new Date()
- Save items to local storage
- Dispatch authSuccess with the token as a parameter.
- Dispatch checkAuthTimeOut with time as the parameter
- Add a catch for the error which dispatches failure

CREATE YOUR LOGIN AUTHORIZATION DURATION METHOD

- Arrow function taking expirationTime
- Returns dispatch which returns an arrow function
- Sets a Timeout equal to the time \* 1000 (because milliseconds)
- Runs dispatch logout

CREATE YOUR LOGOUT METHOD

- Remove credentials from storage
  - _localStorage.removeItem(&#39;user&#39;)_
  - _localStorage.removeItem(&#39;expirationDate&#39;)_
- Return an object with
  - _type: actionTypes.AUTH\_LOGOUT_

CREATE A SIGN UP METHOD

- Copy and paste the login method, but add email, password1, and password2 as parameters that get passed to object
  - These are default requirements of django rest framework
- Change the post url to registration

CREATE UTILITY.JS IN STORE FOLDER

- This file will contain a method to update objects
- Takes old objects and updates with new properties

**PART 2 - CREATE YOUR REDUCERS**

-  Create reducers folder with auth.js inside it
-  Import actiontypes and updateobjects into it
-  Create initial state object with token, error, loading properties

- Each function should correspond with an action
- These functions will take state and action as parameter
- They will return updateObject according to their action and what they are intended to do to the state.
  - Can access token with action.token

CREATE MAIN REDUCER

- Takes state=initialState and action as parameters
- Switch case through all the reducer functions depending on action type
- Passes state and action through as parameteres
- Export this function
