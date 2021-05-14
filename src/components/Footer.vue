<template>
  <div class="footer-section">
    <div class="container">
      <div class="footer-text-content row">
        <div class="service col-xl-2 col-md-6 col-sm-12 mb-sm-4 text-xl-left text-sm-center">
          <h5>{{$t('service.title')}}</h5>
          <router-link to="/howItWorks">{{$t('service.howdoesitwork')}}</router-link>
        </div>
        <div class="client col-xl-3 col-md-6 col-sm-12 mb-sm-4 text-xl-left text-sm-center">
          <h5>{{$t('client.title')}}</h5>
          <ul>
            <li>
              <router-link to="/howMakeRequest">{{$t('client.createrequest')}}</router-link>
            </li>
            <li>
              <router-link to="/">{{$t('client.faq')}}</router-link>
            </li>
            <li>
              <router-link to="/">{{$t('client.ourotherservices')}}</router-link>
            </li>
          </ul>
        </div>
        <div class="support col-xl-4 col-md-6 col-sm-12 mb-sm-4 text-xl-left text-sm-center">
          <h5>{{$t('legalinfo.title')}}</h5>
          <ul>
            <li>
              <router-link to="/publicOffer">{{$t('legalinfo.publicoffer')}}</router-link>
            </li>
            <li>
              <router-link to="/usageRules">{{$t('legalinfo.rules')}}</router-link>
            </li>
            <li>
              <router-link to="/intellectualProperty">{{$t('legalinfo.ipr')}}</router-link>
            </li>
          </ul>
        </div>
        <div class="contacts col-xl-3 col-md-6 col-sm-12 mb-sm-4 text-xl-left text-sm-center">
          <h5>{{$t('contact.title')}}</h5>
          <p class="tel">+38 067 37-36-790</p>
          <small class="text-muted">{{$t('contact.aboutholder')}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Footer",
        i18nOptions: {
            namespaces: '_common',
            keyPrefix: 'pages.footer'
        },
    }
</script>

<style lang="scss" scoped>
  @import "../assets/core/_colors.scss";
  @import "../assets/core/_typography.scss";
  .footer-section {
    background: var(--black-color);
    color: var(--white-color);
    ul li{
      list-style-type: none;
    }
    .footer-text-content {
      padding: 20px 0;

      a {
        font-size: $font-size-small-14;
        color: var(--white-color);
        text-decoration: none;

        &:hover {
          color: var(--white-color);
          text-decoration: underline;
        }

        p.tel {
          font-size: $font-size-small-20;
        }
      }
    }
  }
</style>
