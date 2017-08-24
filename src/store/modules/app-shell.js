/**
 * @file app shell store
 * @author zqyadam(zqyadam@qq.com)
 */

import * as types from '../mutation-types';

let state = {

    /**
     * 是否需要页面切换动画
     *
     * @type {boolean}
     */
    needPageTransition: true,

    /**
     * 多个页面是否处于切换中
     *
     * @type {boolean}
     */
    isPageSwitching: false,

    /**
     * 多个页面切换效果名称
     *
     * @type {string}
     */
    pageTransitionName: '',

    /**
     * 上个页面 scroll 的信息
     *
     * @type {Object}
     */
    historyPageScrollTop: {}
};

let actions = {

    /**
     * 开启页面切换动画
     *
     * @param {Function} commit commit
     */
    enablePageTransition({commit}) {
        commit(types.ENABLE_PAGE_TRANSITION);
    },

    /**
     * 关闭页面切换动画
     *
     * @param {Function} commit commit
     */
    disablePageTransition({commit}) {
        commit(types.DISABLE_PAGE_TRANSITION);
    },

    /**
     * 设置页面是否处于切换中
     *
     * @param {Function} commit commit
     * @param {boolean} isPageSwitching isPageSwitching
     */
    setPageSwitching({commit}, isPageSwitching) {
        commit(types.SET_PAGE_SWITCHING, isPageSwitching);
    },

    /**
     * 保存页面 scroll 高度
     *
     * @param {[type]} options.commit [description]
     * @param {string} options.path path
     * @param {number} options.scrollTop scrollTop
     */
    saveScrollTop({commit}, {path, scrollTop}) {
        commit(types.SAVE_SCROLLTOP, {path, scrollTop});
    }
};

let mutations = {
    [types.SET_PAGE_SWITCHING](state, isPageSwitching) {
        state.isPageSwitching = isPageSwitching;
    },
    [types.SET_PAGE_TRANSITION_NAME](state, {pageTransitionName}) {
        state.pageTransitionName = pageTransitionName;
    },
    [types.SAVE_SCROLLTOP](state, {path, scrollTop}) {
        state.historyPageScrollTop[path] = scrollTop;
    },
    [types.DISABLE_PAGE_TRANSITION](state){
        state.needPageTransition = false;
    },
    [types.ENABLE_PAGE_TRANSITION](state){
        state.needPageTransition = true;
    }
};

export default {
    namespaced: true,
    /* eslint-disable */
    actions,
    mutations,
    state,
    /* eslint-enable */
    modules: {

        /**
         * 顶部导航栏的数据
         *
         * @type {Object}
         */
        appHeader: {
            namespaced: true,
            state: {

                /**
                 * 是否展示顶部导航栏
                 *
                 * @type {boolean}
                 */
                show: true,

                /**
                 * 标题内容
                 *
                 * @type {string}
                 */
                title: 'Todo list',

                /**
                 * logo图标名称
                 *
                 * @type {string}
                 */
                logoIcon: '',

                /**
                 * 是否展示左侧菜单图标
                 *
                 * @type {boolean}
                 */
                showMenu: true,

                /**
                 * 是否展示左侧返回图标
                 *
                 * @type {boolean}
                 */
                showBack: false,

                /**
                 * 返回时是否暂时确认对话框
                 *
                 * @type {boolean}
                 */
                needBackConfirm: false,

                /**
                 * 是否展示左侧logo
                 *
                 * @type {boolean}
                 */
                showLogo: true,

                /**
                 * 右侧操作按钮数组
                 *
                 * @type {Array}
                 */
                actions: []
            },
            actions: {

                /**
                 * 设置顶部导航条
                 *
                 * @param {Function} commit commit
                 * @param {Object} appHeader appHeader
                 */
                setAppHeader({commit}, appHeader) {
                    commit(types.SET_APP_HEADER, appHeader);
                }
            },
            mutations: {
                [types.SET_APP_HEADER](state, appHeader) {
                    state = Object.assign(state, appHeader);
                }
            }
        },

        /**
         * 左侧侧边栏的数据
         *
         * @type {Object}
         */
        appSidebar: {
            namespaced: true,
            state: {
                show: false, // 是否显示sidebar

                // 头部条的相关配置
                title: {
                    imageLeft: '',
                    altLeft: '',
                    svgLeft: '',
                    iconLeft: 'home',
                    text: 'Home',
                    imageRight: '',
                    altRight: '',
                    svgRight: '',
                    iconRight: ''
                },

                user:{
                    name:'test',
                    location:'Shenyang',
                    email:'test@test.com'
                },

                // 分块组
                blocks: [
                    {
                        // 子列表1
                        sublistTitle: 'About',
                        list: [
                            {
                                text: '帮助',
                                icon: 'help_outline',
                                route: {
                                    name:'help'
                                }
                            },
                            {
                                text: '登出',
                                icon: 'exit_to_app',
                                route: {
                                    name:'logout'
                                }
                            }
                        ]
                    }
                ]
            },
            actions: {

                /**
                 * 展示侧边栏
                 *
                 * @param {Function} commit commit
                 */
                showSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, true);
                },

                /**
                 * 隐藏侧边栏
                 *
                 * @param {Function} commit commit
                 */
                hideSidebar({commit}) {
                    commit(types.SET_SIDEBAR_VISIBILITY, false);
                }
            },
            mutations: {
                [types.SET_SIDEBAR_VISIBILITY](state, sidebarVisibility) {
                    state.show = sidebarVisibility;
                }
            }
        },

        /**
         * app shell 底部导航栏的数据
         *
         * @type {Object}
         */
        appBottomNavigator: {
            namespaced: true,
            state: {

                /**
                 * 是否展示底部导航栏
                 *
                 * @type {boolean}
                 */
                show: false,

                /**
                 * 导航按钮列表
                 *
                 * @type {Array.<Object>}
                 */
                navs: [
                    {
                         // 按钮的名字
                        name: 'undone',

                        // 显示的 icon
                        icon: 'schedule',//watch_later

                        // 显示的文字
                        text: '未完成',

                        // 是否是当前激活的
                        active: true,

                        // 路由
                        // route: {
                        //     name: 'home',
                        //     path: '/'
                        // }
                        
                    },
                    {
                        // 按钮的名字
                        name: 'done',

                        // 显示的 icon
                        icon: 'done',

                        // 显示的文字
                        text: '已完成',

                        // 路由信息
                        // route: '/user'
                    },
                    // {
                    //     // 按钮的名字
                    //     name: 'important',

                    //     // 显示的 icon
                    //     icon: 'ring_volume',

                    //     // 显示的文字
                    //     text: '重要', 

                    //     // 路由信息
                    //     // route: '/todo'
                    // }
                ]
            },
            actions: {

                /**
                 * 隐藏底部导航
                 *
                 * @param {Function} commit commit
                 */
                hideBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: false});
                },

                /**
                 * 显示底部导航
                 *
                 * @param {Function} commit commit
                 */
                showBottomNav({commit}) {
                    commit(types.SET_APP_BOTTOM_NAV, {show: true});
                },

                /**
                 * 激活底部导航
                 *
                 * @param {Function} commit commit
                 * @param {string} name name
                 */
                activateBottomNav({commit}, name) {
                    commit(types.ACTIVATE_APP_BOTTOM_NAV, name);
                },


                /**
                 * 重置底部导航为默认设置
                 *
                 * @param {Function} commit commit
                 */
                resetBottomNav({commit}){
                    commit(types.SET_APP_BOTTOM_NAV, {navs: state.appBottomNavigator.defaultNavs});
                }
            },
            mutations: {
                [types.ACTIVATE_APP_BOTTOM_NAV](state, name) {
                    state.navs = state.navs.map(nav => {
                        nav.active = nav.name === name;
                        return nav;
                    });
                },
                [types.SET_APP_BOTTOM_NAV](state, appBottomNavigator) {
                    state = Object.assign(state, appBottomNavigator);
                }
            }
        },
        /**
         * app shell 底部Snackbar的数据
         *
         * @type {Object}
         */

        appSnackbar: {
            namespaced: true,
            state: {
                /**
                 * 是否显示snackbar
                 *
                 * @type {boolean}
                 */
                show: false,

                /**
                 * snackbar显示样式
                 *
                 * @type {String}
                 */
                type:'error',
                /**
                 * snackbar显示的信息
                 */
                msg:''

            },
            actions: {

                /**
                 * 显示snackbar
                 *
                 * @param {Function} commit commit
                 */
                showSnackbar({commit},snackbarInfo) {
                    commit(types.SHOW_SNACKBAR, snackbarInfo);
                },

                /**
                 * 隐藏snackbar
                 *
                 * @param {Function} commit commit
                 */
                hideSnackbar({commit}) {
                    commit(types.HIDE_SNACKBAR);
                },

            },
            mutations: {
                [types.SHOW_SNACKBAR](state, snackbarInfo) {
                    state.type = snackbarInfo.type;
                    state.msg = snackbarInfo.msg;
                    state.show = true;
                },
                [types.HIDE_SNACKBAR](state) {
                    state.show = false;
                }
            }
        }

    }
};
