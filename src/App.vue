<template>
  <div id="app">
    <div class="app-memo">
      <h2>エマちゃんはかわいい2</h2>
    </div>
    <div class="app-input">
      <div class="input">
        <label>モンスター</label>
        <select v-model="monster">
          <option
            v-for="monster of monsters"
            :key="monster.No"
            :value="monster"
          >
            {{ monster.name }}
          </option>
        </select>
      </div>
      <div class="input">
        <label>ローレシア</label>
        <select v-model="role">
          <option v-for="r of roles" :key="r.Lv" :value="r">
            {{ r.Lv }}
          </option>
        </select>
        <label>武器</label>
        <select v-model="roles_weapon">
          <option v-for="w of weapons" :key="w.name" :value="w">
            {{ w.name }}
          </option>
        </select>
        <label>鎧</label>
        <select v-model="roles_armor">
          <option v-for="a of armors" :key="a.name" :value="a">
            {{ a.name }}
          </option>
        </select>
        <label>盾</label>
        <select v-model="roles_shield">
          <option v-for="s of shields" :key="s.name" :value="s">
            {{ s.name }}
          </option>
        </select>
        <label>兜</label>
        <select v-model="roles_head">
          <option v-for="h of heads" :key="h.name" :value="h">
            {{ h.name }}
          </option>
        </select>
        <label>力の種</label>
        <select v-model="roles_power_seed_value">
          <option v-for="n of 15" :key="n" :value="n">
            +{{ n }}
          </option>
        </select>
      </div>
      <div class="input">
        <label>サマル</label>
        <select v-model="saml">
          <option v-for="s of samls" :key="s.Lv" :value="s">
            {{ s.Lv }}
          </option>
        </select>
        <label>武器</label>
        <select v-model="samals_weapon">
          <option v-for="w of weapons" :key="w.name" :value="w">
            {{ w.name }}
          </option>
        </select>
        <label>鎧</label>
        <select v-model="samals_armor">
          <option v-for="a of armors" :key="a.name" :value="a">
            {{ a.name }}
          </option>
        </select>
        <label>盾</label>
        <select v-model="samals_shield">
          <option v-for="s of shields" :key="s.name" :value="s">
            {{ s.name }}
          </option>
        </select>
        <label>兜</label>
        <select v-model="samals_head">
          <option v-for="h of heads" :key="h.name" :value="h">
            {{ h.name }}
          </option>
        </select>
      </div>
      <div class="input">
        <label>ムーン</label>
        <select v-model="moon">
          <option v-for="m of moons" :key="m.Lv" :value="m">
            {{ m.Lv }}
          </option>
        </select>
        <label>武器</label>
        <select v-model="moons_weapon">
          <option v-for="w of weapons" :key="w.name" :value="w">
            {{ w.name }}
          </option>
        </select>
        <label>鎧</label>
        <select v-model="moons_armor">
          <option v-for="a of armors" :key="a.name" :value="a">
            {{ a.name }}
          </option>
        </select>
        <label>盾</label>
        <select v-model="moons_shield">
          <option v-for="s of shields" :key="s.name" :value="s">
            {{ s.name }}
          </option>
        </select>
        <label>兜</label>
        <select v-model="moons_head">
          <option v-for="h of heads" :key="h.name" :value="h">
            {{ h.name }}
          </option>
        </select>
        <label>守りの種</label>
        <select v-model="moons_def_seed_value">
          <option v-for="n of [0, 4, 8]" :key="n" :value="n">
            +{{ n }}
          </option>
        </select>
      </div>
    </div>
    <template v-if="monster && role && saml && moon">
      <div class="app-results" v-for="c in characters" :key="c.name">
        <damage-calc
          class="results"
          :name="c.name"
          :c_atk="Number(c.POW) + c.weapon"
          :c_def="Number(c.DEF) + c.armor + c.shield + c.head"
          :c_spd="Number(c.SPD)"
          :m_atk="Number(monster.atk)"
          :m_def="Number(monster.def)"
          :m_spd="monster.speeds"
          :is_pow_seed_shown="c.is_pow_seed_shown"
          :is_def_seed_shown="c.is_def_seed_shown"
          :is_spd_seed_shown="c.is_spd_seed_shown"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { MONSTERS } from '@/assets/data/monsters'
import { ROLE } from '@/assets/data/c1_role'
import { SAML } from '@/assets/data/c2_saml'
import { MOON } from '@/assets/data/c3_moon'
import { WEAPONS } from '@/assets/data/weapons'
import { ARMORS } from '@/assets/data/armors'
import { SHIELDS } from '@/assets/data/shields'
import { HEADS } from '@/assets/data/heads'

import DamageCalc from '@/components/DamageCalc'

export default {
  name: 'App',
  components: { DamageCalc },
  data() {
    return {
      monster: null,
      role: null,
      saml: null,
      moon: null,
      roles_weapon: null,
      roles_armor: null,
      roles_shield: null,
      roles_head: null,
      roles_power_seed_value: null,
      samals_weapon: null,
      samals_armor: null,
      samals_shield: null,
      samals_head: null,
      moons_weapon: null,
      moons_armor: null,
      moons_shield: null,
      moons_head: null,
      moons_def_seed_value: null
    }
  },
  computed: {
    characters() {
      return [
        {
          ...this.role,
          name: 'ローレシア',
          weapon: this.roles_weapon.value + this.roles_power_seed_value,
          armor: this.roles_armor.value,
          shield: this.roles_shield.value,
          head: this.roles_head.value,
          is_spd_seed_shown: false
        },
        {
          ...this.saml,
          name: 'サマルトリア',
          weapon: this.samals_weapon.value,
          armor: this.samals_armor.value,
          shield: this.samals_shield.value,
          head: this.samals_head.value,
          is_spd_seed_shown: false
        },
        {
          ...this.moon,
          name: 'ムーンブルク',
          weapon: this.moons_weapon.value,
          armor: this.moons_armor.value + this.moons_def_seed_value,
          shield: this.moons_shield.value,
          head: this.moons_head.value,
          is_spd_seed_shown: true
        }
      ]
    },
    monsters() {
      return MONSTERS
    },
    roles() {
      return ROLE
    },
    samls() {
      return SAML
    },
    moons() {
      return MOON
    },
    weapons() {
      return WEAPONS
    },
    armors() {
      return ARMORS
    },
    shields() {
      return SHIELDS
    },
    heads() {
      return HEADS
    }
  },
  created() {
    this.monster = this.monsters[68]
    this.role = this.roles[19]
    this.saml = this.samls[17]
    this.moon = this.moons[14]
    this.roles_weapon = this.weapons[13]
    this.roles_armor = this.armors[9]
    this.roles_shield = this.shields[4]
    this.roles_head = this.heads[3]
    this.roles_power_seed_value = 10
    this.samals_weapon = this.weapons[12]
    this.samals_armor = this.armors[4]
    this.samals_shield = this.shields[1]
    this.samals_head = this.heads[0]
    this.moons_weapon = this.weapons[6]
    this.moons_armor = this.armors[8]
    this.moons_shield = this.shields[0]
    this.moons_head = this.heads[2]
    this.moons_def_seed_value = 8
  }
}
</script>

<style>
.app-memo {
  margin-bottom: 12px;
}

.app-memo p {
  margin: 0;
}

.input select {
  padding-bottom: 4px;
}

.results {
  margin-top: 16px;
}
</style>
