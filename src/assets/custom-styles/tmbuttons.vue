<template>
        <b-button type="button" v-bind:class="btnclass" v-bind:style="{ width: bwidth}" @click="clickhandler">
            <b-icon class="mr-2" v-if="btnicon" v-bind:icon="btnicon"></b-icon>
          <img v-if="btnimg" v-bind:src="btnimg" alt="btn-icon">
            {{bname}}
        </b-button>
</template>

<script>
    export default {
        name: "tmbuttons",
        props: {
            bwidth: {
                type: String,
                required: false,
            },
            bname: {
                type: String,
                required: false,
            },
            clickhandler: {
                type: Function
            },
            btnicon: {
                type: String,
                required: false,
            },
            btnimg: {
                type: String,
                required: false,
            },
            btnclass: {
                type: String,
                required: false,
            }
        },
    }
</script>

<style lang="scss">
    @import "../core/_colors.scss";
    @import "../core/_typography.scss";
    .btn{
      border-radius: 0!important;
      padding: 0.5rem 0.5rem !important;
      font-size: 14px;
    }

    .btn-tm {
        background-color: var(--dark-green-color)!important;
        border-color: var(--dark-green-color)!important;
        color: $white-color!important;
        &:hover {
            background-color: var(--dark-green-color)!important;
            border-color: var(--dark-green-color)!important;
            color: $white-color!important;
        }
    }
    .btn.disabled, .btn:disabled:hover {
        background-color: var(--dark-green-color)!important;
        border-color: var(--dark-green-color)!important;
        opacity: 0.65;
    }

    .light-green-button {
        font-size: $font-size-small-18;
        background-color: rgba($green-color, .2)!important;
        border: 0 solid #1AA14F!important;
        color: $green-color!important;
        white-space: nowrap;
    }

    .ghost-button {
        background-color: transparent!important;
        border: 1px solid var(--dark-green-color)!important;
        color: var(--medium-black-color)!important;
        white-space: nowrap;
    }

    .exit-btn {
        background-color: $dark-grey-color!important;
        border-color: transparent!important;
        color: $black-color!important;
    }

    .cancel-btn {
        position: absolute;
        top: 0;
        right: 0;
        background-color: transparent!important;
        border-color: transparent!important;
        color: $red-color!important;
    }

    .split-button {
        background-color: transparent!important;
        border: 1px solid var(--dark-green-color)!important;
        color: $black-color!important;
        &:hover {
            background-color: var(--dark-green-color)!important;
            border-color: var(--dark-green-color)!important;
            color: $white-color!important;
        }
    }

    .yellow-sales-btn {
        width: 100%;
        height: 36px;
        padding: 5px 10px!important;
        background-color: $yellow-color!important;
        border-color: transparent;
        font-size: 14px;
        font-weight: 600!important;
        font-style: italic;
        color: $black-color!important;
    }

    .active {
        background-color: var(--dark-green-color)!important;
        color: $white-color!important;
    }

    .btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus, .show > .btn-secondary.dropdown-toggle:focus {
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0)!important;
    }

    @media (max-width: 575.98px) {
      .btn {
        border-radius: 0 !important;
        padding: 0.2rem 0.5rem !important;
        font-size: 14px;
      }

    }
</style>
