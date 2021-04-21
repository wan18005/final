<template>
<div class="home">
    <h2>-Artists-</h2>
    <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <h2>{{item.title}}</h2>
      <img :src="item.path" />
      <p>{{item.description}}</p>
    </div>
  </section>





  <div class="home">
  <h2>-Fan art-</h2>
  <image-gallery :photos="photos" />
  <p v-if="error">{{error}}</p>
  </div>
</div>  
</template>

<script>
import axios from 'axios';
import ImageGallery from '@/components/ImageGallery.vue';
export default {
  name: 'Home',
  data() {
    return {
      photos: [],
      items: [],
      error: '',
    }
  },
  components: {
    ImageGallery,
  },
  created() {
    this.getPhotos();
    this.getItems();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/all");
        this.photos = response.data;
      } catch (error) {
        //  console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
}
}
</script>

<style scoped>
.home {
  padding-top: 65px;
}
.iframe-container{
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
}
.iframe-container iframe{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
}
.image h2 {
  font-style: italic;
}
/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}
.image-gallery {
  column-gap: 1.5em;
}
.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}
.image img {
  width: 100%;
}
/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}
/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}
/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
