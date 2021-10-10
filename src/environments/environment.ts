// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: "https://localhost:44398/api/",
    jwtAllowedDomains: 'localhost:44398',
    jwtDisallowedRoutes: 'https://localhost:44360/api/auth/login'  
};

