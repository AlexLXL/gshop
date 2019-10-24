<template>
  <div>
    <router-view></router-view>
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import { reqUser } from "./api";
// import { reqUser, reqGoods, reqRatings, reqInfo } from "./api";
import { RECEIVE_USER } from "./store/mutation-types.js";

export default {
  async mounted() {
    this.$store.dispatch("getAddress");
    // 请求用户(是否登陆过)
    /* 
    {
      name: "alex"
      _id: "5d2fc3485ac58f29dc4e3b99"
    }
    */
    const result = await reqUser();
    if (result) {
      this.$store.commit(RECEIVE_USER, result);
    }

    // const result1 = await reqGoods()
    // const result2 = await reqRatings()
    // const result3 = await reqInfo()
    // console.log(result1);
    // console.log(result2);
    // console.log(result3);
    // this.$store.dispatch('getGoods')
    // this.$store.dispatch('getRatings')
    // this.$store.dispatch('getInfo')

  },
  components: {
    FooterGuide
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>
