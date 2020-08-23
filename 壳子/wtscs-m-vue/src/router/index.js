import Vue from 'vue';
import Router from 'vue-router';
import config from '@/api/common.js'; // 首页

const Index = ()=> import('@/pages/index')//首页
const SuperSearch = ()=> import('@/pages/super/search')//产品搜索
const SuperSearchCompoy = ()=> import('@/pages/super/search-compoy')//保险公司产品搜索

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use (Router);
const router = new Router ({
  routes: [
    // 保险商城start
    {
      path: '/',
      component: Index,
      name: 'index',
      meta: {
        title: config.env == 1 ? '保险商城—中国银保监会网销许可' : '超市',
        rank: 1,
        isKeep: true,
      },
    },
    {
      path: '/superPage',
      component: Index,
      name: 'index',
      meta: {
        title: config.env == 1 ? '保险商城—中国银保监会网销许可' : '超市',
        rank: 1,
        isKeep: true,
      },
    },
    // 产品搜索页
    {
      path: '/super/search',
      component: SuperSearch,
      meta: {
        title: '产品搜索',
        rank: 2,
        isKeep: true,
      },
    },
    // 保险公司产品搜索页
    {
      path: '/super/search-compoy',
      component: SuperSearchCompoy,
      meta: {
        title: '保险公司产品搜索',
        rank: 2,
        isKeep: true,
      },
    },
  ],
});

Vue.mixin ({
  beforeRouteLeave (to, from, next) {
    //离开 form  代表自己  to前往的页面
    if(this.mescroll){
      from.meta.scrolltop = this.mescroll.preScrollY;
      this.mescroll.setBounce(true);
    }
    // alert('离开'+this.mescroll.preScrollY);
    //不同等级, 并且这个页面存在缓存(返回)(2级返回1级  1级跳转1级)
    if (
      from.meta.rank &&
      to.meta.rank &&
      from.meta.isKeep &&
      (from.meta.rank > to.meta.rank || (from.meta.rank == 1 && to.meta.rank == 1))
    ) {
      from.meta.scrolltop = 0;
      //清除当前页面缓存
      if (
        this.$vnode.parent &&
        this.$vnode.parent.componentInstance &&
        this.$vnode.parent.componentInstance.cache
      ) {
        if (this.$vnode.componentOptions) {
          var key = this.$vnode.key == null
            ? this.$vnode.componentOptions.Ctor.cid +
                (this.$vnode.componentOptions.tag
                  ? `::${this.$vnode.componentOptions.tag}`
                  : '')
            : this.$vnode.key;
          var cache = this.$vnode.parent.componentInstance.cache;
          var keys = this.$vnode.parent.componentInstance.keys;
          if (cache[key]) {
            if (keys.length) {
              var index = keys.indexOf (key);
              if (index > -1) {
                keys.splice (index, 1);
              }
            }
            delete cache[key];
          }
        }
      }
    }
    // this.$destroy ();
    next ();
  },

  beforeRouteEnter: (to, from, next) => {
    //进入 to 代表自己  from 代表上个页面 (1级进入2级  1级进入1级)
     if (
      to.meta.rank &&
      to.meta.isKeep &&
      (!from.meta.title || to.meta.rank > from.meta.rank  || (from.meta.rank == 1 && to.meta.rank == 1))
    ) {
      to.meta.keepAlive = true;
      to.meta.scrolltop = 0;
    }
    next (vms=>{
      if( vms.mescroll){
        vms.mescroll.scrollTo(parseInt(to.meta.scrolltop),0);
      }

      // alert("进入"+vms.mescroll.preScrollY);
    });
  },
});

export default router;
