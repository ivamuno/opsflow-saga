








































@import "../../assets/sass/lbd/variables";
@import "../../assets/sass/lbd/mixins";

.fade-render-active {
  transition: all .3s;
  @include transform-translate-y(0);

}

.fade-render {
  opacity: 0;
  @include transform-translate-y(-60px);
}
