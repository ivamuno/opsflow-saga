<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Colors</h4>
            </div>
            <div class="card-body">
              <l-button type="default" wide>Default</l-button>&nbsp;
              <l-button type="primary" wide>Primary</l-button>&nbsp;
              <l-button type="info" wide>Info</l-button>&nbsp;
              <l-button type="success" wide>Success</l-button>&nbsp;
              <l-button type="warning" wide>Warning</l-button>&nbsp;
              <l-button type="danger" wide>Danger</l-button>&nbsp;
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Styles</h4>
            </div>
            <div class="card-body">
              <l-button wide>Default</l-button>&nbsp;
              <l-button wide outline>Outline</l-button>&nbsp;
              <l-button wide round>Fill + Round</l-button>&nbsp;
              <l-button wide outline round>Outline + Round</l-button>&nbsp;
              <l-button wide simple link>Simple</l-button>&nbsp;
            </div>

          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Buttons with Label</h4>
            </div>
            <div class="card-body">
              <l-button wide type="success" outline>
                <span class="btn-label">
                    <i class="fa fa-check"></i>
                </span>
                Success
              </l-button>&nbsp;

              <l-button type="danger" wide outline>
                <span class="btn-label">
                    <i class="fa fa-times"></i>
                </span>
                Danger
              </l-button>&nbsp;

              <l-button type="info" outline wide>
                <span class="btn-label">
                    <i class="fa fa-exclamation"></i>
                </span>
                Info
              </l-button>&nbsp;

              <l-button type="warning" wide outline>
                <span class="btn-label">
                    <i class="fa fa-warning"></i>
                </span>
                Warning
              </l-button>&nbsp;

              <l-button type="default" wide outline>
                <span class="btn-label">
                    <i class="fa fa-arrow-left"></i>
                </span>
                Left
              </l-button>&nbsp;

              <l-button type="default" wide default outline>
                Right
                <span class="btn-label btn-label-right">
                    <i class="fa fa-arrow-right"></i>
                </span>
              </l-button>&nbsp;
            </div>
          </div>

          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Sizes</h4>
            </div>
            <div class="card-body">
              <l-button size="lg">Large</l-button>&nbsp;
              <l-button>Default</l-button>&nbsp;
              <l-button size="sm">Small</l-button>&nbsp;
              <br>
              <l-button round size="lg">Large</l-button>&nbsp;
              <l-button round>Default</l-button>&nbsp;
              <l-button round size="sm">Small</l-button>&nbsp;
            </div>
          </div>
        </div>


        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Button Group</h4>
            </div>
            <div class="card-body">
              <div class="btn-group">
                <l-button type="l-button" class="btn btn-default btn-outline">Left</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">Middle</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">Right</l-button>
              </div>&nbsp;

              <br><br>
              <div class="btn-group">
                <l-button type="l-button" class="btn btn-default btn-outline">1</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">2</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">3</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">4</l-button>
              </div>&nbsp;
              <div class="btn-group">
                <l-button type="l-button" class="btn btn-default btn-outline">5</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">6</l-button>
                <l-button type="l-button" class="btn btn-default btn-outline">7</l-button>
              </div>&nbsp;
              <div class="btn-group">
                <l-button type="l-button" class="btn btn-default btn-outline">8</l-button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">Pagination</h4>
            </div>

            <div class="card-body">
              <l-pagination :page-count="10" v-model="defaultPagination"></l-pagination>
              <l-pagination class="pagination-no-border" :page-count="10" v-model="infoPagination"></l-pagination>
            </div>
          </div>
        </div>


        <div class="card-header">
          <h4 class="card-title">Social buttons</h4>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-md-4 social-buttons-demo">
              <h4 class="title">
                <small> Filled </small>
              </h4>
              <l-button class="btn btn-social  btn-twitter">
                <i class="fa fa-twitter"></i> Connect with Twitter
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-facebook">
                <i class="fa fa-facebook-square"></i> Share · 2.2k
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-google">
                <i class="fa fa-google-plus-square"></i> Share on Google+
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-linkedin">
                <i class="fa fa-linkedin-square"></i> Connect with Linkedin
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-pinterest">
                <i class="fa fa-pinterest"></i> Pint it · 212
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-youtube">
                <i class="fa fa-youtube-play"></i> View on Youtube
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-tumblr">
                <i class="fa fa-tumblr-square"></i> Repost
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-github">
                <i class="fa fa-github"></i> Connect with Github
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-behance">
                <i class="fa fa-behance-square"></i> Follow us
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-dribbble">
                <i class="fa fa-dribbble"></i> Find us on Dribbble
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-reddit">
                <i class="fa fa-reddit"></i> Repost · 232
              </l-button>
              <br>
              <l-button class="btn btn-social  btn-stumbleupon">
                <i class="fa fa-stumbleupon"></i> View on StumbleUpon
              </l-button>
              <br>
            </div>

            <div class="col-md-2 social-buttons-demo">
              <h4 class="title">
                <small>Light</small>
              </h4>
              <l-button class="btn btn-social btn-round btn-twitter btn-outline">
                <i class="fa fa-twitter"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-facebook btn-outline">
                <i class="fa fa-facebook"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-google btn-outline">
                <i class="fa fa-google-plus"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-linkedin btn-outline">
                <i class="fa fa-linkedin"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-pinterest btn-outline">
                <i class="fa fa-pinterest"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-youtube btn-outline">
                <i class="fa fa-youtube"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-tumblr btn-outline">
                <i class="fa fa-tumblr"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-github btn-outline">
                <i class="fa fa-github"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-behance btn-outline">
                <i class="fa fa-behance"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-dribbble btn-outline">
                <i class="fa fa-dribbble"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-reddit btn-outline">
                <i class="fa fa-reddit"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-round btn-stumbleupon btn-outline">
                <i class="fa fa-stumbleupon"></i>
              </l-button>
              <br>
            </div>
            <div class="col-md-2 social-buttons-demo">
              <h4 class="title">
                <small>Simple</small>
              </h4>
              <l-button class="btn btn-social btn-link btn-twitter">
                <i class="fa fa-twitter"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-facebook">
                <i class="fa fa-facebook-square"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-google">
                <i class="fa fa-google-plus-square"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-linkedin">
                <i class="fa fa-linkedin-square"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-pinterest">
                <i class="fa fa-pinterest"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-youtube">
                <i class="fa fa-youtube"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-tumblr">
                <i class="fa fa-tumblr-square"> </i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-github">
                <i class="fa fa-github"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-behance">
                <i class="fa fa-behance"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-dribbble">
                <i class="fa fa-dribbble"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-reddit">
                <i class="fa fa-reddit"></i>
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-stumbleupon">
                <i class="fa fa-stumbleupon"></i>
              </l-button>
              <br>
            </div>
            <div class="col-md-4 social-buttons-demo">
              <h4 class="title">
                <small>With Text</small>
              </h4>
              <l-button class="btn btn-social btn-link btn-twitter">
                <i class="fa fa-twitter"></i> Connect with Twitter
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-facebook">
                <i class="fa fa-facebook-square"></i> Share · 2.2k
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-google">
                <i class="fa fa-google-plus-square"></i> Share on Google+
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-linkedin">
                <i class="fa fa-linkedin-square"></i> Connect with Linkedin
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-pinterest">
                <i class="fa fa-pinterest"></i> Pint it · 212
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-youtube">
                <i class="fa fa-youtube-play"></i> View on Youtube
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-tumblr">
                <i class="fa fa-tumblr-square"></i> Repost
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-github">
                <i class="fa fa-github"></i> Connect with Github
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-behance">
                <i class="fa fa-behance-square"></i> Follow us
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-dribbble">
                <i class="fa fa-dribbble"></i> Find us on Dribbble
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-reddit">
                <i class="fa fa-reddit"></i> Repost · 232
              </l-button>
              <br>
              <l-button class="btn btn-social btn-link btn-stumbleupon">
                <i class="fa fa-stumbleupon"></i> View on StumbleUpon
              </l-button>
              <br>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LPagination from '../../../components/Pagination.vue'
  import LButton from '../../../components/Button.vue'

  export default {
    components: {
      LPagination,
      LButton
    },
    data () {
      return {
        defaultPagination: 3,
        infoPagination: 5
      }
    }
  }
</script>
<style>

</style>
