<script setup lang="ts">
import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent
} from "@tauri-apps/api/updater";
// import { relaunch } from "@tauri-apps/api/process";

async function update() {
  const unlisten = await onUpdaterEvent(({ error, status }) => {
    console.log("Updater event", error, status);
  });

  try {
    const { shouldUpdate, manifest } = await checkUpdate()

    if (shouldUpdate) {
      // You could show a dialog asking the user if they want to install the update here.
      console.log(
        `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
      )

      // Install the update. This will also restart the app on Windows!
      await installUpdate()

      // On macOS and Linux you will need to restart the app manually.
      // You could use this step to display another confirmation dialog.
      // await relaunch()
    }
  } catch (error) {
    console.error(error)
  }

  // you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
  unlisten()
}
</script>

<template>
  <div>
    <button @click="update">Update</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
