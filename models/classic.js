// import {
//   Http
// } from "../utils/http.js";
// class ClassicModel extends Http {
//   getLatest(index, sCallback) {
//     this.request({
//       url: "/classic/latest",
//       success: (res) => {
//         sCallback(res.data);
//         this._setLatestIndex(res.data.index);
//         wx.setStorageSync(this._getKey(res.data.index), res.data)
//       }
//     });

//   }
//   isFirst(index) {
//     var index = index == 1 ? true : false;
//     return index;
//   }
//   isLatest(index) {
//     let latestIndex = this._getLatestIndex()
//     var index = index == latestIndex ? true : false;
//     return index;
//   }
//   getClassic(nextOrPrevious, index, sCallback) {
//     let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
//     let classic = wx.getStorageSync(key);
//     if (!classic) {
//       this.request({
//         url: "/classic/" +index+"/" +nextOrPrevious,
//         success: (res) => {
//           sCallback(res.data);
//           wx.setStorageSync(this._getKey(res.data.index), res.data)
//         }
//       })
//     }else{
//       sCallback(classic)
//     }

//   }
//   _setLatestIndex(index) {
//     wx.setStorageSync("latest", index)
//   }
//   _getLatestIndex() {
//     let index = wx.getStorageSync("latest");
//     return index;
//   }
//   _getKey(index) {
//     let key = "classic-" + index;
//     return key;
//   }
// };
// export {
//   ClassicModel
// };
wx.cloud.init({ env: "jiudao-server-yw8w2" })
const db = wx.cloud.database()

class ClassicModel {
  getLatest(index, sCallback) {
    db.collection('classicLatest')
      .get().then(res => {
        console.log(res.data[0])
        sCallback(res.data[0])
        this._setLatestIndex(res.data[0].index);
        wx.setStorageSync(this._getKey(res.data[0].index), res.data)
      })
  }
  getClassic(nextOrPrevious, index, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
    let classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: "/classic/" +index+"/" +nextOrPrevious,
        success: (res) => {
          sCallback(res.data);
          wx.setStorageSync(this._getKey(res.data.index), res.data)
        }
      })
    }else{
      sCallback(classic)
    }
  }
}
export {
  ClassicModel
};