<template>
  <div>
    <h1>The Weather Channel with Vue</h1>
    <div>
      <h1>Dashboard</h1>
    </div>
    <login-form-modal />
  </div>
</template>

<script>
import LoginFormModal from '@/components/LoginFormModal.vue'

export default {
  name: 'DashBoard',
  components: { LoginFormModal },
  data: () => ({

  }),
}
</script>
