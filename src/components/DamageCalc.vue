<template>
  <div class="damage-calc">
    <div class="damage-calc-flex-container">
      <p>名前：{{ name }}</p>
      <p>最大HP：{{ c_hp }}（木の実なし）</p>
    </div>
    <p>最大与ダメージ：{{ to_max }}</p>
    <p>最小与ダメージ：{{ to_min }}</p>
    <div class="damage-calc-flex-container">
      <div>
        <p>最大被ダメージ：{{ from_max(0) }}</p>
        <p>最小被ダメージ：{{ from_min(0) }}</p>
      </div>
      <div>
        <p>スクルト1最大：{{ from_max(1) }}</p>
        <p>スクルト1最小：{{ from_min(1) }}</p>
      </div>
      <div>
        <p>スクルト2最大：{{ from_max(2) }}</p>
        <p>スクルト2最小：{{ from_min(2) }}</p>
      </div>
    </div>
    <p>先行率：{{ m_spd[c_spd] }}%</p>
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
    c_hp: {
      type: Number,
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
    }
  },
  methods: {
    from_base(number_of_scults) {
      const add_def = Math.floor(this.c_def / 2) * number_of_scults
      const def = (this.c_def + add_def) > 254 ? 254 : (this.c_def + add_def)
      return Math.floor((this.m_atk - Math.floor(def / 2)) / 2)
    },
    from_max(number_of_scults) {
      if (this.from_base(number_of_scults) < 2) {
        return 1
      } else if (this.from_base(number_of_scults) >= 2 && this.from_base(number_of_scults) < 9) {
        return this.from_base(number_of_scults)
      } else {
        return Math.floor(
          Math.floor((this.from_base(number_of_scults) * 7) / 8) + ((Math.floor(this.from_base(number_of_scults) / 4) + 1) * 255) / 256
        )
      }
    },
    from_min(number_of_scults) {
      if (this.from_base(number_of_scults) < 2) {
        return 0
      } else if (this.from_base(number_of_scults) >= 2 && this.from_base(number_of_scults) < 9) {
        return this.from_base(number_of_scults) - 2
      } else {
        return Math.floor(
          Math.floor((this.from_base(number_of_scults) * 7) / 8) + ((Math.floor(this.from_base(number_of_scults) / 4) + 1) * 0) / 256
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

.damage-calc-flex-container {
  display: flex;
  gap: 24px
}
</style>
