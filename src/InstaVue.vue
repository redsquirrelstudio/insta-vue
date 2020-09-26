<template>
  <div class="insta-vue">
    <a :href="post.url" v-for="post in posts" :key="post.id" target="_blank" :style="`width: ${100 / cols}%`">
      <img :alt="post.alt" :src="post.src">
    </a>
  </div>
</template>

<script>
export default {
  name: 'InstaVue',
  props: {
    tag: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 4,
    },
    cols: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      if (this.tag[0] === '#') {
        fetch(`https://www.instagram.com/explore/tags/${this.tag.replace('#', '')}/?__a=1`)
            .then((response) => {
              response.json().then((data) => {
                if (data.hasOwnProperty('graphql')) {
                  for (let i = 0; i < this.quantity; i++) {
                    let post = data.graphql.hashtag.edge_hashtag_to_media.edges[i].node;
                    this.posts.push({
                      id: post.id,
                      src: post.display_url,
                      url: `https://www.instagram.com/p/${post.shortcode}/`,
                      alt: post.accessibility_caption,
                    });
                  }
                }
              });
            });
      } else {
        fetch(`https://www.instagram.com/${this.tag}/?__a=1`)
            .then(response => {
              response.json().then((data) => {
                if (data.hasOwnProperty('graphql')) {
                  for (let i = 0; i < this.quantity; i++) {
                    let post = data.graphql.user.edge_owner_to_timeline_media.edges[i].node
                    this.posts.push({
                      id: post.id,
                      src: post.display_url,
                      url: `https://www.instagram.com/p/${post.shortcode}/`,
                      alt: post.accessibility_caption,
                    });
                  }
                }
              });
            });
      }
    }
  },
}
</script>

<style scoped>
  .insta-vue{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .insta-vue a{
    display: block;
    box-sizing: border-box;
    padding: 10px;
  }

  .insta-vue a img{
    width: 100%;
    height: 100%;
  }
</style>