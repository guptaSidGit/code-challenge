Please run the following steps to run the app:

1. Clone the repository from GitHub.

2. At the root of the project run `npm install` to install the required dependencies.

3. Please create an app on Discogs website to get a key and a secret to be able to use Discogs API. Details can be found at https://www.discogs.com/settings/developers.

4. Create a `.env` file in the root directory and add the following variable:

   ```
   REACT_APP_DISCOGS_API_KEY=your_api_key  
   REACT_APP_DISCOGS_API_SECRET=your_api_secret
   ```

5. Run `npm start` to start the app which should take you to http://localhost:3000 where you can browse the app.
