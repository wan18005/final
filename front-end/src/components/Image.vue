<template>
  <div>
    <section class="pure-u-1-1">
      <div class="image">
        <!-- <img :src="photo.path" /> -->
        <img :src="photo.data.path" />
        <div class="flex">
          <p class="userName pure-u-1-2">
            {{ photo.data.user.firstName }} {{ photo.data.user.lastName }}
          </p>
          <div class="left pure-u-1-12">
            <p class="photoDate">{{ formatDate(photo.data.created) }}</p>
          </div>
        </div>
      </div>
      <small> TITLE: </small>
      <br />
      <h1 class="photoTitle">{{ photo.data.title }}</h1>
      <div class="description">
        <small> DESCRIPTION: </small>
        <br /><br />
        {{ photo.data.description }}
      </div>
      <hr />
      <div
        class="description"
        v-for="com in photo.comments"
        v-bind:key="com._id"
      >
        <div class="flex">
          <small class="userName pure-u-1-2">
            {{ com.user.firstName }} {{ com.user.lastName }}
          </small>
          <div class="left pure-u-1-12">
            <small class="photoDate">{{ formatDate(com.created) }}</small>
          </div>
        </div>
        <br />
        <div class="description2">
          {{ com.comment }}
        </div>
      </div>
      <div class="description" v-if="user">
        <small> COMMENT BOX: </small>
        <div class="form">
          <textarea
            class="pure-u-1"
            placeholder="Comment here......."
            v-model="comment"
          ></textarea>
        </div>
        <div class="left">
          <button
            class="pure-button pure-button-active"
            @click="commentSubmit()"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Images",
  props: {
    photo: Array,
    reload: { type: Function },
  },
  data() {
    return {
      comment: "",
      message: null,
      error: null,
    };
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async commentSubmit() {
      if (!this.comment == "") {
        try {
          let response = await axios.post("/api/photos/comment", {
            photo: this.photo.data._id,
            user: this.photo.data.user._id,
            comment: this.comment,
          });
          this.message = response.data;
          this.comment = "";
          this.reload();
        } catch (error) {
          this.error = error.response.data.message;
        }
      }
    },
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
    console.log(this.photo.data);
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
};
</script>

<style scoped>
.form {
  padding: 5px 5px 5px 5px;
}
.description {
  background-color: #f6f8fa;
  padding: 10px 15px 20px 15px;
  margin-bottom: 15px;
  border: 1px solid black;
  border-radius: 10px;
}
.description2 {
  background-color: #ffffff;
  padding: 10px 15px 20px 15px;
  margin-bottom: 15px;
  border: 1px solid black;
  border-radius: 5px;
}

.userName {
  color: black;
}
.photoTitle {
  font-size: 30px;
  text-transform: uppercase;
  color: #2c62f8;
  padding: 0px 25px 1px 25px;
  margin: 0;
}
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}
.flex {
  display: flex;
}
.photoInfo p {
  margin: 0px;
}
.left {
  text-align: right;
  vertical-align: right;
  width: 100%;
}
.photoDate {
  font-size: 0.9em;
  font-weight: normal;
  text-align: end;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.images {
  column-gap: 1em;
}

.image {
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
  border-radius: 5px;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .images {
    column-count: 1;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .images {
    column-count: 1;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .images {
    column-count: 1;
  }
}
</style>