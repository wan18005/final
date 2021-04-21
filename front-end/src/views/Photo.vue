<template>
<div class="photo-page">
  <div class="image"  v-if="photo != null">
    <img :src="photo.path" />
    <div class="photoInfo">
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoName" v-if="photoUser != null">{{photoUser.firstName}} {{photoUser.lastName}}</p>
    </div>
    <div class="photoInfo">
      <p class="photoDescription">{{photo.description}}</p>
    </div>
    <p class="photoDate">{{formatDate(photo.created)}}</p>
  </div>

  <div class="comments">
    <!-- Display "Comments" already made here (if comments for the photo exist) -->
    <p>Comments</p>
    <hr>
    <p v-if="commentArray.length === 0" style="text-align: center;">Comments have yet to be posted for this photo.</p>
    <div class="display-comments" v-for="c in commentArray" v-bind:key="c._id">
      <div class="comment-name-date"><p style="font-weight: bold;">{{c.user.firstName}} {{c.user.lastName}}</p><p> commented {{formatDate(c.created)}}</p></div>
      <p class="comment-data">{{c.commentData}}</p>
      <hr>
    </div>
    <br>
    <!-- Display "Leave a comment"  (if user is logged in) -->
    <div class="leave-comment" v-if="$root.$data.user != null" >
      <p>Leave a Comment</p>
      <textarea v-model="commentData" cols=72 rows=4 placeholder="Your Comment" ></textarea>
      <button style="display: block" @click="uploadComment">Upload</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Photo',
  data() {
    return {
      photo: null,
      photoUser: null,
      commentData: "",
      commentArray: [],
    }
  },
  created() {
    this.getPhoto();
    this.displayComments();
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = response.data;
        this.getPhotoUser();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getPhotoUser() {
      try {
        let response = await axios.get("/api/users/" + this.photo.user);
        this.photoUser = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadComment() {
        await axios.post('/api/comments', {
          photo: this.$route.params.id,
          commentData: this.commentData,
        });
        this.commentData = "";
        //repopulate comments
        this.displayComments();
    },
    async displayComments() {
      try {
        let response = await axios.get('/api/comments/' + this.$route.params.id);
        this.commentArray = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style scoped>
.comment-data {
  padding-left: 15px;
  color: #898989;
}

.comment-name-date {
  font-size: 1.2rm;
  display: flex;
}

.photo-page {
  width: 65%;
  margin: auto;
  padding-top: 118px;
  padding-bottom: 60px;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.photoInfo p {
  margin: 1px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

.photoTitle {
  font-size: 1.2rm;
  font-weight: bold;
  text-decoration: underline;
}

p {
  margin: 3px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}
</style>
