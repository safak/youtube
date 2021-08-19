# How to deploy apps for free

Deploying single react applications and full-stack web applications using Heroku and Netlify.

## Single React App on Heroku

1) Create a Heroku account.
2) Create your app.
3) Download Heroku CLI from [here](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).
4) Run these codes.
```bash
heroku login
```
```bash
git init
```
```bash
heroku git:remote -a <app-name>
```
```bash
heroku create -b https://github.com/mars/create-react-app-buildpack.git
```
```bash
git add .
```
```bash
git commit -am "my first commit"
```
```bash
git push heroku master
```

## Single React App on Netlify

### Deploy using the browser

1) Build your application
```bash
yarn build
```
2) Drag and drop your build folder to Netlify manual upload section.

### Deploy using Github

1) Connect to the Github
2) Choose your repository/branch
3) Change the deployment code to
```
CI= npm run build
```

# Deploying Full-Stack Apps

1) Create a Heroku app.
2) Change your Node app port to
```
process.env.PORT || <any port number>
```
3) Move your front-end app inside the Node app.
4) Add these codes inside your main JS file in your Node app.
```
app.use(express.static(path.join(__dirname, "/<front end app folder name>/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/<front end app folder name>/build', 'index.html'));
});
```

5) Add this script to your package.json in the Node app.

```
"heroku-postbuild": "cd client && npm install && npm run build"
```

6) Change your API URL in your React app.

7) Set your environment variables on Heroku

8) Run these codes.
```bash
heroku login
```
```bash
git init
```
```bash
heroku git:remote -a <app-name>
```
```bash
git add .
```
```bash
git commit -am "my first commit"
```
```bash
git push heroku master
```
