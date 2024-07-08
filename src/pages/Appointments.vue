<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Button from '@/components/ui/Button.vue'
import Drawer from '@/components/ui/Drawer.vue'
import CreateAppointmentForm from '@/components/CreateAppointmentForm.vue'

import { IconCalendarPlus } from '@tabler/icons-vue'

const createAppointment = ref(false)
</script>

<template>
  <div>
    <Navbar />
    <Button @click="createAppointment = true">
      Create Appointment
    </Button>

    <Drawer v-model="createAppointment" title="Create Appointment" :icon="IconCalendarPlus">
      <CreateAppointmentForm />
    </Drawer>
  </div>
</template>
