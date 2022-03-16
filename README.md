# MERN ECommerce APP
An open source project for an Ecommerce website.

## Youtube Video
<a href="https://www.youtube.com/watch?v=y66RgYMAgSo">Youtube Tutorial</a>


## Instructions
<ul>
    <li>
        <h6>Make sure you have the following accounts</h6>
        <ul>
            <li><a href="https://mongodb.com">MongoDB</a></li>
            <li><a href="https://stripe.com">Stripe</a></li>
        </ul>
    </li>
    <li>
        <h6>Create <b>.env</b> files in <a href="./client">website folder</a> and <a href="./api">api folder</h6>
    </li>
    <li>
        <h6>Go to <a href="https://dashboard.stripe.com/">Stripe Dashboard</a> and click on the <a href="https://dashboard.stripe.com/test/developers">Developers</a> Button</h6>
    </li>
    <li>
        <h6>Click on the <a href="https://dashboard.stripe.com/test/apikeys">API keys</a> tab</h6>
    </li>
    <li>
        <h6>Copy the <b>Publishable key</b> and insert in the <b>.env</b> file in the <a href="./client">client folder</a></h6>
    </li>
</ul>

```
REACT_APP_STRIPE=pk_test_yourstripepublishablekey
```

<ul>
    <li>
        <h6>Copy the <b>Secret key</b> and add it to the <b>.env</b> file in the <a href="./api">server folder</a></h6>
        <h5 style="color:red;">NOTE make sure you do not publish this <b>Secret key</b> anyway</h5>
    </li>
</ul>

```
STRIPE_KEY=sk_test_yourstripesecretkey
```

<ul>
    <li>
        <h6>Add a <b>PASSWORD SECRET</b> in the <b>.env</b> file in the <a href="./api">server folder</a></h6>
    </li>
</ul>

```
PASS_SEC=AnywaySecretValue
```

<ul>
    <li>
        <h6>Add a <b>JSON WEB TOKEN SECRET</b> in the <b>.env</b> file in the <a href="./api">server folder</a></h6>
    </li>
</ul>

```
JWT_SEC=AnywaySecretValue
```

<ul>
    <li>
        <h6>Add a <b>Mongo DB connection string</b> in the <b>.env</b> file in the <a href="./api">server folder</a></h6>
        <h6>How to get connection string from <a href="https://studio3t.com/knowledge-base/articles/connect-to-mongodb-atlas/">mongodb altas</a></h6>
    </li>
</ul>

```
MONGO_URL=mongodb+srv://[user]:[password]@[clustername].[example].mongodb.net/[databasename]?retryWrites=true&w=majority
```


### Backend Base URL
<h6>To change the backend base url you'll find it in the <a href="./client/src/requestMethods.js">requestMethods.js</a> file</h6>
