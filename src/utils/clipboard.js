import Vue from 'vue'
import Clipboard from 'clipboard'

const clipboardSuccess = () => {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}

const clipboardError = () => {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}

// 点击复制文字
const handleClipboard = (text, event) => {
  // clipboard 动态设置 text（要复制的文字）
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })

  clipboard.on('success', (e) => {
    clipboardSuccess()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy() // 清理事件以及创建的对象
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy() // 清理事件以及创建的对象
  });
  clipboard.onClick(event)
}

export default handleClipboard

// clipboard.on('success', (e) => {
//   console.info('Action:', e.action);
//   console.info('Text:', e.text);
//   console.info('Trigger:', e.trigger);
//   e.clearSelection();
// })
// clipboard.on('error', function(e) {
//   console.error('Action:', e.action);
//   console.error('Trigger:', e.trigger);
// });

// {
//   key: 'onClick',
//   value: function onClick(e) {
//       var trigger = e.delegateTarget || e.currentTarget;

//       if (this.clipboardAction) {
//           this.clipboardAction = null;
//       }

//       this.clipboardAction = new _clipboardAction2.default({
//           action: this.action(trigger),
//           target: this.target(trigger),
//           text: this.text(trigger),
//           container: this.container,
//           trigger: trigger,
//           emitter: this
//       });
//   }

// on: function (name, callback, ctx) {
//   var e = this.e || (this.e = {});

//   (e[name] || (e[name] = [])).push({
//     fn: callback,
//     ctx: ctx
//   });

//   return this;
// },

// off: function (name, callback) {
//   var e = this.e || (this.e = {});
//   var evts = e[name];
//   var liveEvents = [];

//   if (evts && callback) {
//     for (var i = 0, len = evts.length; i < len; i++) {
//       if (evts[i].fn !== callback && evts[i].fn._ !== callback)
//         liveEvents.push(evts[i]);
//     }
//   }

//   // Remove event from queue to prevent memory leak
//   // Suggested by https://github.com/lazd
//   // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

//   (liveEvents.length)
//     ? e[name] = liveEvents
//     : delete e[name];

//   return this;
// }