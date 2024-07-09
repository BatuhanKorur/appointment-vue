<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Airtable } from '@/server/api'
import { Tables, type Appointment } from '@/types'

const appointments = ref<Appointment[]>([])
onMounted(async() => {
  appointments.value = await Airtable.getAll(Tables.APPOINTMENTS)
})

/* import Navbar from '@/components/Navbar.vue'
import Button from '@/components/ui/Button.vue'
import Drawer from '@/components/ui/Drawer.vue'
import CreateAppointmentForm from '@/components/CreateAppointmentForm.vue' */
import AppointmentCard from '@/components/AppointmentCard.vue'
/* import { IconCalendarPlus } from '@tabler/icons-vue' */

/* const createAppointment = ref(false) */

</script>

<template>
  <div>
    <div>
      <AppointmentCard v-for="appointment in appointments" :key="appointment.id" :appointment="appointment" />
    </div>
    <!--    <Navbar />
    <div class="f-between">
      <div>Appointments Found</div>
      <Button @click="createAppointment = true">
        Create Appointment
      </Button>
    </div>
    <Drawer v-model="createAppointment" title="Create Appointment" :icon="IconCalendarPlus">
      <CreateAppointmentForm />
    </Drawer>-->
    <div>
      <!--      <AppointmentCard
        v-for="appointment in appointments"
        :key="appointment.id"
        :appointment="appointment"
      />-->
    </div>
  </div>
</template>
