<template>
  <div class="home">
    <br /><br />
    <br />
    <imagesview :photo="photo" :reload="getPhotos" />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import imagesview from "@/components/Image.vue";
export default {
  name: "Home",
  components: {
    imagesview,
  },
  data() {
    return {
      photo: "",
      error: "",
    };
  },
  created() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

