<template>
  <div class="home">
    <div class="head-info">
      <p class="title">Welcome!</p>
      <p class="sm-text">
        You currently have
        <strong>{{ personalDetails.length }}</strong> Friend(s).
      </p>
    </div>
    <div class="friends-area">
      <p class="sm-title">Friend(s)</p>
      <div class="friends">
        <div
          class="friend"
          v-for="personalDetail in personalDetails"
          :key="personalDetail.id"
        >
          <img
            v-if="personalDetail.image"
            :src="imageUrlFor(personalDetail.image)"
          />
          <p>{{ personalDetail.firstname }} {{ personalDetail.lastname }}</p>
          <router-link :to="`/personalDetails/${personalDetail.slug.current}`">
            <button>View</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "@/client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "personalDetails"]{
  _id,
  firstname,
  lastname,
  slug,
  "image": profileImage{
  asset->{
  _id,
  url
}
}
}[0...50]`;

export default {
  name: "Home",

  data() {
    return {
      loading: true,

      personalDetails: [],
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },

    fetchData() {
      this.error = this.personalDetail = null;

      this.loading = true;

      sanity.fetch(query).then(
        (personalDetails) => {
          this.loading = false;

          this.personalDetails = personalDetails;
        },

        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>
