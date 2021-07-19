# I. Automate Component creation

1. Change Access Permissions to allow user to execute the script

```javascript
$ sudo chmod u+x createcomponent.sh
```

2. Run the script using directoryName and componentName

```javascript
$ ./createcomponent.sh components topbar
```

A new folder will be created "src/components/topbar/" with three files:

- topbar.css
- topbar.sass
- Topbar.jsx
  Sass file will be prepopulated with a class named as the file and React file will be prepopulated with css import and React Funcional Component export

You can customize the script to suit your needs

# II. Seed Creator

Using faker you can create a seed with n items. The seed will be save at the end as a json file that you can import to your React app to use as fake data. I used it for generating data for the portfolio app and to build this [masonry gallery](https://swc-masonry-gallery.onrender.com/)
