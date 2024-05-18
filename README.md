# RelxCompanySearch

----
You will need to change the blank API key in the environment.ts file to your own API key. Usually I would have the API key in an environment variable on the server, or as part of a JWT.

## Criteria

### A user can search for a company by name or company number

Enter a company name or company number in the search bar and click the search button. The search results will be displayed below the search bar. The user can click on any company to view its details.

### The result of the search is displayed

The search results will be displayed below the search bar. Matches will be highlighted.

### The user can click on any company to view its details

Click on any company in the search results to view its details. The company details will be displayed on a new page. There are tabs for the company overview and the company officers.

### Use Material Design or Bootstrap for styling

I have used some Material Design components in the project, but I've kept the styling minimal.

### Provide input validation

I have loosely copied how the UK government's company search page works. Pressing return with nothing in the search bar will just not search for anything.

If I were to implement proper input validation, I would make use of Angular's built-in validators.

I have implemented form validations on the login component.

### Restrict access to details page (you may mock the user authentication)

I have implemented a simple mock authentication system. The user will be redirected to the login page if they try to access the details page without being logged in. The route is protected by a guard.

This is very rudimentary and would not be suitable for a production application, but it demonstrates the concept. In practice, I would have used a JWT and stored it in a HttpOnly cookie. But for the purposes of this project, I have stored the 'user' in local storage.

### Implement paging of the result

I have implemented a rudimentary paging system. The user can click on the next and previous buttons to navigate through the search results (using Angular Material's paginator).

I tried to figure out a way to restrict the number of results returned by the API, so I could implement proper pagination, but I couldn't find a way to do it. The API seemed to always return 20 results.

----

## Notes

You will probably notice that this is, to put it mildly, over-engineered.

In practice, for an application like this, I wouldn't use NGRX. Services and observables would suffice. As such, there is a lot of boilerplate code.

I have used NGRX to show my grasp of the library, as it was mentioned in the job description.

I have made use of NGRX effects to handle side effects. I have used them to do things like set loading and error states.

I have used Vitest for unit testing, and I've tested the reducers, effects, selectors, guards, pipes, services and components. I would normally use Cypress for e2e and component testing, but I'd already spent long enough on the project, so I called it a day at the unit testing.

I have also made use of modern Angular features. The whole app doesn't have any NgModules -- everything is [standalone](https://angular.io/guide/standalone-components). I have also implemented Angular's new [control flow](https://angular.io/guide/control_flow) in the templates -- no `*ngIf` or `*ngFor`.

I tried to implement path mapping, so I could import stuff like `@company/components...` but this broke some tests. It worked for the app though. I've left it out as I was spending too much time on it.

----

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Vitest](https://vitest.dev/).

## Running end-to-end tests

I didn't implement any e2e tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

