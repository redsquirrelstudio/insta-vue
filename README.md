# Insta-vue <img width=25 src="https://devicon.dev/devicon.git/icons/vuejs/vuejs-original.svg"> <img width=25 src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300">

Insta-vue is a simple vue component for displaying instagram account or hashtag post images.

####<a href="https://github.com/redsquirrelstudio/insta-vue">Github Repo</a> <img width=20 src="https://devicon.dev/devicon.git/icons/github/github-original.svg" >
####<a href="https://www.npmjs.com/package/insta-vue">NPM</a> <img width=20 src="https://devicon.dev/devicon.git/icons/npm/npm-original-wordmark.svg" >

##Installation 
Insta-vue can be installed with both npm and yarn as usual.
```
npm install insta-vue

yarn add insta-vue
```

And then can be imported into your project.
```js
import 'InstaVue' from "insta-vue";
```

##Configuration

Insta-vue takes the following props for configuration:
<table>
    <thead>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Function</th>
    </thead>
    <tbody>
        <tr>
            <td>tag</td>
            <td>String</td>
            <td>N/A, Required</td>
            <td>The username or hashtag that you would like posts to be pulled from hashtags should be prefixed with '#'.</td>
        </tr>
        <tr>
            <td>quantity</td>
            <td>Integer</td>
            <td>4</td>
            <td>The number of posts you would like to be shown.</td>
        </tr>
        <tr>
            <td>cols</td>
            <td>Integer</td>
            <td>4</td>
            <td>The number of posts to be shown in a row before wrapping.</td>
        </tr>
    </tbody>
</table>

##Example
A demo can be <a href="#">here.</a>

```js
<template>
    <div id="app">
        An account feed, latest 6 posts, 5 columns. 
        <insta-vue tag="redsquirrelstudio" 
                   :quantity="6" 
                   :cols="5">
        </insta-vue>
        
        A hashtag feed, with defaults
        <insta-vue tag="#programming"></insta-vue>
    </div>
</template>

<script>
import 'InstaVue' from 'insta-vue';

export default{
    components:{
        InstaVue,
    }
}
</script>
```





