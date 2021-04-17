  
<template>
  <div>
    <!-- {{ crumbs }}
    <br><br> -->
    <div class="container">
      <span class="custom-breadcrumb">{{crumb}}</span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    // crumbs: function() {
    //   let pathArray = this.$route.path.split("/")
    //   pathArray.shift()
    //   let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
    //     breadcrumbArray.push({
    //       path: path,
    //       to: breadcrumbArray[idx - 1]
    //         ? "/" + breadcrumbArray[idx - 1].path + "/" + path
    //         : "/" + path,
    //       text: this.$route.matched[idx].meta.breadCrumb || path,
    //     });
    //     return breadcrumbArray;
    //   }, [])
    //   return breadcrumbs;
    // }
    crumb: function(){
      let pathArray = this.$route.path.split("/");
      pathArray.shift();
      return this.$route.matched[1].meta.breadCrumb;
    }
  }
};
</script>
<style scoped>
.custom-breadcrumb {
  color: #252733; 
  letter-spacing: 0.3px; 
  font-size: 24px
}
</style>