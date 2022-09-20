<template>
  <div class="content">
    <h1>Hello, {{ userLogin }}! Your id is {{ userId }}</h1>
    <h2>{{ userCreatedAt }}</h2>
    <h2>This is an about page!</h2>
    {{ words }}
    <div class="container">
      <div class="col">
        <div v-for="(word, index) in words" :key="word.id" class="item">
          <div>
            <h2>{{ index + 1 }}</h2>
          </div>
          <div class="itemCol">
            <div>
              <p class="f-30 f-bold">{{ word.name }}</p>
            </div>
            <div>
              <p class="f-12">{{ word.updated_at }}</p>
            </div>
            <div>
              <p class="f-12">{{ word.created_at }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlossaryView",
  computed: {
    userId() {
      return this.$store.getters["AuthModule/getUserId"];
    },
    userLogin() {
      return this.$store.getters["AuthModule/getUserLogin"];
    },
    userCreatedAt() {
      return this.$store.getters["AuthModule/getUserCreatedAt"];
    },
    words() {
      return this.$store.getters["AuthModule/getWordList"];
    },
  },
  async created() {
    await this.$store.dispatch("AuthModule/checkUpdateUser");
    await this.$store.dispatch("AuthModule/getWordList", {
      offset: null,
      limit: null,
    });
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
}

.container {
  font-family: $global-font;
  display: flex;
  flex-direction: column;
  justify-items: center;
  flex-wrap: nowrap;
  align-content: center;
  align-items: stretch;
  //   height: 100%;
  border: 2px solid #2c3e50;
  border-radius: 10px;
}

// .col {
//     height: 100%;
// }

.item {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  background-color: rgb(172 238 203 / 50%);
  font-size: 1em;
  line-height: 1em;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 12px 4px 20px 0px rgba(66, 185, 131, 0.2);
  text-decoration: none;

  &:hover {
    background-color: rgba(229, 247, 237, 0.877);
  }
}

.itemCol {
  text-align: left;
  padding-left: 10px;
}

.f-bold {
  font-weight: bold;
}

.f-30 {
  font-size: 30px;
}

.f-12 {
  font-size: 12px;
}

// .col {
//   display: flex;
//   flex-direction: column;
//   align-content: center;
//   justify-content: center;
//   align-items: stretch;
// }
</style>
