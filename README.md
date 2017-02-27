# JQUERY FORM VALIDATION PLUGIN
This plugin is based on jQuery library and helps in validating html forms. Plugin provides default error messages which can be customised.

[Getting started/Quick start guide](#getting-startedquick-start-guide)

[Documentation](#documentation)

- [Understanding error classes](#understanding-error-classes)

- [Plugin Options and Overriding defualt error messages](#plugin-options-and-overriding-defualt-error-messages)

- [Refreshing data and bindings](#refreshing-data-and-bindings)

- [Adding custom error messages](#adding-custom-error-messages)

- [Adding custome rules to plugin](#adding-custome-rules-to-plugin)


[Exapmles](#)


## Getting Started/Quick Start Guide:

Take a look to the following code first:

```html
<!DOCTYPE html>
<html>
  <head>
      <title>Jquery validation plugin</title>
    </head>
  <body>
      <form id=”myForm” onsubmit=”return app.validateForm()” novalidate=”true” >
          <div>
              <input name=”first_name” class=”isRequired isChar” onblur="app.validateField(this);">
              <span class=”error”></span>
          </div>
          <div>
              <input name=”last_name” class=”isRequired isChar” onblur="app.validateField(this);">
              <span class=”error”></span>
          </div>
          <button type=”reset” onclick=” app.resetForm()”>Reset</button>
          <button type=”submit”>Submit</button>
       </form>
    <body>

</html>
 
 <!--Add source files-->
 <script src=”path/to/jquery.min.js”></script>
 <script src=”path/to/validation.js”></script>
 <script>
  var app= validationJs(“#myForm”);
 </script>
 ```
 
### Step wise guide:

***Step 1 (Including Library):***

This plugin is based on jQuery library, so make sure you have included (linked) jQuery library in your webpage. Now include validation.js in your webpage after jQuery link as shown below.

```
<script src="path/to/jquery.min.js" type="text/javascript" ></script>
<script src="path/to/validation.js" type="text/javascript" ></script>
```

***Step 2 (Plugin Initialization):***

After adding library path properly you need to initialize this plugin. For this you will use following code:
```javascript
var app=validationJs(formSelector);
```

Here “formSelector” is the css selector for your form. You can use ID, Class or anything according to your convenience.

For example:


```html
<!--If you have created form with id “myForm”:-->
<form id=”myForm”>
…
…
</form> 

  
<!--You need to initialize plugin by using following line of code-->

<script type="text/javascript">
    var app=validationJs('#myform');
</script>
```

***Step 3 (Adding “novalidate”):***

Add novalidate=”true” (or novalidate) in form tag, so that it will not use inbuilt HTML5 Validation.
```
  <form id=”myForm” novalidate=”true”>
    …
    …
  </form> 
```

***Step 4 (Adding element with “error” class):***

Add an element next to Input element (or next to input's parent and so on), with error class to show error messages.
Example:
```
<div>
  <input type=”text”/>
  <!--error element-->
  <span class=”error”></span>
</div>
```
You can add error element as next element to input or parent of input. Additionally use error class to style your error message’s color/font etc.

***Step 5 (Adding classes for validation):***

Depending upon the requirements, add validation classes in your input element. Following validation classes are available:

- __isRequired__ (Required field)
- __isPhone__ (Indian standered mobile no.)
- __isInteger__ (Integer, ex: 12, 25)
- __isNumber__ (Number, ex: 10, 11.5)
- __isDecimal__ (Decimal, ex: 11.5, 12.30)
- __isDigits__ (Digits, use where length(no of digits) of integer matters)
- __isEmail__ (Email)
- __isUrl__ (URL)
- __isDate__ (Defualt format yyyy/mm/dd)
- __isRegex__ (regular expression. pattern attribute is required)
- __isChar__ (charecters. A-Z and a-z)
- __isLength__ (Length of input. Either min or max or both(min and max) atribute(s) should present)
- __isAlphaNumeric__ (alphanumeric charecters. a-z, A-Z and 0-9)


###### Note: Never use "isLength" in combination with "isInteger", "isNumber", and "isDecimal".


Above classes can be used in combination or alone. We will learn about these classes in detail later.


Example:
```html
<input class=”isRequired isPhone”>
```


***Step 6 (Validating field):***

Bind the validation method to input field with events. You need to pass the reference of input field.
Example:
```html
<input class=”isRequired isPhone” onblur=”app.validateField(this)” >
```

The method “app. validateField(this)” will validate this input field onblur event. If the input field is invalid, it will show error in error element (element with class "error") and in case of valid input it hide and remove error message from error element. Passing “this” is required in order to identify input field by plugin.
###### Note: “app. validateField(this)” also return true/false for valid/invalid inputs respectively.

***Step 7 (Validating Form):***

Bind form to validate all fields on submit.

Example:
```html
<form onsubmit=”return app.validateForm()” novalidate=”true”>
  …
  …
</form>
```

The method “app.validateForm()”, validates all fields of the form at once and show errors if any. “return app.validateForm()” will prevent form submission when errors occurred.

***Step 8 (Reset button):***

Call “app.resetForm()” on click event of reset button. It hides all errors and set form in Initial condition.
Example:
```html
<button type=”reset” onclick=”app.resetForm()”>Reset</button>
```



Now you are all set up and ready to fly!!

## Documentation

[Understanding error classes](#understanding-error-classes)

[Plugin Options and Overriding defualt error messages](#plugin-options-and-overriding-defualt-error-messages)

[Refreshing data and bindings](#refreshing-data-and-bindings)

[Adding custom error messages](#adding-custom-error-messages)

[Adding custome rules to plugin](#adding-custome-rules-to-plugin)



### Understanding error classes
(will be updated soon)
### Plugin Options and Overriding defualt error messages
(will be updated soon)
### Refreshing data and bindings
(will be updated soon)
### Adding custom error messages
(will be updated soon)
### Adding custome rules to plugin

__Method:__ addRule()

__Parameters:__ 

1. Rule Name (String)

2. Error Class (String)

3. Error Message (String/Object)

4. Callback Function 

__Discription:__

All parameters are required. 

__Rule Name__ is used to create a custome rule with the provided name and used by the plugin. 

__Error Class__ is the class you need to add in your input element. To maintain uniqueness in error class, you should create it by adding "is" prefix in rule name (ex: for rule name "customeRule" use "isCustomeRule" as error class).

__Error Message__ can be String (say Case 1) if you want to show single message in all condition for your custome rule. If you want to show different messages depending upon condition use Object format (say Case 2). 
Ex: {error_1: "age can not be more than 150",  error_2: "age can not be less then 0"}.

__Callback Function__ contains your logic where you make decision for correct/incorrect input. It has three arguments, which contains: 

1. Input field reference (ref)

2. Input field value and (val)

3. Message Object (msgObj): For Case 2, It can be modified if needed.


__Note:__ If parameter "Error Message" is String you need to return true/false in callback function for valid/invalid inputs respectively. 
And if it is in Object format return an Object in callback function in following format:

For Valid input: {status:true}

For Invalid input: {status:false, type: "error_msg_key_of_message_obj"}

__EXAMPLE (Case 1/Error Message parameter as String):__ 

```javascript
var app=validationJs("#myform");

//app.addRule(Rule_Name, Error_Class, Error_Message, Callback_function);

app.addRule("customeRule", "isCustomeRule", "Age is invalid (error message from customeRule)", function(ref, val){
	/*
    	"ref" contains the input element ref
        "val" contains the input value
    */
	if(val>0 && val<150)
    	return true;
    else
    	return false;
});

```


__EXAMPLE (Case 2/Error Message parameter as Object):__ 

```javascript
var app=validationJs('#myform');

var errorMsg={
				error_1: "Age can not be more than 150",  
                error_2: "Age can not be less then 0"
            };

//app.addRule(Rule_Name, Error_Class, Error_Message_object, Callback_function);

app.addRule("customeRule", "isCustomeRule", errorMsg, function(ref, val, msgObj){
	/*
    	msgObj is the copy of Error_Message_object (here errorMsg) used by the plugin. You can modify it if you need.
    */
    if(val>150)
    	return {status:false, type:"error_1"};
    else if(val<0)
    	return {status:false, type:"error_2"};
    else
    	return {status:true};
});

```

__How to use custom rules?__

Custom rule will be used similar  to the native plugin rules. For example:

```html
<input name="age" class="isInteger isCustomeRule"/>
<span class="error"></span>
```
