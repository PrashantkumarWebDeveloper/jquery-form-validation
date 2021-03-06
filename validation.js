/*
* Version: 1.0.0
* Author: Prashant Kumar
* Email: prashantsrivastava1994@outlook.com
* Documentation link: https://github.com/PrashantkumarWebDeveloper/jquery-form-validation/blob/master/README.md
* Description: This plugin provides client side validation for webpages.
*/


/*start of Pollyfill for find method*/

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

/* end of Pollyfill for find method*/

// initialization function
function validationJs(formSelectorString, options)
{
    if(formSelectorString)
    {
        var myapp = new validationFunction(formSelectorString, jQuery);
        myapp.settings = jQuery.extend(true, {}, myapp.defaults, options);
        myapp.init();
        return myapp;
    }
    else
    {
        console.error('Form selector is not provided! Please add selector string for form.');
    }
}

// below function is used for constructing object
function validationFunction(formSelectorString, $)
{

/***************** start of --- Global variables used by the plugin *****************/
    var myapp = this;
    myapp.serverStatus = false; // by default server validation is false
    myapp.clientStatus = false; //stores the form status of the client
    myapp.settings = {};

    //{selector: '#selector', msg: msgObj}, this is used to create msg object for a particular field
    myapp.cstmSelectorMsgArray = [];

    //[{inputRef:ref, msg:msg, errorRef:errorRef}], this will be used to store the field related information
    myapp.cstmInputObjArray = []; 

    myapp.refreshTime = false;
/***************** end of --- Global variables used by the plugin *****************/



/***************** start of --- Plugin options(can be overridden at the time of initialization) *****************/
    myapp.defaults = {
        messaging:true,
        formErrorClass: 'error',
        preventSubmitOnError: true,
        dateFormat: 'yyyy/mm/dd',
        sevarErrorMsg: "Server validation failed!",
        getErrorElement:undefined,
        fieldSuccessCallback: undefined, //callback will get refrence of field as first parameter
        fieldErrorCallback: undefined,  //callback will get refrence of field as first parameter and error type as second parameter
        formSuccessCallback: undefined, //callback will get refrence of form as first parameter
        formErrorCallback: undefined,  //callback will get refrence of form as first parameter
        noValidateClass: 'novalidate',
        errorClass: {
            required: "isRequired", 
            phone:  "isPhone",
            integer: "isInteger",
            number: "isNumber",
            decimal: "isDecimal",
            digits: "isDigits",
            email:  "isEmail",
            url: "isUrl",
            date: "isDate", 
            regex:  "isRegex",
            char:  "isChar", 
            length: "isLength",
            alphaNumeric: "isAlphaNumeric"   
          },
        errorMsg: {
            required: "This is required field!",
            char: "This field can contain characters only!",
            phone: "Phone Number should be a Number of 10 digits!",
            integer: {
                int_msg: "This field can contain integer only!",
                min_msg: "Minimum value for this field is: ",
                max_msg: "Maximum value for this field is: ",
                min_max_msg: "Minimum and Maximum values for this field are: "
              },
            number: {
                num_msg: "This field can contain numbers only!",
                min_msg: "Minimum value for this field is: ",
                max_msg: "Maximum value for this field is: ",
                min_max_msg: "Minimum and Maximum values for this field are: "
              },
            decimal: {
                dec_msg: "This field can contain decimal only!",
                min_msg: "Minimum value for this field is: ",
                max_msg: "Maximum value for this field is: ",
                min_max_msg: "Minimum and Maximum values for this field are: "
              },

            digits: "This field can contain numbers only!",
            date: {
                date_msg: "This field has Invalid Date Format or Value!",
                min_msg: "Minimum date value for this field is: ",
                max_msg: "Maximum date value for this field is: ",
                min_max_msg: "Minimum and Maximum date values for this field are: "
              },
            email: "Invalid Email Id!",
            url: "Invalid Url!",
            regex: "Field do not match required pattern!",
            length: {
                min_msg: "Minimum length for this field is: ",
                max_msg: "Maximum length for this field is: ",
                min_max_msg: "Minimum and Maximum length for this field are: "
              },
            alphaNumeric: "Only alphanumeric charecters allowed!"
        }
    };
/***************** end of --- Plugin options*****************/



/***************** start of --- methods used by date validation *****************/

    myapp.isDate = function(date)
    { 
       var valid = (myapp.parseDate(date) == "Invalid Date") ? false : true;
       if(!valid) console.error("Invalid date format!");
       return valid;
    }
    myapp.parseDate=function(date)
    {
        format = myapp.settings.dateFormat;
        format = format.toLowerCase();
        var formatArray = format.replace(/\//g, ' ').replace(/\-/g, ' ').split(' ');
        var dateArray = date.replace(/\//g, ' ').replace(/\-/g, ' ').split(' ');
        //constructing array in year-month-day format
        var DI, MI, YI;
    
        for(var i = 0; i < 3; i ++)
        {
          if(formatArray[i].indexOf('d') !== -1) DI = i;
          else if(formatArray[i].indexOf('m') !== -1) MI = i;
          else if(formatArray[i].indexOf('y') !== -1) YI = i;
        }
        var dateString = dateArray[YI] + " " + dateArray[MI] + " " + dateArray[DI];
       
        return new Date(dateString);
    };

/***************** end of --- methods used by date validation *****************/



/***************** start of --- validation rules *****************/                       
    myapp.rules = {
        required: function(selector)
        {
            var inputType = selector.attr('type');

            if(inputType == "checkbox" || inputType == "radio")
            {
                var name = selector.attr('name');

                if(name)
                {
                    var checkedBoxes = myapp.formRef.find('input[name="' + name + '"]:checked');

                    if(checkedBoxes.length > 0)
                    {

                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'required');
                        return false;  
                    }
                }
                else
                {
                    console.error('Please specify the "name" attribute for checkbox!');
                    return false;
                }
            }
            else
            {
                if(!$.trim(selector.val()) || selector.val() == null || selector.val() == undefined)
                {
                    myapp.showError(selector, 'required');
                    return false;  
                }
                else
                {
                    myapp.hideError(selector);
                    return true;
                }
            }   
        },
        char: function(selector)
        {
            var val = $.trim(selector.val());
            var regex = /^[a-zA-Z]+$/;

            if(regex.test(val))
            {
                myapp.hideError(selector);
                return true;
            }
            else
            {
                myapp.showError(selector, 'char');
                return false;
            }
        },
        alphaNumeric: function(selector)
        {
            var val = $.trim(selector.val());
            var regex = /^[a-zA-Z0-9]*$/;

            if(regex.test(val))
            {
                myapp.hideError(selector);
                return true;
            }
            else
            {
                myapp.showError(selector, 'alphaNumeric');
                return false;
            }
        },
        phone:function(selector) 
        {
            var regex = new RegExp("^[0-9]{10}$");
            var num = $.trim(selector.val());

            if(regex.test(num))
            {
                myapp.hideError(selector);
                return true;
            }
            else {
                myapp.showError(selector, 'phone');
                return false;
            }
        },
        email: function(selector)
        {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var email = $.trim(selector.val());

            if(regex.test(email))
            {
                myapp.hideError(selector);
                return true;
            }
            else
            {
                myapp.showError(selector, 'email');
                return false;
            }
        },
        url: function(selector)
        {
            var regex = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
            var url = $.trim(selector.val());

            if(regex.test(url))
            {
                myapp.hideError(selector);
                return true;
            }
            else
            {
                myapp.showError(selector, 'url');
                return false;
            }
        },
        integer:function(selector)
        {
            var regex = /^-?\d+$/;
            var num = $.trim(selector.val());

            if(regex.test(num))
            {
                num = Number(num);
                var min = selector.attr('min');
                var max = selector.attr('max');
                
                var min_bool = (typeof min !== typeof undefined && min !== false) ? true : false;
                var max_bool = (typeof max !== typeof undefined && max !== false) ? true : false;

                if(min_bool && max_bool)
                {
                    if(num <= max && num >= min) 
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else{
                        myapp.showError(selector, 'integer', 'min_max_msg', (min + " and " + max));
                        return false;
                    }
                }
                else if(min_bool)
                {
                    if(num >= min)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'integer', 'min_msg', min);
                        return false;
                    }
                }
                else if(max_bool)
                {
                    if(num <= max)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector,'integer', 'max_msg', max);
                        return false;
                    }
                }
                else
                {
                    myapp.hideError(selector);
                    return true;
                }
            }
            else
            {
                myapp.showError(selector,'integer', 'int_msg');
                return false;
            }
        },
        number: function(selector)
        {
            var regex = /^[0-9]+([.][0-9]+)?$/;  
            var num = $.trim(selector.val());

            if(regex.test(num))
            {
                num = Number(num);
                var min = selector.attr('min');
                var max = selector.attr('max');
                
                var min_bool = (typeof min !== typeof undefined && min !== false) ? true : false;
                var max_bool = (typeof max !== typeof undefined && max !== false) ? true : false;

                if(min_bool && max_bool)
                {
                    if(num <= max && num >= min) 
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'number', 'min_max_msg', (min + " and " + max));
                        return false;
                    }
                }
                else if(min_bool)
                {
                    if(num >= min)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'number', 'min_msg', min);
                        return false;
                    }
                }
                else if(max_bool)
                {
                    if(num <= max)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'number', 'max_msg', max);
                        return false;
                    }
                }
                else
                {
                       myapp.hideError(selector);
                       return true;
                }
            }
            else
            {
                myapp.showError(selector, 'number', 'num_msg');
                return false;
            }
        },
        decimal:function(selector)
        {
            var regex = /^[0-9]+([.][0-9]+)$/;    
            var num = $.trim(selector.val());
            if(regex.test(num))
            {
               num = Number(num);
                var min = selector.attr('min');
                var max = selector.attr('max');
                
                var min_bool = (typeof min !== typeof undefined && min !== false) ? true : false;
                var max_bool = (typeof max !== typeof undefined && max !== false) ? true : false;

                if(min_bool && max_bool)
                {
                    if(num <= max && num >= min) 
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else{
                        myapp.showError(selector, 'decimal', 'min_max_msg', (min + " and " + max));
                        return false;
                    }
                }
                else if(min_bool)
                {
                    if(num >= min)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'decimal', 'min_msg', min);
                        return false;
                    }
                }
                else if(max_bool)
                {
                    if(num <= max)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'decimal', 'max_msg', max);
                        return false;
                    }
                }
                else
                {
                    myapp.hideError(selector);
                    return true;
                }
            }
            else
            {
                myapp.showError(selector,'decimal', 'dec_msg');
                return false;
            }
        },
        digits:function(selector)
        {
            var regex = /^-?\d+$/;
            var num = $.trim(selector.val());
            if(regex.test(num))
            {
                myapp.hideError(selector);
                return true;
            }
            else
            {
                myapp.showError(selector, 'digits');
                return false;
            }
        },
        date: function(selector)
        {
            var date = $.trim(selector.val());
            
            if(myapp.isDate(date))
            {
                var date_millisec = myapp.parseDate(date).getTime();

                var min = selector.attr('min');
                var max = selector.attr('max');
                var min_millisec, max_millisec;

                var min_bool = (typeof min !== typeof undefined && min !== false && myapp.isDate(min)) ? true : false;
                var max_bool = (typeof max !== typeof undefined && max !== false && myapp.isDate(max))? true : false;

                if(min_bool) min_millisec = myapp.parseDate(min).getTime();
                if(max_bool) max_millisec = myapp.parseDate(max).getTime();

                if(min_bool && max_bool)
                {
                    if(date_millisec <= max_millisec && date_millisec >= min_millisec) 
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector,'date', 'min_max_msg', (min + " and " + max));
                        return false;
                    }
                }
                else if(min_bool)
                {
                    if(date_millisec >= min_millisec)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'date', 'min_msg', min);
                        return false;
                    }
                }
                else if(max_bool)
                {
                    if(date_millisec <= max_millisec)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, 'date', 'max_msg', max);
                        return false;
                    }
                }
                else
                {
                    myapp.hideError(selector);
                    return true;
                }
            }
            else
            {
                myapp.showError(selector, 'date', 'date_msg');
                return false;
            }
        },
        regex: function(selector)
        {
            var pat = selector.attr('pattern');
            var pat_bool = (typeof pat !== typeof undefined && pat !== false) ? true : false;
            var value=$.trim(selector.val());
            if(pat_bool)
            {
                if(new RegExp('^' + pat + '$').test(value))
                {
                    myapp.hideError(selector);
                    return true;
                }
                else
                {
                    myapp.showError(selector, 'regex');
                    return false;
                }                                      
            }
            else 
            {
                myapp.showError(selector, 'regex');
                console.error('"pattern" attribute not found in input element!');
                return false;
            }
        },
        length: function(selector)
        {
            var str = $.trim(selector.val());
            var size = str.length;

            var min = selector.attr('min');
            var max = selector.attr('max');
            
            var min_bool = (typeof min !== typeof undefined && min !== false) ? true : false;
            var max_bool=(typeof max !== typeof undefined && max !== false) ? true : false;

            if(min_bool && max_bool)
            {
                if(size <= max && size >= min) 
                {
                    myapp.hideError(selector);
                    return true;
                }
                else{
                    myapp.showError(selector,'length', 'min_max_msg', (min + " and " + max));
                    return false;
                }
            }
            else if(min_bool)
            {
                if(size >= min)
                {
                    myapp.hideError(selector);
                    return true;
                }
                else
                {
                    myapp.showError(selector, 'length', 'min_msg', min);
                    return false;
                }
            }
            else if(max_bool)
            {
                if(size <= max)
                {
                    myapp.hideError(selector);
                    return true;
                }
                else
                {
                    myapp.showError(selector, 'length', 'max_msg', max);
                    return false;
                }
            }
            else
            {
                console.error("Please specify min, max property for " + myapp.errorClass.length + " type validation!");
                return false;
            }
            
        }
    };

/***************** end of --- validation rules *****************/ 



/***************** start of --- methods used by plugin itself *****************/

    myapp.searchErrorElem = function(ref)
    {
        if(myapp.settings.getErrorElement)
        {
            var elm = myapp.settings.getErrorElement(ref);

            if(elm)
                return myapp.settings.getErrorElement(ref);
            else
            {
                console.error("Method getErrorElement() should return reference of error element!");
                return undefined;
            }
        }
        else
        {
            if(ref.is(myapp.formRef)) return undefined;
            else
            {
                if(ref.next().hasClass(myapp.settings.formErrorClass))  return ref.next();
                else
                {
                    return myapp.searchErrorElem($(ref).parent());
                }
            }
        }
    };
    
    // initialization
    myapp.init = function()
    {
        myapp.refresh('init');
    };

    myapp.constructInputObjectArray = function()
    {
        myapp.cstmInputObjArray = [];
        var inputs = myapp.formRef.find('input:not(input[type="button"], input[type="submit"], input[type="reset"], input[type="hidden"]), textarea, select');
       
        inputs.each(function(i, elm){ 
            var element = $(elm);
            var msgObj = {};

            $.each(myapp.cstmSelectorMsgArray,function(index, obj){
                if(element.is(obj.selector)){
                    $.extend(true, msgObj, obj.msg);
                }
            });

            myapp.cstmInputObjArray.push({inputRef: element, errorRef: myapp.searchErrorElem(element), msg: msgObj, clientStatus: false});
        });
    };

    myapp.findCstmInputObj = function(obj)
    {
        var result = myapp.cstmInputObjArray.find(function(item){
            return obj.is(item.inputRef);
        });
        return result;
    };

    myapp.msgGenerator = function(cstmInputObj, type, subtype, value)
    {
        var cstmMsg = cstmInputObj['msg'];

        var msg = cstmMsg[type] || myapp.settings.errorMsg[type];
        var msgString;
        if(typeof msg == undefined) {console.error('Please define ' + type + ' error message for: ', ref);}

        else if(typeof msg == "string") {msgString = msg;}

        else if(typeof msg == "object") {msgString = msg[subtype] || myapp.settings.errorMsg[type][subtype];}

        else {console.error("Error message should be in String or Object format");}

        if(!cstmMsg[type] || (cstmMsg[type] && !cstmMsg[type][subtype]))
        {
            if(value !== undefined) msgString += value;
        }
        return msgString;
    };
    myapp.showError = function(ref, type, subtype, value)
    {
        var cstmInputObj = myapp.findCstmInputObj(ref);
        cstmInputObj.clientStatus = false;// setting status of input
    
        //never show messages while refreshing app, only set client status
        if(!myapp.refreshTime)
        {
            var inputType = ref.attr('type');

            if(inputType == "checkbox" || inputType == "radio")
            {
               var name = ref.attr('name');
               var checkedBoxes = myapp.formRef.find('input[name="' + name + '"]');

               checkedBoxes.each(function(i,el){
                  myapp.findCstmInputObj($(el)).clientStatus = false;
               });
            }

            if(myapp.settings.messaging)
            {
                var errorMsg = myapp.msgGenerator(cstmInputObj, type, subtype, value);
                if(cstmInputObj['errorRef'])
                {
                    cstmInputObj['errorRef'].text(errorMsg);
                    //cstmInputObj['errorRef'].show();
                }
                else
                {
                    console.error('Error element not found! Add element with class: ' + myapp.settings.formErrorClass + ' after Input field, eg. <span class="' + myapp.settings.formErrorClass + '"></span>');
                }
            }
        }
    };
    myapp.hideError = function(ref)
    {
        var cstmInputObj = myapp.findCstmInputObj(ref);
        cstmInputObj.clientStatus = true; // setting status of input
        
        //never hide messages while refreshing app, only set client status
        if(!myapp.refreshTime)
        {
            var inputType = ref.attr('type');
            if(inputType == "checkbox" || inputType == "radio")
            {
                var name = ref.attr('name');
                var checkedBoxes = myapp.formRef.find('input[name="' + name + '"]');

                checkedBoxes.each(function(i,el){
                    myapp.findCstmInputObj($(el)).clientStatus = true;
                });
            }

            if(myapp.settings.messaging)
            {
                if(cstmInputObj['errorRef'])
                {
                    cstmInputObj['errorRef'].text('');
                    //cstmInputObj['errorRef'].hide();
                }
                else
                {
                    console.error('Error element not found! Add element with class: ' + myapp.settings.formErrorClass + ' after Input field, eg. <span class="' + myapp.settings.formErrorClass + '"></span>');
                }
              
            }
        }
    };
    myapp.getOrderedClass = function(ref)
    {
        var classString = ref.attr('class');

        if(classString)
        {
            var origClassArray = classString.split(" "); //stores all classes of element

            var classArray = []; // stores only error classes but indexes(of error classes) are discontinuous. Ex: ['isRequired', undefined, undefined, 'isChar']
            var filteredClassArray = []; // stores only error classes with continuous indexes(of error classes). Ex: ['isRequired','isChar']

            $.each(myapp.settings.errorClass, function(key, value){
                if(origClassArray.find(function(elem){ return value === elem.trim(); }))
                {
                    //required error class is not stored in Array, because required should be the first checkalways
                    if(!(value == myapp.settings.errorClass.required)){
                        var index = classString.indexOf(value); // index will be the first charecter index of error class, in class string
                        classArray[index] = key;
                    }
                }          
            });

            //now constructing continuous index(of error classes) array
            for(var x in classArray)
            {
                //filtering indexes which have undefined value
                if(classArray[x]) filteredClassArray.push(classArray[x]);
            }

            //console.log(filteredClassArray);
            return filteredClassArray;
        }
        else
        {
            return undefined;
        }
    };

/***************** end of --- methods used by plugin itself *****************/ 



/***************** start of ---- Methods available for developer, public methods *****************/

    // for server side
    myapp.getServerStatus = function(){
        return myapp.serverStatus;
    };

    myapp.setServerStatus =  function(status)
    {
        myapp.serverStatus = status;
    };

    myapp.showServerError = function(ref, status, msg)
    {
        msg = msg || myapp.settings.sevarErrorMsg;
        myapp.showError($(ref), status, msg);
    };      

    myapp.getClientStatus = function()
    {
        return myapp.clientStatus;
    }

    myapp.getFieldClientStatus = function(ref)
    {
        if(ref)
            return myapp.findCstmInputObj($(ref)).clientStatus;
        else
          console.error('getFieldClientStatus() requires reference of field');
    }

    myapp.addRule = function(name, errorClass, errorMsg, rule)
    {   
        if(arguments.length != 4) console.error("Missing argument! Method addRule() requires 4 arguments: 1. Rule Name, 2. Error Class, 3. Error Message, 4. Callback function");
        else
        {
            var existing = false;
            if(myapp.rules.hasOwnProperty(name)) 
            {
                existing = true;
                console.error("Rule with this name already available. Try different name for rule!");
            }
            if(!existing)
            {
                myapp.settings.errorClass[name] = errorClass;
                myapp.settings.errorMsg[name] = errorMsg;

                myapp.rules[name] = function(selector)
                {
                    var subtype,status;   
                    var result = rule(selector, selector.val(), myapp.settings.errorMsg[name]);
                    if(typeof result == "undefined") console.error('Provide return value in custome rule!');
                    else if(typeof result == "object")
                    {
                        if(result.hasOwnProperty('status'))
                        {
                            status = result.status;
                            subtype = result.type;
                            if(!status && !result.hasOwnProperty('type'))
                            {
                                console.error('returning object for rule: ' + name + ', is not in proper format. Example: {status:boolean, type: Type-From-Error-Message-Object}');
                            }
                        }
                        else
                        {
                            console.error('returning object for rule: '+name+', is not in proper format. Example: {status:boolean, type: Type-From-Error-Message-Object}. "type" is optional when "status" is true.');
                        }
                    }
                    else if(typeof result == "boolean")
                    {
                        status = result;
                    }
                    else
                    {
                        console.error("return type of your custome rule: "+name+", should be either boolean or an object ");
                    }
                    
                    if(status)
                    {
                        myapp.hideError(selector);
                        return true;
                    }
                    else
                    {
                        myapp.showError(selector, name, subtype);
                    }
                }
                myapp.refresh('internal'); //updating messages field wise
                console.info('Rule with the name "' + name + '" is added!');
            }
        }
    };

    myapp.addErrorMsg = function(arrayOfObj)
    {
        //structure of object in array: {selector: '#selector', msg: msgObj}
        if(Object.prototype.toString.call( arrayOfObj ) === '[object Array]')
        {
            for(var x in arrayOfObj)
            {
                myapp.cstmSelectorMsgArray.push($.extend(true, {}, arrayOfObj[x]));
            }
        }
        else
        {
            myapp.cstmSelectorMsgArray.push($.extend(true, {}, arrayOfObj));
        }

        //constructing field wise message each time new messages are added
        myapp.refresh('internal'); 
    }; 

    myapp.refresh = function(type)
    {
        myapp.formRef = $(formSelectorString);

        if(myapp.formRef)
        {
            myapp.refreshTime = true; //start of refresh time, no hide/show of error now

            myapp.constructInputObjectArray();
            myapp.validateForm();

            myapp.refreshTime = false; //end of refresh time, hide/show of error enabled

            if(type === 'init')   console.info("ValidationJs Initialized");
            else if(type === 'internal')  {}
            else    console.info("ValidationJs Refreshed!"); 
        }
        else
        {
            console.error('Form with selector: "' + formSelectorString + '" not found!');
        } 
    }; 
    myapp.validateField = function(ref)
    {
        ref = $(ref);
        var classArray = myapp.getOrderedClass(ref);
        var valid = true;
        var errType;

        if(!ref.hasClass(myapp.settings.noValidateClass))
        {

            if(!(classArray.length === 0) || ref.hasClass(myapp.settings.errorClass.required))
            {
                //when input doesn't have isRequired class and have empty value, 
                //then no need to check for validation
                if(!ref.hasClass(myapp.settings.errorClass.required) && $.trim(ref.val()) == "")
                {
                    //when isRequired class is not available and someone enters
                    //invalid input than empty that field. In this case error can not be hidden
                    //because it doesn't go through any conditonal test
                    myapp.hideError(ref);
                }
                else
                {
                    if(ref.hasClass(myapp.settings.errorClass.required))
                    {
                        if(!myapp.rules.required(ref)) 
                        {
                            valid = false;
                            errType = 'required';
                        }
                    }

                    $.each(classArray, function(index, value){
                       if(valid)
                          if(!myapp.rules[value](ref)) 
                          {
                            valid = false;
                            errType = value;
                          }
                    });
                }

                //do not call callbacks at tim of refreshing status
                if(!myapp.refreshTime)
                {
                    //callback wiil be called for those inputs which have error-classes
                    if(valid && myapp.settings.fieldSuccessCallback) myapp.settings.fieldSuccessCallback(ref);
                    if(!valid  && myapp.settings.fieldErrorCallback) myapp.settings.fieldErrorCallback(ref, errType);
                }
            }
            else
            {
                myapp.findCstmInputObj(ref).clientStatus = true;
            }
         
        }
        else
        {
            myapp.hideError(ref);
        }

        myapp.clientStatus = true;
        $.each(myapp.cstmInputObjArray, function(index, obj){
            if(myapp.clientStatus && !obj.clientStatus)  myapp.clientStatus = false;
        });

        return valid; 
    };

    myapp.validateForm = function()
    {
        var inputs = myapp.formRef.find('input:not(input[type="button"], input[type="submit"], input[type="reset"], input[type="hidden"]), textarea, select');
        var valid = true;
        $.each(inputs, function(index, elem){
            if(!myapp.validateField(elem)) valid = false;     
        });
        myapp.clientStatus = valid;
        if(valid && myapp.settings.formSuccessCallback) myapp.settings.formSuccessCallback(myapp.formRef);
        if(!valid  && myapp.settings.formErrorCallback) myapp.settings.formErrorCallback(myapp.formRef);
       
        return myapp.clientStatus;
    };  

    myapp.resetForm = function()
    {
        myapp.refresh('internal'); //refreshing bindings and field status
        //hiding errors
        if(myapp.settings.messaging)
        {
            $.each(myapp.cstmInputObjArray, function(i, obj){
                if(obj.errorRef)   obj.errorRef.text('');//.hide();
            }); 
        }

        myapp.serverStatus = false;
    }  
/***************** end of ---- Methods available for developer, public methods *****************/                
}
