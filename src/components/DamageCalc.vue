<template>
  <div class="damage-calc">
    <p>名前：{{ name }}</p>
    <p>最大与ダメージ：{{ to_max }}</p>
    <p>最小与ダメージ：{{ to_min }}</p>
    <p>最大被ダメージ：{{ from_max }}</p>
    <p>最小被ダメージ：{{ from_min }}</p>
    <template v-if="is_spd_seed_shown">
      <p v-for="n of 9" :key="n">
        先行率（種{{ n }}）：{{ m_spd[c_spd + n] }}%
      </p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DamageCalc',
  props: {
    name: {
      type: String,
      required: true
    },
    c_atk: {
      type: Number,
      required: true
    },
    c_def: {
      type: Number,
      required: true
    },
    c_spd: {
      type: Number,
      required: true
    },
    m_atk: {
      type: Number,
      required: true
    },
    m_def: {
      type: Number,
      required: true
    },
    m_spd: {
      type: Object,
      required: true
    },
    is_spd_seed_shown: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    to_base() {
      return Math.floor((this.c_atk - Math.floor(this.m_def / 2)) / 2)
    },
    to_max() {
      if (this.to_base < 2) {
        return 1
      } else if (this.to_base >= 2 && this.to_base < 9) {
        return this.to_base
      } else {
        return Math.floor(
          Math.floor((this.to_base * 7) / 8) + ((Math.floor(this.to_base / 4) + 1) * 255) / 256
        )
      }
    },
    to_min() {
      if (this.to_base < 2) {
        return 0
      } else if (this.to_base >= 2 && this.to_base < 9) {
        return this.to_base - 2
      } else {
        return Math.floor(
          Math.floor((this.to_base * 7) / 8) + ((Math.floor(this.to_base / 4) + 1) * 0) / 256
        )
      }
    },
    from_base() {
      return Math.floor((this.m_atk - Math.floor(this.c_def / 2)) / 2)
    },
    from_max() {
      if (this.from_base < 2) {
        return 1
      } else if (this.from_base >= 2 && this.from_base < 9) {
        return this.from_base
      } else {
        return Math.floor(
          Math.floor((this.from_base * 7) / 8) + ((Math.floor(this.from_base / 4) + 1) * 255) / 256
        )
      }
    },
    from_min() {
      if (this.from_base < 2) {
        return 0
      } else if (this.from_base >= 2 && this.from_base < 9) {
        return this.from_base - 2
      } else {
        return Math.floor(
          Math.floor((this.from_base * 7) / 8) + ((Math.floor(this.from_base / 4) + 1) * 0) / 256
        )
      }
    }
  }
}
</script>

<style scoped>
.damage-calc p {
  margin: 0;
}
</style>
