import Vue from 'vue'
import Util from '../libs/util'
import { IM } from '../libs/im'

/**
 * 全局的数据
 * */
var imgPathPrefix = 'images/home/'

exports.Global = {
    data: {
        baseWidth: null,                           // 页面加载时窗口初始宽度，用于计算页面 scale
        winWidth: null,                             // 页面内容容器的当前宽度--固定20rem
        winHeight: null,                            // 页面的高度
        winScale: 1,                                   // 页面当前的font scale
        fullPage: false,                              // 如果为true page-container的height将设置为100%

        currPage: {                                   // 当前页面信息
            name: '',
            query: null
        },
        lastPage: {                                    // 上一次的页面信息
            name: '',
            query: null
        },

        showAppMenu: false,                   // 是否显示底部菜单--club模式下
        show9358Menu: false,                  // 9358公众号模式下
        loading: false,                               // 是否显示loading效果
        pageMode: 'club',                         // 当前模式，club--会所网站 9358--公众号
        sessionType: 'web',                        // sessionType
        token: '',                                        // 用户token
        userId: '',                                       // 用户 ID
        userAvatar: '',                                // 用户头像ID
        userHeader: '',                               // 用户头像URL
        userTel: '',                                      // 用户手机
        userName: '',                                 // 用户名
        loginName: '',
        isTelephoneUser: false,
        isLogin: false,                                // 用户是否登录
        loginPage: '',                                 // 登录之后跳转的页面
        loginPageQuery: {},                       // 登录之后跳转的页面参数

        authCode: '',
        loginChanel: '',
        openId: '',
        nickName: '',
        headerImgUrl: '',
        clubInviteCode: '',
        techSerialNo: '',
        techInviteCode: '',
        isFollowed: false,

        currLngx: '',                                    // 地理位置坐标
        currLaty: '',
        userAgent: {                                   // 浏览器UA
            isWX: false,
            isiPhone: false
        },

        defaultClubLogo: imgPathPrefix + 'logo_default.jpg',                        // 默认的club logo
        defaultHeader: imgPathPrefix + 'header_default.jpg',                        // 默认的头像
        defaultTechName: '小摩豆技师',                                                      // 默认的技师名字
        defaultName: '匿名用户',                                                                 // 默认的名称
        defaultBannerImgUrl: imgPathPrefix + 'banner_default.jpg',               // 默认的banner图
        defaultServiceItemImgUrl: imgPathPrefix + 'serviceItem_default.jpg',  // 默认的服务项目图
        defaultGiftImg: 'images/chat/gift_default.png',                                // 默认的积分礼物图片
        loadError: '数据请求失败！',
        visitError: '页面缺少访问参数！',

        clubId: null,                                                                               // 当前会所ID
        clubLogoUrl: null,                                                                      // 当前会所logo
        clubName: '',                                                                             // 当前会所名称
        clubTelephone: [],                                                                      // 当前会所联系电话

        pageScrollTop: 0, // 页面滚动条的位置

        clubCfg: {                                                                           // 当前会所的一些配置信息、开关
            accountSwitch: null, // 账户系统
            creditSwitch: false, // 积分系统是否开启
            diceGameTimeout: 24 * 60 * 60 * 1000, // 骰子游戏超时时间
            diceGameSwitch: false, // 骰子游戏是否开启
            paidCouponSwitch: false, // 点钟券
            paidCouponFee: 0, // 点钟券手续费
            paidOrderSwitch: false, // 付费预约开关
            paidOrderFee: 0 // 付费预约手续费
        },
        shareConfigOption: {},      // 全局的分享option
        techList: [],                                                                                 // 暂存的技师列表页面数据
        techListID: {},                                                                              // 暂存的技师列表ID值
        pageData: {}                                                                               // 缓存(在内存)的页面数据，切换回来的时候可以恢复状态
    },
    beforeInit: function () {
        var ua = navigator.userAgent.toLowerCase()
        var that = this
        var data = that.data
        var userAgent = data.userAgent
        var body = document.querySelector('body')

        userAgent.isWX = /micromessenger/.test(ua)
        userAgent.isiPhone = /iPhone/i.test(ua)

        // 获取clubID
        var tArr = location.href.toString().match(/\/(\d{18,18})\/?/)
        if (tArr && tArr[1]) {
            data.pageMode = 'club'
            data.clubId = tArr[1]
        } else {
            data.pageMode = '9358'
        }
        console.log('init club id：' + data.clubId)

        // 依据窗口的宽度调整
        window.addEventListener('resize', function () {
            that.resizeWidth()
        })

        body.addEventListener('scroll', function () {
            console.log('body.scrollTop：' + body.scrollTop)
        })
        that.resizeWidth()
    },
    /*
     * 初始化一些数据
     */
    init: function () {
        var that = this
        var data = that.data

        data.token = Util.localStorage('token') || Util.localStorage('userToken')
        data.userId = Util.localStorage('userID')
        data.userHeader = Util.localStorage('userHeader') || data.defaultHeader
        data.userAvatar = Util.localStorage('userAvatar')
        data.userTel = Util.localStorage('userTel')
        data.userName = Util.localStorage('userName') || data.defaultName
        data.loginName = Util.localStorage('userLoginName')

        // 加载会所的基本信息
        if (data.clubId) {
            Vue.http.get('../api/v2/club/' + data.clubId + '/clubName').then((res) => {
                res = res.body
                data.clubLogoUrl = res.logo || data.defaultClubLogo
                data.clubName = res.name
                data.clubTelephone = res.telephone ? res.telephone.split(',') : []

                data.shareConfigOption = {
                    title: data.clubName + '欢迎您',
                    desc: '选个技师，选个项目，给身体放个假，这里太合适不过了。',
                    link: location.origin + '/spa-manager/spa/#/' + data.clubId + '/home?visitChannel=9358&isNeedFollow=true',
                    imgUrl: data.clubLogoUrl
                }
            })
        }

        // 添加Object.assign 方法，合并两个对象
        if (!Object.assign) {
            Object.defineProperty(Object, 'assign', {
                enumerable: false,
                configurable: true,
                writable: true,
                value: function (target, firstSource) {
                    if (target == undefined || target == null) return
                    var to = Object(target)
                    for (var i = 1; i < arguments.length; i++) {
                        var nextSource = arguments[i]
                        if (nextSource == undefined || nextSource == null) continue
                        var keysArray = Object.keys(Object(nextSource))
                        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                            var nextKey = keysArray[nextIndex]
                            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey)
                            if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey]
                        }
                    }
                    return to
                }
            })
        }

        IM.global = that.data
        return new Promise(function (resolve) {
            // check login
            if (data.token && data.userId) {
                Vue.http.get('../api/v1/check_login/' + data.sessionType + '/' + data.token).then(function (res) {
                    res = res.body
                    if (res.msg !== 'Y') {
                        that.clearLoginInfo()
                    } else {
                        // console.log('util.md5' + data.userId)
                        var im = IM
                        var userTel = data.userTel
                        im.id = Util.md5(data.userId)
                        im.password = im.id
                        im.userId = data.userId
                        im.header = data.userHeader
                        im.avatar = data.userAvatar
                        im.name = (data.userName == data.defaultName && userTel) ? data.defaultName + '(' + userTel.substr(0, 3) + '****' + userTel.slice(-4) + ')' : data.userName
                        im.createConn() // 创建环信连接

                        data.isLogin = true
                        that.updateUserNameAndHeader()
                    }
                    resolve()
                })
            } else {
                that.clearLoginInfo()
                resolve()
            }
        })
    },
    /*
     * 依据窗口宽度调整页面font-size
     */
    resizeWidth: function () {
        var data = this.data
        var win = window
        var doc = document
        var root = doc.documentElement

        if (!data.baseWidth) {
            data.baseWidth = doc.body.clientWidth || 320
        }
        data.winWidth = root.clientWidth || win.innerWidth || doc.body.clientWidth
        data.winHeight = root.clientHeight || win.innerHeight
        data.winWidth = data.winWidth > 540 ? 540 : (data.winWidth < 320 ? 320 : data.winWidth)
        data.winScale = data.winWidth / data.baseWidth
        root.style.fontSize = data.winScale * 16 + 'px'
    },
    /*
     * 删除用户登录信息
     */
    clearLoginInfo: function () {
        var that = this
        var data = that.data

        data.isLogin = false
        data.token = ''
        data.userId = ''
        data.userHeader = ''
        data.userAvatar = ''
        data.userTel = ''
        data.userName = ''
        data.loginName = ''

        Util.removeLocalStorage('token')
        Util.removeLocalStorage('userID')
        Util.removeLocalStorage('userHeader')
        Util.removeLocalStorage('userAvatar')
        Util.removeLocalStorage('userTel')
        Util.removeLocalStorage('userName')
        Util.removeLocalStorage('userLoginName')

        // 关闭环信连接
        IM.closeConn()
    },
    /*
     * 获取会所的开关信息
     */
    getClubSwitches: function (clubId) {
        var that = this
        clubId = clubId || that.data.clubId
        return new Promise(function (resolve, reject) {
            Vue.http.get('../api/v2/user/switches', {params: {clubId: clubId}}).then(function (res) {
                res = res.body
                if (res.statusCode == 200) {
                    res = res.respData
                    var cfg = (clubId == that.data.clubId ? that.data.clubCfg : {})

                    cfg.accountSwitch = (res.account.switch == 'on')
                    cfg.creditSwitch = (res.credit.systemSwitch == 'on' && res.credit.clubSwitch == 'on')
                    cfg.diceGameSwitch = (cfg.creditSwitch && res.credit.diceGameSwitch == 'on')
                    if (cfg.diceGameSwitch) {
                        cfg.diceGameTimeout = res.credit.gameTimeoutSeconds * 1000
                    }

                    cfg.paidCouponSwitch = (res.paidCoupon.couponSwitch == 'on')
                    if (cfg.paidCouponSwitch) {
                        cfg.paidCouponFee = res.paidCoupon.couponPlatformFee
                    }

                    cfg.paidOrderSwitch = (res.paidOrder.switch == 'on')
                    if (cfg.paidOrderSwitch) {
                        cfg.paidOrderFee = res.paidOrder.platformFee
                    }
                    resolve(cfg)
                } else {
                    reject('请求异常！')
                }
            })
        })
    },
    /*
     * 获取当前用户积分
     */
    getCreditAccount: function (clubId) {
        var that = this
        clubId = clubId || that.data.clubId
        return new Promise(function (resolve, reject) {
            Vue.http.get('../api/v2/credit/user/account', {
                params: {
                    clubId: clubId,
                    userType: 'user'
                }
            }).then(function (res) {
                res = res.body
                if (res.statusCode == 200) {
                    resolve(res.respData)
                } else {
                    reject()
                }
            })
        })
    },
    /*
     * 更新用户的名称和头像
     */
    updateUserNameAndHeader: function () {
        var that = this
        var data = that.data
        if (data.token) {
            Vue.http.get('../api/v2/profile/user/info/view').then(function (res) {
                res = res.body
                if (res.statusCode == 200) {
                    res = res.respData
                    data.userAvatar = res.avatar || ''
                    data.userName = res.name || data.defaultName
                    data.userHeader = res.avatarUrl || data.defaultHeader

                    Util.localStorage('userName', data.userName)
                    Util.localStorage('userAvatar', data.userAvatar)
                    Util.localStorage('userHeader', data.userHeader)
                }
            })
        }
    },

    // 设置分享配置
    shareConfig: function (option, configPage) {
        var win = window
        var wx = win['wx']
        var that = this
        if (!wx) return
        option = option || {}
        if (wx['signReady']) {
            if (configPage == wx['configPage']) { // 已经配置过此页面的分享
                return
            }
            if (option.title) {
                wx.hideMenuItems({menuList: ['menuItem:copyUrl']})
                wx.showAllNonBaseMenuItem()
                wx.onMenuShareAppMessage(option) // 分享给朋友
                wx.onMenuShareTimeline(option) // 分享到朋友圈
                wx.onMenuShareQQ(option) // 分享到QQ
                wx.onMenuShareWeibo(option) // 分享到腾讯微博
                wx.onMenuShareQZone(option) // 分享到QQ空间
            } else {
                wx.hideAllNonBaseMenuItem() // 屏蔽分享菜单
            }
            wx['configPage'] = configPage
        } else {
            win['requestSignCount'] = 2
            that.weiXinCfgSignature(option, configPage)
        }
    },

    // 微信签名
    weiXinCfgSignature: function (option, configPage) {
        var signUrl = ''
        var win = window
        var wx = win['wx']
        var that = this

        Vue.http.get('../api/v1/wx/sign', {
            params: {
                url: encodeURIComponent(signUrl),
                sessionType: '9358'
            }
        }).then(function (res) {
            res = res.body
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nonceStr,
                signature: res.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'hideMenuItems']
            })

            if (!win['wxError']) {
                win['wxError'] = true
                wx.error(function () { // 微信分享配置失败
                    wx['signReady'] = false
                    win['requestSignCount']--
                    if (win['requestSignCount'] !== 0) {
                        that.weiXinCfgSignature(option, configPage)
                    }
                })
            }

            if (!win['wxReady']) {
                win['wxReady'] = true
                wx.ready(function () {
                    wx['signReady'] = true
                    that.shareConfig(option, configPage)
                })
            }
        })
    },

    checkAccess: function () {
        return true
    },

    bindTelPhone: function () {

    },
    /*
     * 从当前页面page跳转到login页面
     */
    login: function (router, page, query) {
        var that = this.data
        var currPage = that.currPage
        that.loginPage = page || currPage.name
        that.loginPageQuery = {}
        query = query || currPage.query
        for (var item in query) {
            that.loginPageQuery[item] = query[item]
        }
        if (router) {
            router.push({name: 'login'})
        }
    },

    /*
     * 登录之后跳转到上次访问的页面
     */
    redirectToLastPage: function (router) {
        var data = this.data
        if (data.loginPage) {
            router.push({name: data.loginPage, query: data.loginPageQuery})
        } else if (data.pageMode == 'club') {
            router.push({name: 'home'})
        } else {
            router.push({path: '/'})
        }
    },

    // 获取授权
    getOauthCode: function (pageUrl, sessionType, state, scope, msg, errorCallBack, isReplaceUrl) {
        var loc = location
        scope = (scope == 'base' ? 'snsapi_base' : 'snsapi_userinfo')
        var tmpSearch = loc.search
        if (isReplaceUrl) {
            pageUrl = new URL(pageUrl)
            tmpSearch = pageUrl.search
        }
        if (/_t=(\d*)/g.test(tmpSearch)) {
            tmpSearch = tmpSearch.replace(/_t=(\d*)/g, function () {
                return '_t=' + (+new Date())
            })
        } else {
            tmpSearch = (tmpSearch || '') + '&_t=' + (+new Date())
        }
        if (isReplaceUrl !== true) {
            pageUrl = loc.origin + loc.pathname + tmpSearch + loc.hash + (loc.hash ? (pageUrl.indexOf('&') == 0 ? pageUrl : (pageUrl ? '/' + pageUrl : '')) : pageUrl)
        } else {
            pageUrl = pageUrl.origin + pageUrl.pathname + tmpSearch + pageUrl.hash
        }
        if (!/_offline_notice/.test(pageUrl)) {
            pageUrl = pageUrl.replace(/(&|\?)code=[\da-zA-Z]+(&?)/g, function (v1, v2, v3) {
                return v2 == '?' ? (v3 ? '?' : '') : (v3 ? '&' : '')
            })
        }
        pageUrl = pageUrl.replace(/(&|\?)state=[\da-zA-Z_-]+(&?)/g, function (v1, v2, v3) {
            return v2 == '?' ? (v3 ? '?' : '') : (v3 ? '&' : '')
        })

        Vue.http.post('../api/v2/wx/oauth2/code', {
            wxmp: sessionType,
            state: state,
            pageUrl: pageUrl, // post方式url不需要编码
            scope: scope
        }).then(function (res) {
            res = res.body
            if (res && res.statusCode == 200) {
                loc.href = res.respData
            } else {
                if (errorCallBack) {
                    errorCallBack(res)
                } else {
                    Util.tipShow(msg || res.msg || '请求微信授权失败！')
                }
            }
        })
    },
    // 获取OpenId option参数：authCode scope openId sessionId state
    getOpenId: function (option) {
        var that = this
        return new Promise(function (resolve, reject) {
            Vue.http.post('../api/v2/wx/oauth2/openid', {
                code: option.authCode,
                scope: option.scope || 'snsapi_base',
                sessionType: '9358',
                openId: option.openId || '',
                webSessionId: option.sessionId || ''
            }).then(function (res) {
                res = res.body
                if (res.statusCode == 200) {
                    res = res.respData.openid
                    that.data.openId = res
                    resolve(res)
                } else if (res.statusCode == 40029) {
                    that.getOauthCode('', '9358', option.state || '9358', 'base')
                    reject('重新获取授权！')
                } else {
                    reject(res.msg || '获取openId失败！')
                }
            }, function () {
                reject('获取openId失败！')
            })
        })
    },
    // 等待高德地图初始化完成
    waitAMapInit: function () {
        return new Promise(function (resolve, reject) {
            if (AMap && AMap.LngLat) {
                resolve()
            } else {
                var waitCount = 0
                var waitAMapReady = setInterval(function () {
                    waitCount++
                    if (AMap && AMap.LngLat) {
                        clearInterval(waitAMapReady)
                        resolve()
                    } else if (waitCount > 30) {
                        reject()
                    }
                }, 200)
            }
        })
    },

    bindPhone: function () {

    },

    // 设置页面标题
    setDocumentTitle: function (title) {
        document.title = title
        var that = this
        var doc = document
        var frame = null
        var ua = that.data.userAgent
        if (ua.isWX || ua.isiPhone) {
            frame = doc.createElement('iframe')
            frame.style.display = 'none'
            frame.onload = function () {
                frame.onload = null
                setTimeout(function () {
                    doc.body.removeChild(frame)
                }, 0)
            }
            frame.src = that.data.defaultClubLogo
            doc.body.appendChild(frame)
        }
    }
}
