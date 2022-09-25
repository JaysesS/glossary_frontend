<template>
  <div class="flex flex-col space-y-1 mx-2 p-2">
    <div
      v-for="word in words"
      :key="word.id"
      class="
        item
        w-auto
        h-auto
        p-2
        max-w
        bg-white
        rounded-lg
        border border-gray-200
        shadow-md
        hover:bg-gray-100
      "
    >
      <a href="">
        <div class="grid overflow-hidden grid-cols-7 grid-rows-3 gap-0">
          <div class="box row-start-1 row-span-1 col-start-1 col-span-3">
            <h5
              class="
                mb-2
                text-2xl
                font-bold
                tracking-tight
                text-gray-900
                dark:text-white
              "
            >
              {{ word.name }}
            </h5>
          </div>
          <div class="box row-start-1 row-span-1 col-start-4 col-span-2"></div>
          <div
            class="
              box
              row-start-1 row-span-1
              col-start-6 col-span-2
              text-center
            "
          >
            <div
              :class="{
                'text-red-700': word.priority == 'Высокий',
                'bg-red-100': word.priority == 'Высокий',
                'text-yellow-500': word.priority == 'Средний',
                'bg-yellow-100': word.priority == 'Средний',
                'text-green-700': word.priority == 'Низкий',
                'bg-green-100': word.priority == 'Низкий',
              }"
              class="p-3 mb-3 text-sm bg-red-100 rounded-lg"
              role="alert"
            >
              <span class="font-medium">{{ word.priority }}</span>
            </div>
          </div>
          <div class="box row-start-2 row-span-1 col-start-1 col-span-7 px-1">
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
              {{ word.description }}
            </p>
          </div>
          <div class="box row-start-3 row-span-1 col-start-1 col-span-7">
            <div class="flex-inline flex-wrap items-center space-y-1">
              <span
                v-for="tag in word.tags"
                :key="tag.id"
                id="badge-dismiss-default"
                class="
                  inline-flex
                  items-center
                  py-1
                  px-2
                  mr-2
                  text-sm
                  font-medium
                  text-emerald-600
                  bg-gray-100
                  border-2
                  border-gray-200
                  rounded
                "
              >
                {{ tag.name }}
              </span>
            </div>
          </div>
        </div>
      </a>
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
      return this.$store.getters["AuthModule/getPreparedWordList"];
    },
  },
  async created() {
    await this.$store.dispatch("AuthModule/checkUpdateUser");
    await this.$store.dispatch("AuthModule/getWordList", {
      offset: null,
      limit: null,
    });
    await this.$store.dispatch("AuthModule/getTagList", {
      offset: null,
      limit: null,
    });
    await this.$store.dispatch("AuthModule/getPriorityList", {
      offset: null,
      limit: null,
    });
    await this.$store.dispatch("AuthModule/getLinkList", {
      offset: null,
      limit: null,
    });
    this.$store.commit("AuthModule/setWordListPrepared");
  },
};
</script>   
