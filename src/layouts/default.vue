<template lang="pug">
el-container.default
  el-header.default__header
    nuxt-link(to="/")
      .logo 射的
    el-dropdown.dropdown(trigger="click" @command="handleCommand")
      el-button.dropdown__button
        icon.icon(name="user")
      el-dropdown-menu(slot="dropdown")
        template(v-if="signedIn")
          el-dropdown-item(command="signout") signout
        template(v-else)
          el-dropdown-item(command="goToSignin") signin
  nuxt.root
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import { appStores } from '@/stores/appStores'

export default defineComponent({
  setup (_, context: any) {
    const handleCommand = (command: string) => {
      if (command === 'signout') signout()
      if (command === 'goToSignin') goToSignin()
    }
    const signout = async () => {
      await context.root.$firebase.auth().signOut()
      context.root.$message({ message: 'Signout successful', type: 'success', duration: 5000 })
      context.root.$router.push('/')
    }
    const goToSignin = () => {
      context.root.$router.push('/signin')
    }

    const state = reactive<{
      signedIn: boolean
    }>({
      signedIn: false
    })
    const timerId = setInterval(() => {
      const onAuthStateChanged = context.root.context.app.onAuthStateChanged
      if (!onAuthStateChanged) return
      const currentUser = context.root.$firebase.auth().currentUser
      if (currentUser) state.signedIn = true
      clearInterval(timerId)
    }, 500)

    return {
      handleCommand,
      signout,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="stylus" scoped>
.default
  &__header
    display: flex
    justify-content: space-between
    border-bottom: 1px solid borderColor
    .dropdown
      height: 100%
      &__button
        height: 100%
        width: 100px
        border-radius: 0
        border-top: none
        border-bottom: none
    .logo
      font-weight: bold
      font-size: 32px
      background-color: navy
      color: white
      line-height: 60px
      padding: 0 16px
</style>
