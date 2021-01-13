<template>
  <div class="insta-vue">
    <div @click.prevent="link(post.url)" class="post"
         :style="`${links ? 'cursor: pointer;' : 'cursor: default;'} width: ${100 / cols}%;`"
         v-for="post in posts" :key="post.id">
      <img :alt="post.alt" :src="post.src">
      <p class="description" v-if="descriptions">{{ post.description }}</p>
    </div>
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
    links: {
      type: Boolean,
      default: false,
    },
    descriptions: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      posts: [],
      hashtag: false,
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    link(url) {
      if (this.links) {
        window.open(url, '_blank');
      }
    },
    getPosts() {
      this.hashtag = this.tag[0] === '#';
      const query = this.hashtag ? `https://www.instagram.com/explore/tags/${this.tag.replace('#', '')}/?__a=1` : `https://www.instagram.com/${this.tag}/?__a=1`;
      fetch(query)
          .then(response => {
            if (response.status === 404){
              console.error(`${this.hashtag ? 'Hashtag' : 'Account'} not found for the tag ${this.tag}`);
            }
            response.json().then(data => {
              if (data.hasOwnProperty('graphql')) {
                for (let i = 0; i < this.quantity; i++) {
                  let post = this.hashtag ? data.graphql.hashtag.edge_hashtag_to_media.edges[i].node : data.graphql.user.edge_owner_to_timeline_media.edges[i].node;
                  if (post){
                    this.posts.push({
                      id: post.id,
                      src: post.display_url,
                      url: `https://www.instagram.com/p/${post.shortcode}/`,
                      alt: post.accessibility_caption,
                      description: post.edge_media_to_caption.edges[0]?['node']['text']:'',
                    });
                  }
                }
              }
            })
          }).catch(error => {
        console.error(`Issue getting Instagram content: ${error}`);
      });
    }
  },
}
</script>

<style scoped>
.insta-vue {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.insta-vue .post {
  display: block;
  box-sizing: border-box;
  padding: 10px;
  height: auto;
}

.insta-vue .post img {
  width: 100%;
}

.insta-vue p {
  margin-top: 0.5rem;
  width: 100%;
  font-size: 0.9rem;
  color: #FFF;
  mix-blend-mode: difference;
}
</style>