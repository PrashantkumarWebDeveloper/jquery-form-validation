/*
* Version: 1.0.0
* Author: Prashant Kumar
* Email: prashantsrivastava1994@outlook.com
* Documentation link: 
*/


// initialization function
function validationJs(formSelectorString, options)
{
  var myapp=new validationFunction(formSelectorString, jQuery);
  myapp.settings=jQuery.extend(true, {}, myapp.defaults, options);
  myapp.init();
  return myapp;
}

// below function is used for constructing object
function validationFunction(formSelectorString, $){

              var myapp=this;
              myapp.serverStatus=false; // by default server validation is false
              myapp.clientStatus=false;
              myapp.settings={};

              myapp.defaults={
                              messaging:true,
                              formErrorClass: 'error',
                              preventSubmitOnError: true,
                              dateFormat: 'yyyy/mm/dd',
                              sevarErrorMsg: "Server validation failed!",

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
                                                min_msg: "Value should be greater than: ",
                                                max_msg: "Value should be less than: ",
                                                min_max_msg: "Value should be between: "
                                              },
                                            number: {
                                                num_msg: "This field can contain numbers only!",
                                                min_msg: "Number should be greater than: ",
                                                max_msg: "Number should be less than: ",
                                                min_max_msg: "Number should be between: "
                                              },
                                            decimal: {
                                                dec_msg: "This field can contain decimal only!",
                                                min_msg: "Value should be greater than: ",
                                                max_msg: "Value should be less than: ",
                                                min_max_msg: "Value should be between: "
                                              },

                                            digits: "This field can contain numbers only!",
                                            date: {
                                                date_msg: "This field has Invalid Date Format or Value!",
                                                min_msg: "Date should be less than: ",
                                                max_msg: "Date should be greater than: ",
                                                min_max_msg: "Date should be between: "
                                              },
                                            email: "Invalid Email Id!",
                                            url: "Invalid Url!",
                                            regex: "Field do not match required pattern!",
                                            length: {
                                                        min_msg: "Length  should be greater than: ",
                                                        max_msg: "Length should be less than: ",
                                                        min_max_msg: "Length should be between: "
                                                    },
                                            alphaNumeric: "Only alphanumeric charecters allowed!"
                                        }
                          };
                        myapp.isDate=function(date)
                        { 
                           var valid=(myapp.parseDate(date)=="Invalid Date")?false:true;
                           if(!valid) console.error("Invalid date format!");
                           return valid;
                        }
                        myapp.parseDate=function(date)
                        {
                            format=myapp.settings.dateFormat;
                            format=format.toLowerCase();
                            var formatArray=format.replace(/\//g, ' ').replace(/\-/g, ' ').split(' ');
                            var dateArray=date.replace(/\//g, ' ').replace(/\-/g, ' ').split(' ');
                            //constructing array in year-month-day format
                            var DI, MI, YI;
                        
                            for(var i=0; i<3;i++)
                            {
                              if(formatArray[i].indexOf('d')!==-1) DI=i;
                              else if(formatArray[i].indexOf('m')!==-1) MI=i;
                              else if(formatArray[i].indexOf('y')!==-1) YI=i;
                            }
                            var dateString=dateArray[YI]+" "+dateArray[MI]+" "+dateArray[DI];
                           
                            return new Date(dateString);
                        };
                        
                        myapp.rules = {
                              required:function(selector, className)
                              {
                                      var inputType=selector.attr('type');

                                      if(inputType=="checkbox" || inputType=="radio")
                                      {
                                         var name=selector.attr('name');
                                         if(name)
                                         {
                                           var checkedBoxes= myapp.formRef.find('input[name="'+name+'"]:checked');
                                          
                                           if(checkedBoxes.length>0)
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
                                              if(!$.trim(selector.val()) || selector.val() ==null || selector.val() ==undefined)
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
                              char: function(selector, className)
                              {
                                var val=$.trim(selector.val());
                                var regex=/^[a-zA-Z]+$/;
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
                              alphaNumeric: function(selector, className)
                              {
                                var val=$.trim(selector.val());
                                var regex=/^[a-zA-Z0-9]*$/;
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
                              phone:function(selector, className) 
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
                              email:function(selector, className)
                              {
                                 var regex=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                 var email=$.trim(selector.val());
                                 if(regex.test(email))
                                 {
                                    myapp.hideError(selector);
                                    return true;
                                 }
                                 else{
                                    myapp.showError(selector, 'email');
                                    return false;
                                 }
                              },
                              url:function(selector, className)
                              {
                                 var regex=/(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
                                 var url=$.trim(selector.val());
                                 if(regex.test(url))
                                 {
                                    myapp.hideError(selector);
                                    return true;
                                 }
                                 else{
                                    myapp.showError(selector, 'url');
                                    return false;
                                 }
                              },
                              integer:function(selector, className)
                              {
                                  var regex=/^-?\d+$/;
                                  var num=Number($.trim(selector.val()));
                                  if(regex.test(num))
                                  {
                                      var min=selector.attr('min');
                                      var max=selector.attr('max');
                                      
                                      var min_bool=(typeof min !== typeof undefined && min !== false)?true:false;
                                      var max_bool=(typeof max !== typeof undefined && max !== false)?true:false;

                                      if(min_bool && max_bool)
                                      {
                                          if(num<=max && num>=min) {
                                              myapp.hideError(selector);
                                              return true;
                                            }
                                            else{
                                              myapp.showError(selector, 'integer', 'min_max_msg', (min+" and "+max));
                                              return false;
                                            }
                                      }
                                      else if(min_bool)
                                      {
                                          if(num>=min)
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
                                          if(num<=max)
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
                              number:function(selector, className)
                              {
                                  var regex=/^[0-9]+([.][0-9]+)?$/;  
                                  var num=Number($.trim(selector.val()));
                                  if(regex.test(num))
                                  {
                                      var min=selector.attr('min');
                                      var max=selector.attr('max');
                                      
                                      var min_bool=(typeof min !== typeof undefined && min !== false)?true:false;
                                      var max_bool=(typeof max !== typeof undefined && max !== false)?true:false;

                                      if(min_bool && max_bool)
                                      {
                                          if(num<=max && num>=min) {
                                              myapp.hideError(selector);
                                              return true;
                                            }
                                            else{
                                              myapp.showError(selector, 'number', 'min_max_msg', (min+" and "+max));
                                              return false;
                                            }
                                      }
                                      else if(min_bool)
                                      {
                                          if(num>=min)
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
                                          if(num<=max)
                                          {
                                            myapp.hideError(selector);
                                            return true;
                                          }
                                          else
                                          {
                                             myapp.showError(selector,'number', 'max_msg', max);
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
                                      myapp.showError(selector,'number', 'num_msg');
                                      return false;
                                  }
                              },
                              decimal:function(selector, className)
                              {
                                  var regex=/^[0-9]+([.][0-9]+)$/;    
                                  var num=Number($.trim(selector.val()));
                                  if(regex.test(num))
                                  {
                                      var min=selector.attr('min');
                                      var max=selector.attr('max');
                                      
                                      var min_bool=(typeof min !== typeof undefined && min !== false)?true:false;
                                      var max_bool=(typeof max !== typeof undefined && max !== false)?true:false;

                                      if(min_bool && max_bool)
                                      {
                                          if(num<=max && num>=min) {
                                              myapp.hideError(selector);
                                              return true;
                                            }
                                            else{
                                              myapp.showError(selector, 'decimal', 'min_max_msg', (min+" and "+max));
                                              return false;
                                            }
                                      }
                                      else if(min_bool)
                                      {
                                          if(num>=min)
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
                                          if(num<=max)
                                          {
                                            myapp.hideError(selector);
                                            return true;
                                          }
                                          else
                                          {
                                             myapp.showError(selector,'decimal', 'max_msg', max);
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
                              digits:function(selector, className)
                              {
                                  var regex=/^-?\d+$/;
                                  var num=$.trim(selector.val());
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
                              date:function(selector, className)
                              {
                                  
                                  var date=$.trim(selector.val());
                                  
                                  if(myapp.isDate(date))
                                  {
                                      var date_millisec=myapp.parseDate(date).getTime();

                                      var min=selector.attr('min');
                                      var max=selector.attr('max');
                                      var min_millisec, max_millisec;

                                      var min_bool=(typeof min !== typeof undefined && min !== false && myapp.isDate(min))?true:false;
                                      var max_bool=(typeof max !== typeof undefined && max !== false && myapp.isDate(max))?true:false;

                                      if(min_bool) min_millisec=myapp.parseDate(min).getTime();
                                      if(max_bool) max_millisec=myapp.parseDate(max).getTime();

                                      if(min_bool && max_bool)
                                      {
                                          if(date_millisec<=max_millisec && date_millisec>=min_millisec) {
                                              myapp.hideError(selector);
                                              return true;
                                            }
                                            else{
                                              myapp.showError(selector,'date', 'min_max_msg', (min+" and "+max));
                                              return false;
                                            }
                                      }
                                      else if(min_bool)
                                      {
                                          if(date_millisec>=min_millisec)
                                          {
                                            myapp.hideError(selector);
                                            return true;
                                          }
                                          else
                                          {
                                            myapp.showError(selector,'date', 'min_msg', min);
                                            return false;
                                          }
                                      }
                                      else if(max_bool)
                                      {
                                          if(date_millisec<=max_millisec)
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
                                      myapp.showError(selector,'date', 'date_msg');
                                      return false;
                                  }
                              },
                              regex: function(selector, className)
                              {
                                  var pat=selector.attr('pattern');
                                  var pat_bool=(typeof pat !== typeof undefined && pat !== false)?true:false;
                                  var value=$.trim(selector.val());
                                  if(pat_bool)
                                  {
                                      if(new RegExp('^'+pat+'$').test(value))
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
                                  else {
                                          myapp.showError(selector, 'regex');
                                          console.error('"pattern" attribute not found in input element!');
                                          return false;
                                        }
                              },
                              length:function(selector, className)
                              {
                                 
                                  var str=$.trim(selector.val());
                                  var size=str.length;

                                      var min=selector.attr('min');
                                      var max=selector.attr('max');
                                      
                                      var min_bool=(typeof min !== typeof undefined && min !== false)?true:false;
                                      var max_bool=(typeof max !== typeof undefined && max !== false)?true:false;

                                      if(min_bool && max_bool)
                                      {
                                          if(size<=max && size>=min) {
                                              myapp.hideError(selector);
                                              return true;
                                            }
                                            else{
                                              myapp.showError(selector,'length', 'min_max_msg', (min+" and "+max));
                                              return false;
                                            }
                                      }
                                      else if(min_bool)
                                      {
                                          if(size>=min)
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
                                          if(size<=max)
                                          {
                                            myapp.hideError(selector);
                                            return true;
                                          }
                                          else
                                          {
                                             myapp.showError(selector,'length', 'max_msg', max);
                                             return false;
                                          }
                                      }
                                      else
                                      {
                                            console.error("Please specify min, max property for "+myapp.errorClass.length+" type validation!");
                                            return false;
                                      }
                                  
                              },


                            };

                            myapp.addRule=function(name, errorClass, errorMsg, rule)
                            {
                                var existing=false;
                                if(myapp.rules.hasOwnProperty(name)) 
                                  {
                                    existing=true;
                                    console.error("Rule with this name already available. Try different name for rule!");
                                  }
                                if(!existing)
                                {
                                  myapp.settings.errorClass[name]=errorClass;
                                  myapp.settings.errorMsg[name]=errorMsg;

                                  myapp.rules[name]=function(selector, className)
                                  {
                                       var subtype,status;   
                                       var result = rule(selector, selector.val(), myapp.settings.errorMsg[name]);
                                       if(typeof result=="undefined") console.error('Provide return value in custome rule!');
                                       else if(typeof result=="object")
                                       {
                                          if(result.hasOwnProperty('status'))
                                          {
                                              status=result.status;
                                              subtype=result.type;
                                              if(!status && !result.hasOwnProperty('type'))
                                              {
                                                  console.error('returning object for rule: '+name+', is not in proper format. Example: {status:boolean, type: Type-From-Error-Message-Object}');
                                              }
                                          }
                                          else
                                          {
                                            console.error('returning object for rule: '+name+', is not in proper format. Example: {status:boolean, type: Type-From-Error-Message-Object}. "type" is optional when "status" is true.');
                                          }
                                       }
                                       else if(typeof result=="boolean")
                                       {
                                          status=result;
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
                                  myapp.constructFieldWiseMsgArray(); //updating messages field wise
                                  console.log('Rule with the name "'+name+'" is added!');
                                }

                            };

                            myapp.validateField= function(ref)
                            {
                              var valid=true;
                                $.each(myapp.settings.errorClass, function(key, className){
                                   if($(ref).hasClass(myapp.settings.errorClass[key]))
                                   {
                                      if(valid && !(!$(ref).hasClass(myapp.settings.errorClass.required) && $.trim($(ref).val())=="")) 
                                      {
                                        if(!myapp.rules[key]($(ref), myapp.settings.errorClass[key])) valid=false;
                                      }
                                   }
                                });
                                myapp.clientStatus=true;

                                $.each(myapp.cstmInputObjArray, function(index, obj){
                                  if(myapp.clientStatus && !obj.clientStatus)  myapp.clientStatus=false;
                                });
                              return valid;
                            };

                            myapp.validateForm= function()
                            {
                              var inputs=myapp.formRef.find('input, textarea, select');
                              var valid=true;
                              $.each(inputs, function(index, elem){
                                  if(!myapp.validateField(elem)) valid=false;     
                              });
                              myapp.clientStatus=valid;
                              return myapp.clientStatus;
                            };

                            myapp.resetForm=function()
                            {
                                myapp.formRef.find('.'+myapp.settings.formErrorClass).text('').hide();
                                myapp.clientStatus=false;
                                myapp.serverStatus=false;
                                myapp.constructFieldWiseMsgArray();

                            }

                          
                            myapp.searchErrorElem= function(ref)
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
                            };

                            /*messaging function*/
                            myapp.cstmSelectorMsgArray=[]; //{selector: '#selector', msg: msgObj}
                            myapp.cstmInputObjArray=[]; //[{inputRef:ref, msg:msg, errorRef:errorRef}]
                            myapp.addErrorMsg=function(arrayOfObj)
                            {
                                //structure of object in array: {selector: '#selector', msg: msgObj}
                                if(Object.prototype.toString.call( arrayOfObj ) === '[object Array]')
                                {
                                    for(var x in arrayOfObj)
                                    {
                                       myapp.cstmSelectorMsgArray.push($.extend(true,{},arrayOfObj[x]));
                                    }
                                }
                                else
                                {
                                   myapp.cstmSelectorMsgArray.push($.extend(true,{},arrayOfObj));
                                }
                                //constructing field wise message each time new messages are added
                                myapp.constructFieldWiseMsgArray(); 
                            };
                           
                            myapp.constructFieldWiseMsgArray=function()
                            {
                                myapp.cstmInputObjArray=[];

                                var inputs=myapp.formRef.find('input, textarea, select');
                               
                                inputs.each(function(i, elm){
                                    var element=$(elm);
                                    var msgObj={};
                                    $.each(myapp.cstmSelectorMsgArray,function(index, obj){
                                        if(element.is(obj.selector)){
                                            $.extend(true, msgObj, obj.msg);
                                        }
                                    });
                                    
                                    myapp.cstmInputObjArray.push({inputRef:element, errorRef: myapp.searchErrorElem(element), msg: msgObj, clientStatus: !element.hasClass(myapp.settings.errorClass.required)});
                                   
                                });

                            };
                            myapp.findCstmInputObj=function(obj)
                            {
                              var result=myapp.cstmInputObjArray.find(function(item){
                                 return obj.is(item.inputRef);
                              });
                              return result;
                            };
                            myapp.msgGenerator=function(cstmInputObj, type, subtype, value)
                            {
                               var cstmMsg=cstmInputObj['msg'];

                               var msg=cstmMsg[type] || myapp.settings.errorMsg[type];
                               var msgString;
                               if(typeof msg==undefined) {console.error('Please define '+type+' error message for: ',ref);}
                               
                               else if(typeof msg== "string") {msgString=msg;}
                               
                               else if(typeof msg== "object") {msgString=msg[subtype] || myapp.settings.errorMsg[type][subtype];}
                               
                               else {console.error("Error message should be in String or Object format");}
                          
                               if(!cstmMsg[type] || (cstmMsg[type] && !cstmMsg[type][subtype]))
                               {
                                  if(value !==undefined) msgString+=value;
                               }
                               return msgString;
                            };
                            myapp.showError=function(ref, type, subtype, value)
                            {
                              var cstmInputObj=myapp.findCstmInputObj(ref);
                              cstmInputObj.clientStatus=false;// setting status of input

                              var inputType=ref.attr('type');
                              if(inputType=="checkbox" || inputType=="radio")
                              {
                                 var name=ref.attr('name');
                                 var checkedBoxes= myapp.formRef.find('input[name="'+name+'"]');
                                 checkedBoxes.each(function(i,el){
                                    myapp.findCstmInputObj($(el)).clientStatus=false;
                                 });

                              }

                                if(myapp.settings.messaging)
                                {
                                  var errorMsg=myapp.msgGenerator(cstmInputObj, type, subtype, value);
                                  if(cstmInputObj['errorRef'])
                                  {
                                     cstmInputObj['errorRef'].text(errorMsg);
                                     cstmInputObj['errorRef'].show();
                                  }
                                }
                            };
                            myapp.hideError=function(ref)
                            {
                              var cstmInputObj=myapp.findCstmInputObj(ref);
                              cstmInputObj.clientStatus=true; // setting status of input

                              var inputType=ref.attr('type');
                              if(inputType=="checkbox" || inputType=="radio")
                              {
                                 var name=ref.attr('name');
                                 var checkedBoxes= myapp.formRef.find('input[name="'+name+'"]');
                                 checkedBoxes.each(function(i,el){
                                    myapp.findCstmInputObj($(el)).clientStatus=true;
                                 });

                              }

                               if(myapp.settings.messaging)
                               {
                                  cstmInputObj['errorRef'].text('');
                                  cstmInputObj['errorRef'].hide();
                               }
                            };

                            myapp.refresh=function(initialize)
                            {
                                myapp.formRef=$(formSelectorString);
                                myapp.constructFieldWiseMsgArray();
                                if(initialize) 
                                  console.info("ValidationJs Initialized");
                                else
                                  console.info("ValidationJs refreshed");
                            }

                            // initialization
                            myapp.init=function()
                            {
                               myapp.refresh(true);
                               
                            }

                          // for server side
                            myapp.getServerStatus=function(){
                               return myapp.serverStatus;
                            };
                            myapp.setServerStatus=function(status)
                            {
                                myapp.serverStatus=status;
                            };
                            myapp.showServerError=function(ref, status, msg){
                                msg= msg || myapp.settings.sevarErrorMsg;
                                myapp.showError($(ref), status, msg);
                            };

                            
}
