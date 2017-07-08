# JQUERY FORM VALIDATION PLUGIN
This plugin is based on jQuery library and helps in validating html forms. Plugin provides default error messages which can be customised.

[Getting started/Quick start guide](#getting-startedquick-start-guide)

[Documentation](#documentation)

- [Understanding error classes](#understanding-error-classes)

- [Plugin Options and Overriding defualt error messages](#plugin-options-and-overriding-defualt-error-messages)

- [Refreshing data and bindings](#refreshing-data-and-bindings)

- [Adding custom error messages](#adding-custom-error-messages)

- [Adding custom rules to plugin](#adding-custom-rules-to-plugin)


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
###### Note: You need to initialize plugin for each form in different variable, say "app1" (Abobe Initialization can not be used for different form in the same page).

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

[Adding custom rules to plugin](#adding-custom-rules-to-plugin)



### Understanding error classes
This plugin plays on the basis of error classes. Declaring input "type" attribute has no effect. But additional validation attributes like: min, max, pattern will work as usual.


- __isRequired__ : Check for required type error. It can be applied to any Input type (Ex: text, number, date, email, select, redio and checkbox).
```html5
    <input type="text" class="isRequired"/>
```
- __isPhone__ : This class check for Indian standered mobile numbers.
```html5
    <input type="text" class="isPhone"/>
```
- __isInteger__ This class checks for valid javascript integer values(+/- 9007199254740991). Additionaly min max attributes can be used to validate input.
```html5
    <input type="text" class="isInteger"/>
    <!--or-->
    <input type="text" class="isInteger" min="10"/>
    <!--or-->
    <input type="text" class="isInteger" max="20"/>
     <!--or-->
    <input type="text" class="isInteger" min="10" max="20"/>
```
- __isNumber__ : This class checks for valid javascript number values. Additionaly min max attributes can be used to validate input.
```html5
    <input type="text" class="isNumber"/>
    <!--or-->
    <input type="text" class="isNumber" min="10"/>
    <!--or-->
    <input type="text" class="isNumber" max="20.5"/>
     <!--or-->
    <input type="text" class="isNumber" min="10" max="20.5"/>
```
- __isDecimal__ : This class checks for decimal values up to 2 decimal places. Additionaly min max attributes can be used to validate input.
```html5
    <input type="text" class="isDecimal"/>
    <!--or-->
    <input type="text" class="isDecimal" min="10.20"/>
    <!--or-->
    <input type="text" class="isDecimal" max="20.50"/>
     <!--or-->
    <input type="text" class="isDecimal" min="10.20" max="20.50"/>
```
- __isDigits__ : This class is used in the case where input length is large and Number (Ex: Account Number) and where length of input matters instead of value.
```html5
    <input type="text" class="isDigits"/>
```
- __isEmail__ : This class checks for valid email format.
```html5
    <input type="text" class="isEmail"/>
```
- __isUrl__ : This class checks for valid url format.
```html5
    <input type="text" class="isUrl"/>
```
- __isDate__ : This class checks for date value. Additionaly min max attributes can be used to validate. It works for the input format yyyy/mm/dd, yyyy-mm-dd and yyyy mm dd but the format can be changed by passing format option during initialization. (You will learn latter about passing options). Pass min max attribute in the same formate.

```html5
    <input type="text" class="isDate"/>
    <!--or-->
    <input type="text" class="isDate" min="2017-07-01"/>
    <!--or-->
    <input type="text" class="isDate" max="2017-08-01"/>
     <!--or-->
    <input type="text" class="isDate" min="2017-07-01" max="2017-08-01"/>
```
- __isChar__ : This class check for charecters (a-z, A-Z).

```html5
	<input type="text" class="isChar"/>
````
- __isAlphaNumeric__ : This class check for alphanumeric charecters (a-z, A-Z, 0-9).

```html5
	<input type="text" class="isAlphaNumeric"/>
````

- __isLength__ : This class validate input on the basis of its length. Atleast one attribute from min and max is required to work it. __Do not use__ this class in combination with __isInteger, isDecimal__ and __isNumber__ classs, because min max attribute have different meaning with these inputs(They work with input values not with the length). 
```html5
	<input type="text" class="isLength"/>
````

- __isRegex__ : This class uses pattern attribute to validate input. Pass your regular expression in pattern attribute. Following input check for the string having 3 letters.
```html5
	<input type="text" class="isRegex" pattern="[A-Za-z]{3}"/>
````

**Note:** Above classes can be used alone or in combination. For example below code will check for input having maximum length 20 and should contain only alphabetic charecters. 
```html5
 	<input type="text" class="isRequired isChar isLength"  max="20">
```
Also __validation plugin validate input sequentially in the order of classes__ (Order for isRequired class doesn't matters, it is alwayas the first validation).
For example: In the below code first validation is isRequired, second is isChar and third is isLength. It means if you have invalid input, you will get error related to isRequired class first than you will get invalid charecter error and in last you will get length error.
```html5
 	<input type="text" class="isRequired isChar isLength"  max="20">
```

### Plugin Options and Overriding defualt error messages
Plugin Option with their default values are shown below. Options can be passed as second argument of __"validationJs(selector, option)"__ function.

```javascript
{
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
    }
  
  ```
  __Example:__ 
```javascript 
var app = new validationJs(“#myForm”, {messaging:false, formErrorClass: 'custom-error-class'});
```

### Refreshing data and bindings
Some times we need to refresh bindings of elements. Such cases are:

- When we add input fields at run time(validation time).
- When we rerender the input field (may be after server side validtion)

We can refresh the bindings whenever we found the case where binding may break.

```javascript
var app= validationJs(“#myForm”);
app.refresh(); //this will refresh all bindings(form and inputs)
```

### Adding custom error messages
__Method:__ addErrorMsg()

__Parameters:__ Object/Array of Object

__Discription:__ 

Suppose you have "First Name" field in the form and you want to show a customized error message like:

When required error occurs: First Name is required!

When someone enters number: First Name should only contains alphabatical character!

To achieve this you need to do following:

1. Add a selector to the concerned input(may be ID or Class)
2. Add error classes to input fields
3. Create message object: rule name(rule name can be obtained by removing "is" from error class string and making first charecter of remaining string as lowercase) as __Key__ and conerned message as __Value__.
4. Now create another object with key as the __selector__ of your input and value as a message object.
5. Add this new object to your app object by using __addErrorMsg()__ Method.
```html
<input type="text" id="first_name" class="isRequired isChar" />
<span class="error"></span>
```

```javascript
var app=validationJs("#myform");
var first_name_msg={
						"required": "First Name is required!",
                        "char":	"First Name should only contains alphabatical character!"
                   };
app.addErrorMsg({selector: "#first_name", msg: first_name_msg}); //function can accept single object or array of such objects

```

To add similler error messages to samillier type of fields use __class__ as selector.
For example your form has to emails, primary and secondary, and you want to provide common custom error messages.

To achieve this you need do following: 
1. Add a selector (class) to all concerned inputs (for both emails in this case, say "cstm-email").
2. Add error classes to input fields
3. Create message object: rule name(rule name can be obtained by removing "is" from error class string and making first charecter of remaining string as lowercase) as __Key__ and conerned message as __Value__.
4. Now create another object with key as the __selector__ of your input and value as a message object.
5. Add this new object to your app object by using __addErrorMsg()__ Method.

```html
<input type="text" id="first_name" name="first_name" class="isRequired isChar" />
<span class="error"></span>

<input type="email" name="primary_email"  class="cstm-email isRequired" />
<span class="error"></span>

<input type="email" name="secondary_email"  class="cstm-email isRequired" />
<span class="error"></span>
```

```javascript
var app=validationJs("#myform");
var first_name_msg={
						"required": "First Name is required!",
                        "char":	"First Name should only contains alphabatical character!"
                   };
var email_msg={
					"required": "Email is required field, and this is first custom error message",
         			"email": "Email is invalid, and this is second custom error message"           
				};
app.addErrorMsg([
					{selector: "#first_name", msg: first_name_msg},
                    {selector: ".cstm-email", msg: email_msg}
                    
                ]); //function can accept single object or array of such objects
```

__NOTE:__ If you use multiple selectors(classes or ids) to customize error message, post message object in array will override the previous message object.
### Adding custom rules to plugin

__Method:__ addRule()

__Parameters:__ 

1. Rule Name (String)

2. Error Class (String)

3. Error Message (String/Object)

4. Callback Function 

__Discription:__

All parameters are required. 

__Rule Name__ is used to create a custom rule with the provided name and used by the plugin. 

__Error Class__ is the class you need to add in your input element. To maintain uniqueness in error class, you should create it by adding "is" prefix in rule name (ex: for rule name "customRule" use "isCustomRule" as error class).

__Error Message__ can be String (say Case 1) if you want to show single message in all condition for your custom rule. If you want to show different messages depending upon condition use Object format (say Case 2). 
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

app.addRule("customRule", "isCustomRule", "Age is invalid (error message from customRule)", function(ref, val){
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

app.addRule("customRule", "isCustomRule", errorMsg, function(ref, val, msgObj){
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
<input name="age" class="isInteger isCustomRule"/>
<span class="error"></span>
```
