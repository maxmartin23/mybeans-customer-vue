<template>
  <div>
    <v-dialog width="32rem" v-model="reviewDialog">
      <v-sheet class="pa-4 rounded-lg">
        <v-card-title>
          <v-icon left>mdi-comment-text-outline</v-icon>
          <span class="headline font-weight-bold">Leave a review</span>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="submitReview()">
            <v-rating class="mb-4" v-model="newReview.rating"></v-rating>
            <v-textarea
              v-model="newReview.comment"
              dense
              label="Review"
              persistent-hint
              outlined
              required
            />
            <v-btn
              :disabled="newReview.rating === 0"
              type="submit"
              elevation="0"
              rounded
              color="primary"
              class="py-6 px-8"
            >
              Submit
            </v-btn>
          </form>
        </v-card-text>
      </v-sheet>
    </v-dialog>
    <v-container class="pb-16">
      <div class="row">
        <div class="col-lg-8">
          <div
            class="bean-container"
            :style="`background-image: url(${$route.query.beanImage}); aspect-ratio: 16/9; background-size: cover; background-position: center; width: 100%`"
          ></div>
        </div>
        <div class="col-lg-4">
          <div class="h-100 d-flex align-center" v-if="bean">
            <div class="w-100">
              <h1>
                {{ bean.name }}
              </h1>
              <h3 class="font-weight-medium grey--text text--darken-1">
                {{ bean.price }} CAD
              </h3>
              <p class="body-1">Description: {{ bean.description }}</p>
              <p>
                Origin: {{ bean.origin }}
                <br />
                Roast level:
                {{
                  ["", "Light", "Medium", "Medium dark", "Dark"][
                    bean.roastingLevel
                  ]
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <v-divider class="my-4" />
      <div v-if="reviews">
        <div
          class="blue-grey lighten-5 pa-4 rounded-lg"
          v-if="reviews?.length === 0"
        >
          <span class="font-weight-medium">
            There are no reviews yet for {{ bean.name }}
          </span>
        </div>
        <v-btn
          color="primary"
          elevation="0"
          rounded
          class="py-6 my-4"
          @click="reviewDialog = true"
          v-if="
            !reviews.find(
              (review) => review.user.userId === $store.getters.getUser.userId
            )
          "
        >
          <v-icon left>mdi-plus</v-icon> Submit a review
        </v-btn>
        <div class="pb-8" v-if="reviews?.length > 0">
          <h2 class="mb-6">Reviews for {{ bean.name }}</h2>
          <div class="py-4" v-for="(review, i) in reviews" :key="i">
            <div class="d-flex">
              <div class="flex-grow-1">
                <p class="text-h6 mb-0">
                  {{ review.user.firstName }} {{ review.user.lastName }}
                </p>
                <v-rating class="ml-n2" small :value="review.rating" readonly />
                <p class="body-1">{{ review.comment }}</p>
                <small class="grey--text text--darken-2">
                  {{ review.createdAt }}
                </small>
              </div>
              <div class="d-flex align-center" v-if="review.user.userId === $store.getters.getUser.userId">
                <a href="#" class="mr-4" @click.prevent="editReviewDialog()"
                  >Edit</a
                >
                <a
                  href="#"
                  class="grey--text text--darken-2"
                  @click="deleteReview()"
                  >Delete</a
                >
              </div>
            </div>
            <v-divider></v-divider>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "BeanDetails",
  data() {
    return {
      reviewDialog: false,
      bean: null,
      reviews: null,
      newReview: {
        rating: 0,
        comment: "",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getBeanDetails();
      this.getBeanReviews();
    }, 1000);
  },
  methods: {
    getBeanDetails() {
      const beanId = this.$route.params.id;
      this.$http
        .get(`/coffeebeans/details?id=${beanId}`)
        .then(({ data }) => {
          this.bean = data;
          this.bean.roastingLevel = parseInt(this.bean.roastingLevel);
        })
        .catch(() => {
          alert("Error loading bean details. Please try again.");
          this.$router.replace("/home");
        });
    },
    getBeanReviews() {
      const beanId = this.$route.params.id;
      this.$http
        .get(`/reviews?id=${beanId}`)
        .then(({ data }) => {
          this.reviews = data;
        })
        .catch(() => {
          alert("Error loading bean reviews. Please try again.");
        });
    },
    editReviewDialog() {
      const review = this.reviews.find(
        (review) => review.user.userId === this.$store.getters.getUser.userId
      );
      if (!review) {
        return;
      }
      this.newReview.rating = review.rating;
      this.newReview.comment = review.comment;
      this.reviewDialog = true;
    },
    submitReview() {
      //Check if user has already submitted a review
      const review = this.reviews.find(
        (review) => review.user.userId === this.$store.getters.getUser.userId
      );
      if (review) {
        return this.editReview();
      }

      const { coffeeBeanId } = this.bean;
      const { rating, comment } = this.newReview;
      this.$http
        .post("/reviews/create", { coffeeBeanId, rating, comment })
        .then((res) => {
          alert("Review submitted successfully.");
          this.reviewDialog = false;
          this.reviews.unshift(res.data);
        })
        .catch((err) => {
          const error =
            err.response?.data?.error ??
            "Something went wrong, please try again.";
          alert(error);
        });
    },
    editReview() {
      const { coffeeBeanId } = this.bean;
      const { rating, comment } = this.newReview;
      this.$http
        .post("/reviews/update", { coffeeBeanId, rating, comment })
        .then(() => {
          alert("Review edited successfully.");
          this.reviewDialog = false;
          const review = this.reviews.find(
            (review) =>
              review.user.userId === this.$store.getters.getUser.userId
          );
          review.rating = rating;
          review.comment = comment;
        })
        .catch((err) => {
          const error =
            err.response?.data?.error ??
            "Something went wrong, please try again.";
          alert(error);
        });
    },
    deleteReview() {
      const confirm = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (!confirm) {
        return;
      }
      const review = this.reviews.find(
        (review) => review.user.userId === this.$store.getters.getUser.userId
      );
      if (!review) {
        return;
      }
      const { coffeeBeanId } = this.bean;
      this.$http
        .delete(`/reviews/delete?id=${coffeeBeanId}`)
        .then(() => {
          alert("Review deleted successfully.");
          this.reviews = this.reviews.filter(
            (review) => review.userId !== this.$store.getters.getUser.userId
          );
        })
        .catch((err) => {
          const error =
            err.response?.data?.error ??
            "Something went wrong, please try again.";
          alert(error);
        });
    },
  },
};
</script>