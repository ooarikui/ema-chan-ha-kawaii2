<template>
  <div class="damage-calc">
    <p>名前：{{ name }}</p>
    <p>最大与ダメージ：{{ to_max }}</p>
    <p>最小与ダメージ：{{ to_min }}</p>
    <template v-if="is_pow_seed_shown">
      <p>最大被ダメージ：{{ from_max }}</p>
      <p>最小被ダメージ：{{ from_min }}</p>
    </template>
    <p>最大被ダメージ：{{ from_max }}</p>
    <p>最小被ダメージ：{{ from_min }}</p>
    <template v-if="is_def_seed_shown">
      <p>最大被ダメージ：{{ from_max }}</p>
      <p>最小被ダメージ：{{ from_min }}</p>
    </template>
    <p>先行率：{{ m_spd[c_spd] }}%</p>
    <template v-if="is_spd_seed_shown">
      <p>先行率（種1）：{{ m_spd[c_spd + 1] }}%</p>
      <p>先行率（種2）：{{ m_spd[c_spd + 2] }}%</p>
      <p>先行率（種3）：{{ m_spd[c_spd + 3] }}%</p>
      <p>先行率（種4）：{{ m_spd[c_spd + 4] }}%</p>
      <p>先行率（種5）：{{ m_spd[c_spd + 5] }}%</p>
      <p>先行率（種6）：{{ m_spd[c_spd + 6] }}%</p>
      <p>先行率（種7）：{{ m_spd[c_spd + 7] }}%</p>
      <p>先行率（種8）：{{ m_spd[c_spd + 8] }}%</p>
      <p>先行率（種9）：{{ m_spd[c_spd + 9] }}%</p>
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
    is_pow_seed_shown: {
      type: Boolean,
      required: true
    },
    is_def_seed_shown: {
      type: Boolean,
      required: true
    },
    is_spd_seed_shown: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    to_base() {
      return Math.floor((this.c_atk - this.m_def / 2) / 2)
    },
    to_max() {
      if (this.to_base < 2) {
        return 1
      } else if (this.to_base >= 2 && this.to_base < 9) {
        return this.to_base
      } else {
        return Math.floor(
          (this.to_base * 7) / 8 + ((this.to_base / 4 + 1) * 255) / 256
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
          (this.to_base * 7) / 8 + ((this.to_base / 4 + 1) * 0) / 256
        )
      }
    },
    from_base() {
      return Math.floor((this.m_atk - this.c_def / 2) / 2)
    },
    from_max() {
      if (this.from_base < 2) {
        return 1
      } else if (this.from_base >= 2 && this.from_base < 9) {
        return this.from_base
      } else {
        return Math.floor(
          (this.from_base * 7) / 8 + ((this.from_base / 4 + 1) * 255) / 256
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
          (this.from_base * 7) / 8 + ((this.from_base / 4 + 1) * 0) / 256
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
