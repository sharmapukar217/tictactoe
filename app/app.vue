<template>
  <!-- screen 1 -->
  <div
    v-if="currentScreen === 1"
    class="container py-4 h-screen bg-background flex flex-col"
  >
    <!-- welcome screen -->
    <div class="text-center space-y-4">
      <div class="flex items-center mx-auto gap-4 text-primary">
        <Icon name="local:x" class="size-40" />
        <Icon name="local:o" class="size-32" />
      </div>
      <div>
        <h1 class="font-bold text-3xl">TIC-TAC-TOE</h1>
        <p class="text-sm font-medium text-foreground">
          Play with AI or play with your friend online...
        </p>
      </div>
    </div>

    <div class="mt-auto space-y-10">
      <div class="flex flex-col gap-4">
        <div class="flex mx-auto">
          <button @click="difficultyLevel = 1">
            <Icon
              name="flowbite:star-solid"
              :class="[
                'size-20',
                difficultyLevel >= 1
                  ? 'text-[#FFD700]'
                  : 'text-muted-foreground',
              ]"
            />
          </button>

          <button @click="difficultyLevel = 2">
            <Icon
              name="flowbite:star-solid"
              :class="[
                'size-20',
                difficultyLevel >= 2
                  ? 'text-[#FFD700]'
                  : 'text-muted-foreground',
              ]"
            />
          </button>

          <button @click="difficultyLevel = 3">
            <Icon
              name="flowbite:star-solid"
              :class="[
                'size-20',
                difficultyLevel >= 3
                  ? 'text-[#FFD700]'
                  : 'text-muted-foreground',
              ]"
            />
          </button>
        </div>

        <span class="mx-auto">
          Difficulty:
          <strong class="text-primary">
            {{ ["Easy", "Medium", "Hard"][difficultyLevel - 1] }}
          </strong>
        </span>
      </div>

      <form
        class="space-y-2"
        @submit.prevent="
          () => {
            if (!username) return;
            currentScreen = 2;
          }
        "
      >
        <input
          v-model="username"
          autocomplete="off"
          placeholder="Enter your game username."
          class="block w-full px-2.5 h-10 text-sm font-medium rounded-md bg-secondary text-secondary-foreground placeholder:!text-[red] border-2 border-[black] shadow-[1.5px_2.5px_0_0_black] focus:ring-0 focus:ring-offset-0 focus:outline-none focus:border-primary focus:shadow-[1.5px_2.5px_0_0_var(--color-primary)] transition-[border-color,box-shadow]"
        />

        <button
          :disabled="!username"
          class="bg-primary text-primary-foreground w-full h-12 flex items-center justify-center text-lg font-semibold rounded-lg border-3 border-[black] shadow-[1.5px_2.5px_0_0_black] active:shadow-[1px_1.5px_0_0_black] transition-all disabled:opacity-80 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </form>
    </div>
  </div>

  <!-- screen 2 -->
  <div
    v-if="currentScreen === 2"
    class="container py-4 h-screen bg-background flex flex-col gap-4"
  >
    <header class="flex items-center">
      <button @click="currentScreen = 1">
        <Icon name="line-md:arrow-left" class="size-5 text-muted-foreground" />
      </button>
      <h1 class="mx-auto text-2xl text-primary font-medium">Choose a side</h1>
    </header>

    <div class="flex flex-col gap-4">
      <button
        @click="selectedSide = 'X'"
        :class="[
          'p-12 flex-1 flex items-center justify-center text-lg font-semibold rounded-lg border-3 border-[black] shadow-[2.5px_3.5px_0_0_black] transition-all',
          selectedSide === 'X'
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-foreground active:shadow-[1px_1.5px_0_0_black]',
        ]"
      >
        <Icon name="local:x" class="size-full" />
      </button>
      <button
        @click="selectedSide = 'O'"
        :class="[
          'p-12 flex-1 flex items-center justify-center text-lg font-semibold rounded-lg border-3 border-[black] shadow-[2.5px_3.5px_0_0_black] transition-all',
          selectedSide === 'O'
            ? 'bg-primary text-primary-foreground'
            : 'bg-background text-foreground active:shadow-[1px_1.5px_0_0_black]',
        ]"
      >
        <Icon name="local:o" class="size-full" />
      </button>
    </div>

    <div class="mt-auto">
      <button
        :disabled="!selectedSide"
        @click="currentScreen = 3"
        class="bg-primary text-primary-foreground w-full h-12 flex items-center justify-center text-lg font-semibold rounded-lg border-3 border-[black] shadow-[1.5px_2.5px_0_0_black] active:shadow-[1px_1.5px_0_0_black] transition-all disabled:opacity-80 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>

  <!-- screen 3 -->
  <div
    v-if="currentScreen === 3"
    class="container py-4 h-screen bg-background flex flex-col gap-4"
  >
    <header class="flex items-center">
      <h1 class="mx-auto text-2xl text-primary font-semibold">TIC-TAC-TOE</h1>
    </header>

    <div class="flex-1 flex flex-col justify-center">
      <div v-for="(row, rowIndex) in boardState" :key="rowIndex" class="flex">
        <button
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          :class="[
            'flex-1 flex items-center justify-center size-28 border-primary',
            row.length - 1 === colIndex ? '' : 'border-e-3',
            row.length - 1 === rowIndex ? '' : 'border-b-3',
          ]"
          @click="() => makeMove(rowIndex, colIndex)"
        >
          <Icon
            v-if="cell === 'X'"
            name="local:x"
            class="size-16 text-primary"
          />
          <Icon
            v-else-if="cell === 'O'"
            name="local:o"
            class="size-16 text-primary"
          />
        </button>
      </div>

      <!-- <div class="flex">
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-e-3 border-b-3"
        >
          <Icon name="local:x" class="size-16 text-primary" />
        </button>
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-e-3 border-b-3"
        >
          <Icon name="local:o" class="size-16 text-primary" />
        </button>
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-b-3"
        >
          <Icon name="local:o" class="size-16 text-primary" />
        </button>
      </div>

      <div class="flex">
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-e-3 border-b-3"
        >
          <Icon name="local:x" class="size-16 text-primary" />
        </button>
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-e-3 border-b-3"
        >
          <Icon name="local:o" class="size-16 text-primary" />
        </button>
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-b-3"
        >
          <Icon name="local:o" class="size-16 text-primary" />
        </button>
      </div>

      <div class="flex">
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-e-3"
        >
          <Icon name="local:o" class="size-16 text-primary" />
        </button>
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary border-e-3"
        >
          <Icon name="local:x" class="size-16 text-primary" />
        </button>
        <button
          class="flex-1 flex items-center justify-center size-28 border-primary"
        >
          <Icon name="local:x" class="size-16 text-primary" />
        </button>
      </div> -->
    </div>

    <div class="flex items-center">
      <h1
        v-if="currentTurn === selectedSide"
        class="mx-auto text-lg font-semibold text-primary"
      >
        Your Turn
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import "~/assets/tailwind.css";

const currentScreen = ref(2);
const difficultyLevel = ref(1);
const username = ref<string | null>(null);
const selectedSide = ref<"X" | "O" | null>(null);

const currentTurn = ref("O");

const boardState = ref([
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]);

const makeMove = (rowIndex: number, colIndex: number) => {
  if (currentTurn.value !== selectedSide.value) return;
  if (!boardState.value[rowIndex][colIndex]) {
    const newState = boardState.value.map((row, rIndex) => {
      if (rIndex !== rowIndex) return row;
      return row.map((cell, cIndex) => {
        return cIndex === colIndex ? currentTurn.value : cell;
      });
    });

    boardState.value = newState;
    currentTurn.value = currentTurn.value === "X" ? "O" : "X";
  }
};
</script>
