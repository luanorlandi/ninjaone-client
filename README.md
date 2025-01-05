# NinjaOne Client

## Development

Run the following commands to start the development server:

```bash
npm install
npm run dev
```

The app will be running on `http://localhost:5173`.

Ensure you are using Node v18.18.0, which was used in development. Use [nvm](https://github.com/nvm-sh/nvm) to install it.

The project depends on the [serverAPP](https://github.com/NinjaRMM/devicesTask_serverApp) for the backend. Run it locally and start the serverAPP for this project.

To run the automated tests:

```bash
npm test
```

Or to keep the tests in watch mode:

```bash
npm run test:watch
```

## Architecture

The code is implemented with domain-driven design (DDD) architecture to align the code with business logic and decouple UI and external communication.

For reference, see this short article I used:

https://alaedev.medium.com/applying-domain-driven-design-ddd-principles-in-frontend-development-fc67c8d28cc9

The application folder is organized by context, which includes `core`, `Device`, and `shared` due to the project size and scope:

- `src/core`: Contains core components, layers, and configuration code throughout the app. This is where the setup of libraries is implemented.
- `src/Device`: Includes features related to device management required for the showcase.
- `src/shared`: Generic and shared code between contexts, like components that don't have business logic.

Each context implements the following three modules:

### Application

UI components for rendering the application, using React and Chakra UI components. See more details in the Design section.

### Infrastructure

The infrastructure layer that handles network requests, using REST API with Axios and [react-query](https://tanstack.com/query). This combo provides hooks with the states, and other nice implementations out of the box.

### Domain

The domain specification of the context, using TypeScript to define the types and interfaces.

## Design

The project is using Chakra UI. My decision to use it was driven by these key factors:

1. **Design System Focus**: Chakra UI is not just a component library but a comprehensive design system. It provides a consistent set of components that ensure a unified look and feel across the application, with composability and styling flexibility.

2. **Composability**: The components are highly composable, allowing for easy customization and extension. This is achieved through the use of [Ark UI](https://ark-ui.com/) components and structure under the hood, which provides a flexible API and modular approach to building UI elements.

3. **Styling Flexibility**: Chakra UI uses [Panda CSS](https://panda-css.com/) for CSS-in-JS styling, which offers a flexible way to style components. This allows for easy theming and customization, ensuring that the design can be easily adapted to different requirements.

But the motivation to use Chakra UI is to demonstrate my proficiency in building high-quality web apps and a Design System with design consistency, advanced component & styling implementation, and reusability, which align with the role I'm applying for and to senior frontend positions in general that I believe is a good showcase of these skills.

## Full libraries list

The relevant libraries to mention here installed and description of the motivation to use some of them:

- **React**: required for the showcase and is the UI library that I'm most experienced with.
- **TypeScript**: types for better long-term maintainability.
- **Vite**: modern framework to build apps. I decided to experiment with this one here, haven't seen it being used much besides in Vue apps.
- **Chakra UI**: as mentioned in the Design section, for building the UI components and style.
- **Axios**: modern library better than fetch, commonly used for REST API in frontend projects.
- **React Query**: react hooks for running network requests, using some nice capabilities like loading and error states, so I don't have to implement them.
- **Jest**: implement automated tests.
- **React Testing Library**: focus on tests with user experience in mind, instead of implementation details.
- **MSW** (Mock Service Worker): to mock the network request for tests, instead of mocking files and implementations of axios or hooks.
- **Faker**: popular library to generate mocks, which was useful for implementing tests to make them more reliable with random data
