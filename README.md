# ilf-book-forms

-   The node_modules package isn't needed for the forms. That's just there in order to run `yarn start` and run the http-server.
-   You'll probably want to change the location / import method for files. Ilf.css is basically your code, except that I changed the url import locations for the Vaud font. jQuery and fontawesome are currently being imported by CDN, but I can see you have your own implementation which is probably faster.
