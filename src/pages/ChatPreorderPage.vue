<script setup>
import { onUpdated, ref } from 'vue'

const bottomRef = ref(null)

onUpdated(() => {
  bottomRef.value.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <div class="border rounded flex flex-col justify-end h-96">
    <div id="messages" class="overflow-y-auto w-full py-5">
      <div class="w-full flex justify-end">
        <div class="border rounded py-2 px-4 w-1/2 mx-3 my-5 shadow-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa facere id itaque nam non reiciendis, similique totam ullam velit. Alias cumque dolore illo magni minima officia provident quia voluptatem?
        </div>
      </div>
      <div class="w-full flex justify-start">
        <div class="border rounded py-2 px-4 w-1/2 mx-3 my-5 shadow-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa facere id itaque nam non reiciendis, similique totam ullam velit. Alias cumque dolore illo magni minima officia provident quia voluptatem?
        </div>
      </div>
      <div class="w-full flex justify-end">
        <div class="border rounded py-2 px-4 w-1/2 mx-3 my-5 shadow-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa facere id itaque nam non reiciendis, similique totam ullam velit. Alias cumque dolore illo magni minima officia provident quia voluptatem?
        </div>
      </div>
      <div class="w-full flex justify-start">
        <div class="border rounded py-2 px-4 w-1/2 mx-3 my-5 shadow-xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem culpa facere id itaque nam non reiciendis, similique totam ullam velit. Alias cumque dolore illo magni minima officia provident quia voluptatem?
        </div>
      </div>
      <div ref="bottomRef"></div>
    </div>
    <div id="input_message" class="h-1/6 flex w-full">
      <input type="text" class="w-full outline-0 border rounded border-rose-400 text-xl" />
      <button class="border border-rose-400 rounded py-2 px-4 text-rose-400 hover:bg-rose-400 hover:text-white w-1/2">Отправить</button>
    </div>
  </div>
</template>

<style scoped>

</style>