# [DEPRECIATED] Insta-vue <img width=25 src="https://devicon.dev/devicon.git/icons/vuejs/vuejs-original.svg"> <img width=25 src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300">

[Warning] Insta-vue will no longer function due to the new CORS policy Instagram has added to the endpoint the component used to get data.
Please migrate to using Instagram's basic display API here: <a href="https://developers.facebook.com/docs/instagram-basic-display-api"> https://developers.facebook.com/docs/instagram-basic-display-api </a>

Insta-vue is a simple vue component for displaying instagram account or hashtag post images.

#### <a href="https://github.com/redsquirrelstudio/insta-vue">Github Repo</a> <img width=20 src="https://devicon.dev/devicon.git/icons/github/github-original.svg" >
#### <a href="https://www.npmjs.com/package/insta-vue">NPM</a> <img width=20 src="https://devicon.dev/devicon.git/icons/npm/npm-original-wordmark.svg" >

## Installation 
Insta-vue can be installed with both npm and yarn as usual.
```bash
npm install insta-vue

yarn add insta-vue
```

And then can be imported into your project.
```js
import 'InstaVue' from "insta-vue";
```

## Configuration

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
         <tr>
            <td>links</td>
            <td>Boolean</td>
            <td>false</td>
            <td>When true, clicking on a post image will link to it on Instagram</td>
        </tr>
         <tr>
            <td>descriptions</td>
            <td>Boolean</td>
            <td>false</td>
            <td>When true, post captions will be shown for each post.</td>
        </tr>
    </tbody>
</table>

## Error Handling
Insta-vue uses an emit function that fires when it fails to fetch Instagram posts.
This can happen due to Instagram throttling requests and can be captured on the component using
@error


## Example
```vue
<template>
    <div id="app">
        An account feed, latest 6 posts, 5 columns. 
        <insta-vue tag="redsquirrelstudio" 
                   :quantity="6" 
                   :cols="5">
        </insta-vue>
        
        A hashtag feed, with defaults and error handling
        <insta-vue tag="#programming" @error="log">
        </insta-vue>
    </div>
</template>

<script>
import 'InstaVue' from 'insta-vue';

export default{
    components:{
        InstaVue,
    },
    methods: {
      log(error){
        console.log(error);
      }
    }
}
</script>
```






