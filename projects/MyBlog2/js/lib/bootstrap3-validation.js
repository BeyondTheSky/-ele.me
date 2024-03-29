/* ========================================================= 
 * 新增本地修改： input失去焦点时 先清空提示信息   再验证      （第303行）
 * 
 * 
 * 
 * 
 * 在原作者的基础修改支持 bootstrap3
 *
 * check-type=
 *   required 不能为空，并在后面自动加*号
 *   url  表示 输入网址
 *   date 日期格式 xxxx-xx-xx
 *   mail 邮箱
 *   number 数字，可以整型，浮点型。
 *   char 
 *   chinese 中文
 *   idcode 身份证号码
 *   phone 手机号码
 *   equals 验证两次输入是否一致 使用equalTo指定第一次输入框的id
 *
 * mail-message="扩展提示内容" ， 可以扩展data-message,url-message  
 * minlength="6" 表示长度大于等于6
 * range="2.1~3"   表示值在[2.1~3]之间，并check-type="number"
 * range="2.1,2,4,5"   表示值在只能填现数字，并check-type="number" 
 *
 *
 * 例如:
 * $("form").validation(function(obj,params){
 *     if (obj.id=='mail'){
 *       $.post("/verifymail",{mail :$(obj).val()},function(data){
 *         params.err = !data.success;
 *         params.msg = data.msg;
 *       });
 *     }},
 *     {reqmark:false}
 *   );
 *
 *
 *  编号   版本号      作者     修改日期        修改内容
 *   1    1.0.0     mrlong    2013-10-2      创建文件
 ×   2    1.0.1     mrlong    2013-10-5      callback显示提示的信息
 *   3.   1.0.2     mrlong    2013-10-7     增加基本表单与内联表单样式
 *   4.   1.0.3     mrlong    2013-11-04     修改支持IE8，不能Array.indexOf() 改为 $.inArray()
 *   5.   1.0.4     mrlong    2014-6-15     修改在textarea没有type时的错误,扩展valid（）方法
 *
 *
/* =========================================================
 * bootstrap-validation.js 
 * Original Idea: http:/www.newkou.org (Copyright 2012 Stefan Petre)
 * Updated by 不会飞的羊 (https://github.com/FateSheep/Validation-for-Bootstrap)
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
!function($) {
    $.fn.validation = function(callback,options) {

        if ( !this.length ) {
            if ( options && options.debug && window.console ) {
                console.warn( "Nothing selected, can't validate, returning nothing." );
            }
            return;
        }

        return this.each(function() {
            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            globalOptions.callback = callback;
            // Add novalidate tag if HTML5.
            $(this).attr( "novalidate", "novalidate" );
            fform_style = isformstyle(this);
            validationForm(this)
        });
    };

    $.fn.valid=function(object,options){
        if (formState) { // 重复提交则返回
            return false;
        };
        $("#validerrmsg").remove();

        var myobject;
        var myoptions;
        if (typeof object === 'object'){
            myobject = $(object);
            myoptions = options;
        }
        else{
            myoptions = object;
        };

        formState = true;
        var validationError = false; 
        //取出验证的
        $('input, textarea', this).each(function () {
            var el = $(this), 
                controlGroup = el.parents('.form-group'),
                //check-type="required chinese"  //支持多个，以空格隔开
                valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' '); 
            if (!controlGroup.hasClass('has-success') && valid != null && valid.length > 0) {
                if (!validateField(this, valid)) {
                    if (wFocus == false) {
                        scrollTo(0, el[0].offsetTop - 50);
                        wFocus = true;
                    }
                    validationError = true;
                }
            }
        });

        wFocus = false;
        formState = false;
        
        //显示信息内容 2014-6-15
        //在最后的提交按钮增加提示内容
        if(myoptions !=null && validationError){
            if (myobject ==null){
                myobject = $('button:last[type=submit]');
            };
            myobject.after('<span id="validerrmsg" class="help-block" style="color: #FF0000;">'+myoptions+'</span>');
              
        };
        //end

        return !validationError;        
    }

   $.fn.validation.defaults = {
        validRules : [
            {name: 'required', validate: function(value) {return ($.trim(value) == '');}, defaultMsg: '请输入内容'},
            {name: 'equals', validate: function(value) {return ($.trim(value) == '');}, defaultMsg: '请输入内容'},
            //{name: 'number', validate: function(value) {return (!/^[0-9]\d*$/.test(value));}, defaultMsg: '请输入数字'},
            {name: 'number', validate: function(value) {return (!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value));}, defaultMsg: '请输入数字'},
            //{name: 'mail', validate: function(value) {return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value));}, defaultMsg: '请输入邮箱地址'},
            {name: 'mail', validate: function(value) {return (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value));}, defaultMsg: '请输入邮箱地址'},
            {name: 'char', validate: function(value) {return (!/^[a-z\_\-A-Z]*$/.test(value));}, defaultMsg: '请输入英文字符'},
            {name: 'chinese', validate: function(value) {return (!/^[\u4e00-\u9fff]$/.test(value));}, defaultMsg: '请输入汉字'},
            {name: 'url',validate:function(value){return(!/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value))},defaultMsg:'请输入网址'},
            {name: 'date',validate:function(value){return(/Invalid|NaN/.test(new Date(value).toString()));},defaultMsg:"日期格式XXXX-XX-XX"},
            {name: 'idcode',validate:function(value){return (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value));},defaultMsg:"请输入正确的身份证号码"},
            {name: 'phone',validate:function(value){return (!/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/.test(value));},defaultMsg:"请输入正确的电话号码"}
        ],
        reqmark:true,
        callback:null  //function(obj,params){};           
    };

    var formState = false, 
        fieldState = false, 
        wFocus = false, 
        fform_style=0,    //0=表示基本表单 1=表示内联表单 2=水平排列的表单
        globalOptions = {};

    function isformstyle(form){
        if($(form).hasClass('form-inline')){
            return  1; 
        }
        else if($(form).hasClass('form-horizontal')){
            return  2;
        }
        else{
            return  0;
        };  
    };

    //验证字段
    var validateField = function(field, valid) { 
        var el = $(field), error = false, errorMsg = '';
        var minlength=(el.attr('minlength')?el.attr('minlength'):null);
        var range=(el.attr('range')?el.attr('range'):null); //
        var equalTo = (el.attr('equalTo')?el.attr('equalTo'):null);
        var msg;
        for (i = 0; i < valid.length; i++) {
            var x = true, 
                flag = valid[i];
            msg = (el.attr(flag + '-message')==undefined)?null:el.attr(flag + '-message');
                
            if (flag.substr(0, 1) == '!') {
                x = false;
                flag = flag.substr(1, flag.length - 1);
            }

            var rules = globalOptions.validRules;
            for (j = 0; j < rules.length; j++) {
                var rule = rules[j];
                if (flag == rule.name) {
                    var value;
                    if (el.attr('type')!=null && el.attr('type')=='checkbox'){
                        value = el.is(":checked")?'true':'';
                    }
                    else{
                        value=el.val();
                    };
                    if (rule.validate.call(field, value) == x) {
                        error = true;
                        if (el.attr('type')!=null && el.attr('type').toLowerCase()=='file'){
                            errorMsg = (msg == null)?'请选择文件。':msg;
                        }
                        else{
                            errorMsg = (msg == null)?rule.defaultMsg:msg;
                        }
                        break;
                    }
                }
            }
            if (error) {break;}
        }

        //验证长度
        if ( minlength && !error){
            error = el.val().length < minlength;
            if (error && (msg==null || errorMsg=='')){
                errorMsg = '输入长度大于等于' + minlength;
            }       
        };

        //值区间
        if ($.inArray('number',valid)>=0 && range && !error){
            var values = range.split("~");
            
            if(values.length==2){ 
                error = parseFloat(el.val())<parseFloat(values[0]) || parseFloat(el.val())>parseFloat(values[1]);
                if (error && (msg==null || errorMsg=='')){
                    errorMsg = '输入值在［' + values[0] + '~' + values[1] + ']之间';
                }       
            }
            else{
                var values = range.split(",");
                if (values.length>0){
                    //error =  values.indexOf(el.val())<0;
                    error = $.inArray(el.val(),values)<0;
                    if (error && (msg==null || errorMsg=='')){
                        errorMsg = '输入值为' +range +'的其中一个';
                    }
                }
            }
        };

        //验证输入框值相同
        if(!error && equalTo){
            error = !(el.val() === $('#' + equalTo).val());
            if (error && (msg==null || errorMsg=='')){
                errorMsg = '请保持两次输入一致';
            }
        }

        //外部验证回调方法
        if (!error && globalOptions.callback){
            var params={
                msg:'',
                err:error
            };
            var b = $.ajaxSettings.async;
            $.ajaxSetup({async : false});
            globalOptions.callback(field,params); 
            error = params.err;   
            if (error && (msg==null || errorMsg=='')){
                errorMsg = params.msg;
            }
            else if(params.msg!=''){
                errorMsg = params.msg;
            }
            $.ajaxSetup({async : b});
        };


        var controlGroup = el.parents('.form-group');
        controlGroup.removeClass('has-error has-success');
        controlGroup.addClass(error==false?'has-success':'has-error');
        var form = el.parents("form");
        if(form){
            var fstyle = isformstyle(form);
            if(fstyle == 0){
                controlGroup.find("#valierr").remove();
                el.after('<span class="help-block" id="valierr">' + errorMsg +'</span>');
            }
            else if(fstyle == 1){

            }
            else if (fstyle == 2){
                controlGroup.find("#valierr").remove();
                el.parent().after('<span class="help-block" id="valierr">' + errorMsg +'</span>');
            }
        };//end !form
        return !error;
    };

    //表单验证方法
    var validationForm = function(obj) {
           
        //1.丢失焦点事件
        $(obj).find('input, textarea').each(function(){
            var el = $(this);
            el.on('blur',function(){ // 失去焦点时
               $('.help-block').remove();
               valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
                if (valid){
                    validateField(this, valid);
                }
            });
        });

        //2.如是文件选择则要处理onchange事件
        $(obj).find("input[type='file']").each(function(){
           var el = $(this);
            el.on('change',function(){ //
                valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
                if (valid){
                    validateField(this, valid);
                }
            }); 
        });

        //3.设置必填的标志*号
        if (globalOptions.reqmark==true){
            if(fform_style==0){
                $(obj).find(".form-group>label").each(function(){
                    var el=$(this);
                    var controlGroup = el.parents('.form-group');
                    controlGroup.removeClass('has-error has-success');
                    controlGroup.find("#autoreqmark").remove();
                    el.after('<span id="autoreqmark" style="color:#FF9966"> *</span>')
                });
            }
            else if(fform_style==1){

            }   
            else if(fform_style==2){

                $(obj).find('input, textarea').each(function(){
                    var el = $(this);
                    var controlGroup = el.parents('.form-group');
                    controlGroup.removeClass('has-error has-success');
                    controlGroup.find("#valierr").remove();
                    valid = (el.attr('check-type')==undefined)?null:el.attr('check-type').split(' ');
                    if (valid){
                        if ($.inArray('required',valid)>=0){
                            el.parent().after('<span class="help-block" id="valierr" style="color:#FF9966">*</span>');
                        }
                    };
                }); 
            };
        };//end showrequired

    };
}(window.jQuery);