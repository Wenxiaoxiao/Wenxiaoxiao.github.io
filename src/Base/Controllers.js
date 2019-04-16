import {GetApi} from './api';
import Common from './common';
const Controllers = {
    /*产品 */
    ProjectList:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('ProjectList'));
    },
    ProjectDetail:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('ProjectDetail'));
    },
    EventNews:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('EventNews'));
    },
    EventDetail:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('EventDetail'));
    },
    Contact:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('Contact'));
    },
    AboutUs:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('AboutUs'));
    },
    AboutUsnd:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('AboutUsnd'));
    },
    AboutUslist:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('AboutUslist'));
    },
    Lang_en:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('Lang_en'));
    },
    Lang_cn:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('Lang_cn'));
    },
    TopMenu:function(_fn,PARAM){
        Common.GetRequest(_fn,PARAM,GetApi('TopMenu'));
    }
}
export default Controllers;