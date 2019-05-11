<template>
  <div class="curved-screen" :style="screenStyle">
    <div
      class="screen-column"
      :style="[screenWidthStyle, screenRotateStyle[index]]"
      v-for="(columnItem, index) in column"
      :key="columnItem"
    >
      <div
        class="screen-item"
        :style="screenHeightStyle"
        v-for="rowItem in row"
        :key="rowItem"
        @click="handleClick(columnItem, rowItem, $event)"
        @mouseover="handleMouseEnter(columnItem, rowItem, $event)"
        @mouseleave="handleMouseLeave(columnItem, rowItem, $event)"
      >
        <slot :name="`screen${rowItem}${columnItem}`"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurvedScreen',
  props: {
    width: {
      type: Number,
      default: 1200
    },
    height: {
      type: Number,
      default: 500
    },
    row: {
      type: Number,
      default: 3
    },
    column: {
      type: Number,
      default: 5
    },
    screenGap: {
      type: Number,
      default: 10
    },
    rotateDeg: {
      type: Number,
      default: 30
    },
    perspective: {
      type: String,
      default: '1000px'
    }
  },
  data () {
    return {
      transformOrigin: ['0 0', '100% 0'],
      transformConstant: 70,
      transformSide: 35,
      transformMid: 26
    }
  },
  computed: {
    screenStyle () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        perspective: this.perspective
      }
    },
    screenWidth () {
      return (this.width - (this.column - 1) * this.screenGap) / this.column
    },
    screenHeight () {
      return (this.height - (this.row - 1) * this.screenGap) / this.row
    },
    screenWidthStyle () {
      return {
        width: this.screenWidth + 'px',
        marginRight: `${this.screenGap}px`
      }
    },
    screenHeightStyle () {
      return {
        height: this.screenHeight + 'px',
        marginBottom: `${this.screenGap}px`
      }
    },
    isOdd () {
      return this.column % 2 !== 0
    },
    translateDistance () {
      const radian = (this.rotateDeg * Math.PI / 180).toFixed(2)

      return this.screenWidth * radian + 4
    },
    screenRotateStyle () {
      let mid = Math.floor(this.column / 2)
      let arr = []
      const style = {
        transform: `rotateY(0) translateZ(-${this.translateDistance * mid + this.transformMid}px)`
      }

      mid = this.isOdd ? mid : mid - 1

      for (let i = 0; i < mid; i++) {
        arr.push({
          transform: `rotateY(${this.rotateDeg}deg) ` + 
            `translateZ(-${this.translateDistance * i}px)` + 
            `translate(${this.transformSide * i + this.transformConstant}px)`,
          transformOrigin: this.transformOrigin[0]
        })
      }

      this.isOdd
        ? arr.push(style)
        : arr.push(style, style)

      for (let i = mid + 1; i < this.column; i++) {
        arr.push({
          transform: `rotateY(-${this.rotateDeg}deg)` +
            `translateZ(-${this.translateDistance * (this.column - i - 1)}px)` + 
            `translate(-${(this.column - i - 1) * this.transformSide + this.transformConstant}px)`,
            transformOrigin: this.transformOrigin[1]
        })
      }

      return arr
    }
  },
  methods: {
    handleClick (columnItem, rowItem, event) {
      this.$emit('screen-click', { columnItem, rowItem, event })
    },
    handleMouseEnter (columnItem, rowItem, event) {
      this.$emit('screen-mouse-enter', { columnItem, rowItem, event })
    },
    handleMouseLeave (columnItem, rowItem, event) {
      this.$emit('screen-mouse-leave', { columnItem, rowItem, event })
    }
  }
}
</script>

<style scoped>
.curved-screen {
  display: flex;
}

.screen-column:last-child {
  margin-right: 0 !important;
}
.screen-item {
  cursor: pointer;
}
.screen-item:last-child {
  margin-bottom: 0 !important;
}
</style>
